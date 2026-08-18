import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { doc, getFirestore, onSnapshot, setDoc } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAKhx3ZU3DPb0Pd3FVj-vm4Bm0HRPMJxRc",
  authDomain: "planner-a868a.firebaseapp.com",
  projectId: "planner-a868a",
  storageBucket: "planner-a868a.firebasestorage.app",
  messagingSenderId: "115731897867",
  appId: "1:115731897867:web:0c4fee82eca6db51f9310e",
  measurementId: "G-8VPTZL6STG"
};

const firebaseApp = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(firebaseApp);
const plannerStateRef = doc(firestoreDb, "plannerState", "main");
let isApplyingRemoteState = false;
const influencerSteps = [
  { id: "listed", label: "리스트업" },
  { id: "meReview", label: "ME 체크" },
  { id: "contact", label: "컨택" },
  { id: "shipment", label: "제품 발송" },
  { id: "uploaded", label: "콘텐츠 업로드" },
  { id: "finalReview", label: "ME 최종 체크" },
];

const seedTasks = [];


const ownerNameMap = {
  "me (박현주)": "ME",
  "김민준": "이슬기",
  "이지은": "석정은",
  "박서연": "이경숙",
  "최현우": "박정연",
};
const priorityLabels = { high: "높음", medium: "보통", low: "낮음" };
const eventKindLabels = {
  meeting: "회의",
  check: "체크",
  schedule: "일정",
  deadline: "마감",
  review: "리뷰",
};
const categoryLabels = {
  message: "마케팅메시지",
  performance: "성과 체크",
  meta: "메타광고",
  influencer: "인플루언서 협업",
  content: "콘텐츠",
  general: "기타",
};
const now = new Date();
const baseToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
let calendarEvents = loadCalendarEvents();
let tasks = loadTasks();
let meetingChecklists = loadMeetingChecklists();
let memoChecks = loadMemoChecks();
let quickNotes = loadQuickNotes();

let activeFilter = "all";
let selectedTaskDate = formatDateKey(baseToday);
let calendarView = "week";
let editingEventId = null;
let visibleMonth = new Date(baseToday.getFullYear(), baseToday.getMonth(), 1);
let activeProgressMonth = null;
let editingQuickNoteId = null;
let lastLocalMutationAt = 0;
const pendingTaskIds = new Set();

const taskList = document.querySelector("#taskList");
const taskForm = document.querySelector("#taskForm");
const filters = document.querySelectorAll(".filter");
const resetButton = document.querySelector("#resetButton");
const viewButtons = document.querySelectorAll(".view-button");
const prevMonthButton = document.querySelector("#prevMonthButton");
const nextMonthButton = document.querySelector("#nextMonthButton");
const todayButton = document.querySelector("#todayButton");
const eventForm = document.querySelector("#eventForm");
const eventDate = document.querySelector("#eventDate");
const eventSubmitButton = document.querySelector("#eventSubmitButton");
const eventCancelButton = document.querySelector("#eventCancelButton");
const memoCheckForm = document.querySelector("#memoCheckForm");
const memoCheckList = document.querySelector("#memoCheckList");
const thisWeekList = document.querySelector("#thisWeekList");
const nextWeekList = document.querySelector("#nextWeekList");
const monthlyProgressTabs = document.querySelector("#monthlyProgressTabs");
const monthlyProgressCurrent = document.querySelector("#monthlyProgressCurrent");
const monthlyProgressList = document.querySelector("#monthlyProgressList");
const scratchNoteForm = document.querySelector("#scratchNoteForm");
const scratchNoteText = document.querySelector("#scratchNoteText");
const scratchNoteSubmitButton = document.querySelector("#scratchNoteSubmitButton");
const clearScratchNoteButton = document.querySelector("#clearScratchNoteButton");
const cancelScratchNoteEditButton = document.querySelector("#cancelScratchNoteEditButton");
const scratchNoteList = document.querySelector("#scratchNoteList");





function serializePlannerState(updatedAt = new Date().toISOString()) {
  return {
    tasks,
    calendarEvents,
    meetingChecklists,
    memoChecks,
    quickNotes,
    updatedAt
  };
}

function normalizeCalendarEvent(eventItem) {
  if (!eventItem || typeof eventItem !== "object") return null;
  const date = typeof eventItem.date === "string" ? eventItem.date : "";
  const time = typeof eventItem.time === "string" ? eventItem.time : "";
  const title = typeof eventItem.title === "string" ? eventItem.title.trim() : "";
  const kind = eventKindLabels[eventItem.kind] ? eventItem.kind : "schedule";
  if (!date || !time || !title) return null;
  return { id: eventItem.id || crypto.randomUUID(), date, time, title, kind };
}

function normalizeCalendarEvents(items) {
  return Array.isArray(items) ? items.map(normalizeCalendarEvent).filter(Boolean) : [];
}
function mergeRecordsById(remoteItems, localItems, normalize = (item) => item) {
  const merged = new Map();
  remoteItems.forEach((item) => merged.set(item.id, normalize(item)));
  localItems.forEach((item) => merged.set(item.id, normalize(item)));
  return Array.from(merged.values());
}
function hasLocalPlannerState() {
  return tasks.length || calendarEvents.length || Object.keys(meetingChecklists).length || memoChecks.length || quickNotes.length;
}
function readStoredJson(key, fallback) {
  const saved = localStorage.getItem(key);
  if (!saved) return fallback;
  try {
    return JSON.parse(saved);
  } catch (error) {
    console.warn(`${key} 로컬 저장값 복구 실패`, error);
    localStorage.removeItem(key);
    return fallback;
  }
}

function writeStoredJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`${key} 로컬 저장 실패`, error);
  }
}

function applyPlannerState(state) {
  const remoteUpdatedAt = Date.parse(state.updatedAt || "");
  const remoteHasNoTasks = !Array.isArray(state.tasks) || state.tasks.length === 0;
  const shouldPreserveLocal = (lastLocalMutationAt && (!remoteUpdatedAt || remoteUpdatedAt < lastLocalMutationAt)) || (remoteHasNoTasks && tasks.length > 0);
  isApplyingRemoteState = true;
  const remoteTasks = Array.isArray(state.tasks) ? state.tasks : [];
  const remoteTaskIds = new Set(remoteTasks.map((task) => task.id));
  const pendingTasks = tasks.filter((task) => pendingTaskIds.has(task.id) && !remoteTaskIds.has(task.id));
  remoteTaskIds.forEach((taskId) => pendingTaskIds.delete(taskId));
  const rawRemoteCalendarEvents = Array.isArray(state.calendarEvents) ? state.calendarEvents : [];
  const remoteCalendarEvents = normalizeCalendarEvents(rawRemoteCalendarEvents);
  const didCleanRemoteCalendarEvents = rawRemoteCalendarEvents.length !== remoteCalendarEvents.length;
  const remoteMemoChecks = Array.isArray(state.memoChecks) ? state.memoChecks : [];
  const remoteQuickNotes = Array.isArray(state.quickNotes) ? state.quickNotes : [];
  tasks = mergeRecordsById(remoteTasks, shouldPreserveLocal ? tasks : pendingTasks, normalizeTask);
  calendarEvents = shouldPreserveLocal ? mergeRecordsById(remoteCalendarEvents, normalizeCalendarEvents(calendarEvents)) : remoteCalendarEvents;
  meetingChecklists = state.meetingChecklists && typeof state.meetingChecklists === "object" ? { ...(shouldPreserveLocal ? meetingChecklists : {}), ...state.meetingChecklists } : (shouldPreserveLocal ? meetingChecklists : {});
  memoChecks = shouldPreserveLocal ? mergeRecordsById(remoteMemoChecks, memoChecks) : remoteMemoChecks;
  quickNotes = shouldPreserveLocal ? mergeRecordsById(remoteQuickNotes, quickNotes) : remoteQuickNotes;
  writeStoredJson("leaderDashboardTasks", tasks);
  calendarEvents = normalizeCalendarEvents(calendarEvents);
  writeStoredJson("leaderDashboardCalendarEvents", calendarEvents);
  writeStoredJson("leaderDashboardMeetingChecklists", meetingChecklists);
  writeStoredJson("leaderDashboardMemoChecks", memoChecks);
  writeStoredJson("leaderDashboardQuickNotes", quickNotes);
  render();
  isApplyingRemoteState = false;
  if (shouldPreserveLocal || didCleanRemoteCalendarEvents || pendingTasks.length) setDoc(plannerStateRef, serializePlannerState(new Date(lastLocalMutationAt || Date.now()).toISOString()), { merge: true }).catch((error) => console.warn("Firebase 병합 저장 실패", error));
}

function savePlannerFields(fields) {
  if (isApplyingRemoteState) return;
  const updatedAt = new Date().toISOString();
  lastLocalMutationAt = Date.parse(updatedAt);
  try {
    setDoc(plannerStateRef, { ...fields, updatedAt }, { merge: true }).catch((error) => {
      console.warn("Firebase 저장 실패", error);
    });
  } catch (error) {
    console.warn("Firebase 저장 시작 실패", error);
  }
}

function savePlannerState() {
  savePlannerFields(serializePlannerState());
}

function startFirebaseSync() {
  onSnapshot(plannerStateRef, (snapshot) => {
    if (!snapshot.exists()) {
      if (hasLocalPlannerState()) savePlannerState();
      return;
    }
    applyPlannerState(snapshot.data());
  }, (error) => {
    console.warn("Firebase 동기화 실패", error);
  });
}
function loadCalendarEvents() {
  return normalizeCalendarEvents(readStoredJson("leaderDashboardCalendarEvents", []));
}

function saveCalendarEvents() {
  calendarEvents = normalizeCalendarEvents(calendarEvents);
  writeStoredJson("leaderDashboardCalendarEvents", calendarEvents);
  savePlannerFields({ calendarEvents });
}

function loadMemoChecks() {
  const items = readStoredJson("leaderDashboardMemoChecks", []);
  return Array.isArray(items) ? items : [];
}

function saveMemoChecks() {
  writeStoredJson("leaderDashboardMemoChecks", memoChecks);
  savePlannerFields({ memoChecks });
}


function loadQuickNotes() {
  const items = readStoredJson("leaderDashboardQuickNotes", []);
  return Array.isArray(items) ? items : [];
}

function saveQuickNotes() {
  writeStoredJson("leaderDashboardQuickNotes", quickNotes);
  savePlannerFields({ quickNotes });
}
function loadMeetingChecklists() {
  const items = readStoredJson("leaderDashboardMeetingChecklists", {});
  return items && typeof items === "object" && !Array.isArray(items) ? items : {};
}

function saveMeetingChecklists() {
  writeStoredJson("leaderDashboardMeetingChecklists", meetingChecklists);
  savePlannerFields({ meetingChecklists });
}

eventDate.value = formatDateKey(baseToday);

function createWorkflow() {
  return Object.fromEntries(influencerSteps.map((step) => [step.id, false]));
}

function normalizeTask(task) {
  const category = task.category || "general";
  const workflow = category === "influencer" ? { ...createWorkflow(), ...(task.workflow || {}) } : task.workflow;
  const due = /^\d{4}-\d{2}-\d{2}$/.test(task.due || "") ? task.due : formatDateKey(baseToday);
  return { ...task, due, owner: ownerNameMap[task.owner] || task.owner, category, workflow };
}

function loadTasks() {
  const items = readStoredJson("leaderDashboardTasks", seedTasks);
  return (Array.isArray(items) ? items : seedTasks).map(normalizeTask);
}

function saveTasks() {
  writeStoredJson("leaderDashboardTasks", tasks);
  savePlannerFields({ tasks });
}

function render() {
  renderTasks();
  renderTaskDateTabs();
  renderTodaySummary();
  renderFocus();
  renderOwners();
  renderCalendar();
  renderMemoChecks();
  renderUpcomingWork();
  renderMonthlyProgress();
  renderQuickNotes();
}


function renderMemoChecks() {
  memoCheckList.innerHTML = memoChecks.map((item) => `
    <li class="memo-check-item ${item.done ? "is-done" : ""}">
      <button class="memo-toggle" type="button" data-memo-toggle="${item.id}">${item.done ? "✓" : ""}</button>
      <span class="memo-text">${item.text}</span>
      <span class="memo-date">${item.when || item.date || "시점 미정"}</span>
      <button class="memo-remove" type="button" data-memo-delete="${item.id}">×</button>
    </li>
  `).join("");
  if (!memoChecks.length) memoCheckList.innerHTML = `<li class="empty">회의 때 나온 일정 체크 항목을 추가하세요.</li>`;
}


function renderUpcomingWork() {
  const thisWeek = getEventsInRange(startOfWeek(baseToday), addDays(startOfWeek(baseToday), 6));
  const nextWeekStart = addDays(startOfWeek(baseToday), 7);
  const nextWeek = getEventsInRange(nextWeekStart, addDays(nextWeekStart, 6));
  thisWeekList.innerHTML = renderUpcomingItems(thisWeek, "이번 주 등록된 일정이 없습니다.");
  nextWeekList.innerHTML = renderUpcomingItems(nextWeek, "다음 주 등록된 일정이 없습니다.");
}

function renderUpcomingItems(events, emptyText) {
  if (!events.length) return `<li class="empty">${emptyText}</li>`;
  return events
    .map((event) => `<li class="upcoming-item"><span class="upcoming-kind kind-${event.kind}">${eventKindLabels[event.kind] || "일정"}</span><strong>${event.title}</strong><small>${formatShortDate(new Date(`${event.date}T00:00:00`))} ${event.time}</small></li>`)
    .join("");
}

function getEventsInRange(start, end) {
  return calendarEvents
    .filter((event) => {
      const eventDate = new Date(`${event.date}T00:00:00`);
      return eventDate >= start && eventDate <= end;
    })
    .sort((first, second) => `${first.date} ${first.time}`.localeCompare(`${second.date} ${second.time}`));
}

function renderMonthlyProgress() {
  if (!monthlyProgressTabs || !monthlyProgressList) return;
  const completedItems = memoChecks.filter((item) => item.done);
  const baseMonth = formatMonthKey(baseToday);
  const nextMonth = formatMonthKey(new Date(baseToday.getFullYear(), baseToday.getMonth() + 1, 1));
  const months = [...new Set([baseMonth, nextMonth, ...completedItems.map((item) => item.completedMonth || monthFromWhen(item.when) || baseMonth)])].sort();
  if (!activeProgressMonth || !months.includes(activeProgressMonth)) activeProgressMonth = baseMonth;
  if (monthlyProgressCurrent) monthlyProgressCurrent.textContent = `선택 월: ${formatMonthLabel(activeProgressMonth)}`;
  monthlyProgressTabs.innerHTML = months.map((month) => {
    const isActive = month === activeProgressMonth;
    return `<button type="button" class="monthly-tab ${isActive ? "is-active" : ""}" data-progress-month="${month}" aria-pressed="${isActive}">${formatMonthLabel(month)}</button>`;
  }).join("");
  const visibleItems = completedItems.filter((item) => (item.completedMonth || monthFromWhen(item.when) || baseMonth) === activeProgressMonth);
  monthlyProgressList.innerHTML = visibleItems.length ? visibleItems.map((item) => `<li><span class="progress-check">✓</span><strong>${item.text}</strong><small>${item.completedAt || item.when || "완료"}</small></li>`).join("") : `<li class="empty">해당 월에 완료 체크된 항목이 없습니다.</li>`;
}

function formatMonthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function formatMonthLabel(monthKey) {
  const [, month] = monthKey.split("-");
  return `${Number(month)}월`;
}

function monthFromWhen(when) {
  if (when === "다음 달") return formatMonthKey(new Date(baseToday.getFullYear(), baseToday.getMonth() + 1, 1));
  return formatMonthKey(baseToday);
}

function escapeHtml(value) {
  return value.replace(/[&<>"]/g, (char) => {
    if (char === "&") return "&amp;";
    if (char === "<") return "&lt;";
    if (char === ">") return "&gt;";
    return "&quot;";
  });
}

function linkifyText(value) {
  const safe = escapeHtml(value);
  return safe.replace(/(https?:\/\/[^\s<]+)/g, `<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>`).replace(/\n/g, "<br />");
}

function renderQuickNotes() {
  if (!scratchNoteList) return;
  scratchNoteList.innerHTML = quickNotes.map((note) => `
    <li class="scratch-note-item">
      <div class="scratch-note-content">${linkifyText(note.text)}</div>
      <small>${note.createdAt}</small>
      <button class="scratch-note-edit" type="button" data-note-edit="${note.id}">수정</button>
      <button class="scratch-note-delete" type="button" data-note-delete="${note.id}">삭제</button>
    </li>
  `).join("");
  if (!quickNotes.length) scratchNoteList.innerHTML = `<li class="empty">아직 저장된 메모가 없습니다.</li>`;
}
function setTaskFilter(filterName) {
  activeFilter = filterName;
  filters.forEach((filter) => filter.classList.toggle("is-active", filter.dataset.filter === filterName));
}

function renderTasks() {
  const todayKey = formatDateKey(baseToday);
  const visibleTasks = tasks.filter((task) => {
    const isCarriedOver = selectedTaskDate === todayKey && task.due < todayKey && !task.done;
    if (task.due !== selectedTaskDate && !isCarriedOver) return false;
    if (activeFilter === "todo") return !task.done;
    if (activeFilter === "risk") return task.priority === "high" || task.type === "risk";
    return true;
  });

  taskList.innerHTML = visibleTasks.map((task) => `
    <article class="task-item ${task.done ? "is-done" : ""}">
      <button class="check" type="button" aria-label="${task.title} 완료 상태 변경" data-toggle="${task.id}">${task.done ? "✓" : ""}</button>
      <div>
        <p class="task-title">${task.title}${!task.done && task.due < formatDateKey(baseToday) ? ` <span class="pill overdue">지연</span>` : ""}</p>
        ${task.category === "influencer" ? renderInfluencerFlow(task) : ""}
      </div>
      <button class="delete-button" type="button" aria-label="${task.title} 삭제" data-delete="${task.id}">×</button>
    </article>
  `).join("");

  if (!visibleTasks.length) taskList.innerHTML = `<p class="empty">해당 날짜의 업무가 없습니다.</p>`;
}

function renderTaskDateTabs() {
  const todayKey = formatDateKey(baseToday);
  const tomorrowKey = formatDateKey(addDays(baseToday, 1));
  document.querySelectorAll(".date-tab").forEach((button) => {
    const key = button.dataset.dateTab === "today" ? todayKey : tomorrowKey;
    button.classList.toggle("is-active", selectedTaskDate === key);
  });
  const picker = document.querySelector("#taskDatePicker");
  if (document.activeElement !== picker) picker.value = selectedTaskDate;
  const label = document.querySelector("#taskDateLabel");
  if (selectedTaskDate === todayKey) label.textContent = "오늘 할일";
  else if (selectedTaskDate === tomorrowKey) label.textContent = "내일 할일";
  else label.textContent = `${formatShortDate(new Date(`${selectedTaskDate}T00:00:00`))} 할일`;
}

function renderInfluencerFlow(task) {
  const completed = influencerSteps.filter((step) => task.workflow?.[step.id]).length;
  return `
    <div class="influencer-flow" aria-label="인플루언서 협업 진행 단계">
      <p class="flow-caption">팀원 리스트업 후 ME가 확인하고, 컨택/제품 발송/콘텐츠 업로드까지 추적합니다. ${completed}/${influencerSteps.length}</p>
      <div class="flow-track">
        ${influencerSteps.map((step) => `
          <button class="flow-step ${task.workflow?.[step.id] ? "is-complete" : ""}" type="button" data-step-task="${task.id}" data-step="${step.id}">${step.label}</button>
        `).join("")}
      </div>
    </div>
  `;
}

function getOpenMeetingChecks() {
  return Object.entries(meetingChecklists).flatMap(([key, items]) =>
    items.filter((item) => !item.done).map((item) => ({ key, ...item })),
  );
}

function renderTodaySummary() {
  const today = tasks.filter((task) => task.due === formatDateKey(baseToday) && !task.done).length;
  document.querySelector("#todayCount").textContent = `${today}건`;
  document.querySelector("#todayLabel").textContent = new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric", weekday: "long" }).format(baseToday);
}
function renderFocus() {
  // The right panel is now a single editable checklist; unresolved items live there directly.
}

function renderOwners() {
  // Owner progress panel was removed to keep the sidebar as one checklist.
}

function renderCalendar() {
  if (calendarView === "month") renderMonthCalendar();
  else renderWeekCalendar();
}

function renderWeekCalendar() {
  const weekStart = startOfWeek(baseToday);
  const days = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
  const grid = document.querySelector("#calendarGrid");
  const weekdays = document.querySelector("#monthWeekdays");
  document.querySelector("#calendarTitle").textContent = "이번 주 캘린더";
  weekdays.classList.remove("is-visible");
  weekdays.innerHTML = "";
  grid.className = "calendar-grid week-view";
  grid.innerHTML = days.map((dateItem) => {
    const dateEvents = eventsForDate(formatDateKey(dateItem));
    const minHeight = Math.max(300, 88 + dateEvents.length * 128);
    return `<article class="day-card ${isSameDate(dateItem, baseToday) ? "is-today" : ""}" style="min-height: ${minHeight}px;"><div class="day-name"><span>${formatWeekday(dateItem)}</span><span>${formatShortDate(dateItem)}</span></div>${renderEvents(dateEvents)}</article>`;
  }).join("");
}

function renderMonthCalendar() {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const calendarStart = startOfWeek(firstDay);
  const days = Array.from({ length: 42 }, (_, index) => addDays(calendarStart, index));
  const grid = document.querySelector("#calendarGrid");
  const weekdays = document.querySelector("#monthWeekdays");
  document.querySelector("#calendarTitle").textContent = new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long" }).format(visibleMonth);
  weekdays.classList.add("is-visible");
  weekdays.innerHTML = ["일", "월", "화", "수", "목", "금", "토"].map((day) => `<span>${day}</span>`).join("");
  grid.className = "calendar-grid month-view";
  grid.innerHTML = days.map((dateItem) => {
    const muted = dateItem.getMonth() !== month;
    return `<article class="day-card ${isSameDate(dateItem, baseToday) ? "is-today" : ""} ${muted ? "is-muted" : ""}"><div class="day-name"><span>${dateItem.getDate()}</span><span>${formatWeekday(dateItem)}</span></div>${renderEvents(eventsForDate(formatDateKey(dateItem)), 2)}</article>`;
  }).join("");
}

function renderEvents(events, limit = 4) {
  if (!events.length) return "";
  const visible = events.slice(0, limit);
  const hiddenCount = events.length - visible.length;
  return `${visible.map((event) => {
    const key = eventKey(event);
    return `<div class="event kind-${event.kind}" role="button" tabindex="0" data-event-edit="${event.id || key}" aria-label="${event.title} 일정 수정"><div class="event-top"><div><strong>${event.title}</strong><span>${event.time} · ${eventKindLabels[event.kind] || "일정"}</span></div><button class="event-remove" type="button" aria-label="${event.title} 일정 삭제" data-event-delete="${event.id || key}">×</button></div></div>`;
  }).join("")}${hiddenCount > 0 ? `<p class="empty">외 ${hiddenCount}건</p>` : ""}`;
}

function eventKey(event) { return `${event.date}|${event.time}|${event.title}`; }
function eventsForDate(dateKey) { return calendarEvents.filter((event) => event.date === dateKey); }
function startOfWeek(date) { const result = new Date(date); result.setDate(result.getDate() - result.getDay()); return result; }
function addDays(date, days) { const result = new Date(date); result.setDate(result.getDate() + days); return result; }
function formatDateKey(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; }
function formatWeekday(date) { return new Intl.DateTimeFormat("ko-KR", { weekday: "short" }).format(date); }
function formatShortDate(date) { return `${date.getMonth() + 1}/${date.getDate()}`; }
function isSameDate(first, second) { return formatDateKey(first) === formatDateKey(second); }

function activateCalendarView(view) {
  calendarView = view;
  viewButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.view === view));
  renderCalendar();
}

function startEditingEvent(eventId) {
  const eventItem = calendarEvents.find((item) => (item.id || eventKey(item)) === eventId);
  if (!eventItem) return;
  editingEventId = eventId;
  document.querySelector("#eventTitle").value = eventItem.title;
  document.querySelector("#eventDate").value = eventItem.date;
  document.querySelector("#eventTime").value = eventItem.time;
  document.querySelector("#eventKind").value = eventItem.kind;
  eventSubmitButton.textContent = "수정 저장";
  eventCancelButton.classList.remove("is-hidden");
  eventForm.classList.add("is-editing");
  eventForm.scrollIntoView({ behavior: "smooth", block: "center" });
}

function resetEventForm(date = formatDateKey(baseToday)) {
  editingEventId = null;
  eventForm.reset();
  document.querySelector("#eventDate").value = date;
  document.querySelector("#eventTime").value = "10:00";
  document.querySelector("#eventKind").value = "meeting";
  eventSubmitButton.textContent = "일정 추가";
  eventCancelButton.classList.add("is-hidden");
  eventForm.classList.remove("is-editing");
}






function startEditingQuickNote(noteId) {
  const note = quickNotes.find((item) => item.id === noteId);
  if (!note) return;
  editingQuickNoteId = noteId;
  scratchNoteText.value = note.text;
  scratchNoteSubmitButton.textContent = "수정 저장";
  cancelScratchNoteEditButton.classList.remove("is-hidden");
  scratchNoteText.focus();
}

function resetQuickNoteForm() {
  editingQuickNoteId = null;
  scratchNoteForm.reset();
  scratchNoteSubmitButton.textContent = "메모 저장";
  cancelScratchNoteEditButton.classList.add("is-hidden");
}
scratchNoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = scratchNoteText.value.trim();
  if (!text) return;
  if (editingQuickNoteId) {
    quickNotes = quickNotes.map((note) => note.id === editingQuickNoteId ? { ...note, text, updatedAt: formatDateKey(baseToday) } : note);
  } else {
    quickNotes.unshift({ id: crypto.randomUUID(), text, createdAt: formatDateKey(baseToday) });
  }
  saveQuickNotes();
  resetQuickNoteForm();
  renderQuickNotes();
});

clearScratchNoteButton?.addEventListener("click", () => {
  scratchNoteText.value = "";
  scratchNoteText.focus();
});

cancelScratchNoteEditButton?.addEventListener("click", () => resetQuickNoteForm());

scratchNoteList?.addEventListener("click", (event) => {
  const editId = event.target.closest("[data-note-edit]")?.dataset.noteEdit;
  const deleteId = event.target.closest("[data-note-delete]")?.dataset.noteDelete;
  if (editId) {
    startEditingQuickNote(editId);
    return;
  }
  if (!deleteId) return;
  quickNotes = quickNotes.filter((note) => note.id !== deleteId);
  if (editingQuickNoteId === deleteId) resetQuickNoteForm();
  saveQuickNotes();
  renderQuickNotes();
});
memoCheckForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = document.querySelector("#memoCheckText").value.trim();
  const when = document.querySelector("#memoCheckWhen").value;
  if (!text) return;
  memoChecks.unshift({ id: crypto.randomUUID(), text, when, done: false });
  saveMemoChecks();
  memoCheckForm.reset();
  render();
});

memoCheckList.addEventListener("click", (event) => {
  const toggleId = event.target.closest("[data-memo-toggle]")?.dataset.memoToggle;
  const deleteId = event.target.closest("[data-memo-delete]")?.dataset.memoDelete;
  if (toggleId) memoChecks = memoChecks.map((item) => {
    if (item.id !== toggleId) return item;
    const nextDone = !item.done;
    return { ...item, done: nextDone, completedAt: nextDone ? formatDateKey(baseToday) : undefined, completedMonth: nextDone ? formatMonthKey(baseToday) : undefined };
  });
  if (deleteId) memoChecks = memoChecks.filter((item) => item.id !== deleteId);
  saveMemoChecks();
  render();
});

monthlyProgressTabs?.addEventListener("click", (event) => {
  const month = event.target.closest("[data-progress-month]")?.dataset.progressMonth;
  if (!month) return;
  activeProgressMonth = month;
  renderMonthlyProgress();
  renderQuickNotes();
});
eventForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.querySelector("#eventTitle").value.trim();
  const date = document.querySelector("#eventDate").value;
  const time = document.querySelector("#eventTime").value;
  const kind = document.querySelector("#eventKind").value;
  if (!title || !date || !time) return;
  if (editingEventId) {
    const original = calendarEvents.find((eventItem) => (eventItem.id || eventKey(eventItem)) === editingEventId);
    if (original) {
      const oldKey = eventKey(original);
      const nextId = original.id || crypto.randomUUID();
      calendarEvents = calendarEvents.map((eventItem) => (eventItem.id || eventKey(eventItem)) === editingEventId ? normalizeCalendarEvent({ id: nextId, date, time, title, kind }) : eventItem).filter(Boolean);
      const newKey = eventKey({ date, time, title });
      if (oldKey !== newKey && meetingChecklists[oldKey]) {
        meetingChecklists[newKey] = meetingChecklists[oldKey];
        delete meetingChecklists[oldKey];
        saveMeetingChecklists();
      }
    }
  } else {
    calendarEvents.push(normalizeCalendarEvent({ id: crypto.randomUUID(), date, time, title, kind }));
  }
  saveCalendarEvents();
  resetEventForm(date);
  visibleMonth = new Date(`${date}T00:00:00`);
  activateCalendarView("month");
});
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.querySelector("#taskTitle").value.trim();
  if (!title) return;
  const taskId = crypto.randomUUID();
  pendingTaskIds.add(taskId);
  tasks.unshift(normalizeTask({ id: taskId, title, owner: "ME", priority: "medium", category: "general", due: selectedTaskDate, done: false, type: "task" }));
  taskForm.reset();
  setTaskFilter("all");
  saveTasks();
  render();
});

document.querySelectorAll(".date-tab").forEach((button) => {
  button.addEventListener("click", () => {
    selectedTaskDate = button.dataset.dateTab === "today" ? formatDateKey(baseToday) : formatDateKey(addDays(baseToday, 1));
    renderTasks();
    renderTaskDateTabs();
  });
});
document.querySelector("#taskDatePicker").addEventListener("change", (event) => {
  if (!event.target.value) return;
  selectedTaskDate = event.target.value;
  renderTasks();
  renderTaskDateTabs();
});

document.querySelector("#calendarGrid").addEventListener("click", (event) => {
  const eventRemove = event.target.closest("[data-event-delete]");
  const eventEdit = event.target.closest("[data-event-edit]");
  if (eventRemove) {
    const eventId = eventRemove.dataset.eventDelete;
    const removed = calendarEvents.find((eventItem) => (eventItem.id || eventKey(eventItem)) === eventId);
    if (removed) delete meetingChecklists[eventKey(removed)];
    calendarEvents = calendarEvents.filter((eventItem) => (eventItem.id || eventKey(eventItem)) !== eventId);
    saveCalendarEvents();
    saveMeetingChecklists();
    render();
    return;
  }
  if (eventEdit && !event.target.closest("button, input, form")) {
    startEditingEvent(eventEdit.dataset.eventEdit);
    return;
  }
});

taskList.addEventListener("click", (event) => {
  const toggleId = event.target.closest("[data-toggle]")?.dataset.toggle;
  const deleteId = event.target.closest("[data-delete]")?.dataset.delete;
  const stepButton = event.target.closest("[data-step-task]");
  if (toggleId) tasks = tasks.map((task) => (task.id === toggleId ? { ...task, done: !task.done } : task));
  if (deleteId) tasks = tasks.filter((task) => task.id !== deleteId);
  if (stepButton) {
    const taskId = stepButton.dataset.stepTask;
    const stepId = stepButton.dataset.step;
    tasks = tasks.map((task) => task.id === taskId ? normalizeTask({ ...task, workflow: { ...task.workflow, [stepId]: !task.workflow?.[stepId] } }) : task);
  }
  saveTasks();
  render();
});

filters.forEach((button) => {
  button.addEventListener("click", () => {
    setTaskFilter(button.dataset.filter);
    renderTasks();
  });
});

viewButtons.forEach((button) => button.addEventListener("click", () => activateCalendarView(button.dataset.view)));
prevMonthButton.addEventListener("click", () => { visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1); activateCalendarView("month"); });
nextMonthButton.addEventListener("click", () => { visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1); activateCalendarView("month"); });
todayButton.addEventListener("click", () => { visibleMonth = new Date(baseToday.getFullYear(), baseToday.getMonth(), 1); activateCalendarView("month"); });
eventCancelButton.addEventListener("click", () => resetEventForm(document.querySelector("#eventDate").value || formatDateKey(baseToday)));

document.querySelector("#calendarGrid").addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const eventEdit = event.target.closest("[data-event-edit]");
  if (!eventEdit) return;
  event.preventDefault();
  startEditingEvent(eventEdit.dataset.eventEdit);
});

resetButton.addEventListener("click", () => { tasks = []; calendarEvents = []; meetingChecklists = {}; memoChecks = []; quickNotes = []; resetEventForm(); saveTasks(); saveCalendarEvents(); saveMeetingChecklists(); saveMemoChecks(); saveQuickNotes(); render(); });

render();
startFirebaseSync();
