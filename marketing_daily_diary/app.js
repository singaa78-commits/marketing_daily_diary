const influencerSteps = [
  { id: "listed", label: "리스트업" },
  { id: "meReview", label: "ME 체크" },
  { id: "contact", label: "컨택" },
  { id: "shipment", label: "제품 발송" },
  { id: "uploaded", label: "콘텐츠 업로드" },
  { id: "finalReview", label: "ME 최종 체크" },
];

const seedTasks = [];

let calendarEvents = loadCalendarEvents();

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
  message: "이미지 제작 발송",
  performance: "성과 체크",
  meta: "메타광고",
  influencer: "인플루언서 협업",
  content: "콘텐츠 제작",
  general: "일반 업무",
};
const baseToday = new Date(2026, 7, 18);
let tasks = loadTasks();
let meetingChecklists = loadMeetingChecklists();
let memoChecks = loadMemoChecks();

let activeFilter = "all";
let calendarView = "week";
let editingEventId = null;
let visibleMonth = new Date(baseToday.getFullYear(), baseToday.getMonth(), 1);

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




function loadCalendarEvents() {
  const saved = localStorage.getItem("leaderDashboardCalendarEvents");
  return saved ? JSON.parse(saved) : [];
}

function saveCalendarEvents() {
  localStorage.setItem("leaderDashboardCalendarEvents", JSON.stringify(calendarEvents));
}

function loadMemoChecks() {
  const saved = localStorage.getItem("leaderDashboardMemoChecks");
  return saved ? JSON.parse(saved) : [];
}

function saveMemoChecks() {
  localStorage.setItem("leaderDashboardMemoChecks", JSON.stringify(memoChecks));
}

function loadMeetingChecklists() {
  const saved = localStorage.getItem("leaderDashboardMeetingChecklists");
  return saved ? JSON.parse(saved) : {};
}

function saveMeetingChecklists() {
  localStorage.setItem("leaderDashboardMeetingChecklists", JSON.stringify(meetingChecklists));
}eventDate.value = formatDateKey(baseToday);

function createWorkflow() {
  return Object.fromEntries(influencerSteps.map((step) => [step.id, false]));
}

function normalizeTask(task) {
  const category = task.category || "general";
  const workflow = category === "influencer" ? { ...createWorkflow(), ...(task.workflow || {}) } : task.workflow;
  return { ...task, owner: ownerNameMap[task.owner] || task.owner, category, workflow };
}

function loadTasks() {
  const saved = localStorage.getItem("leaderDashboardTasks");
  return (saved ? JSON.parse(saved) : seedTasks).map(normalizeTask);
}

function saveTasks() {
  localStorage.setItem("leaderDashboardTasks", JSON.stringify(tasks));
}

function render() {
  renderTasks();
  renderMetrics();
  renderFocus();
  renderOwners();
  renderCalendar();
  renderMemoChecks();
  renderUpcomingWork();
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
    .map((event) => `<li class="upcoming-item"><span class="upcoming-kind ${event.kind}">${eventKindLabels[event.kind] || "일정"}</span><strong>${event.title}</strong><small>${formatShortDate(new Date(`${event.date}T00:00:00`))} ${event.time}</small></li>`)
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
function renderTasks() {
  const visibleTasks = tasks.filter((task) => {
    if (activeFilter === "todo") return !task.done;
    if (activeFilter === "risk") return task.priority === "high" || task.type === "risk";
    return true;
  });

  taskList.innerHTML = visibleTasks.map((task) => `
    <article class="task-item ${task.done ? "is-done" : ""}">
      <button class="check" type="button" aria-label="${task.title} 완료 상태 변경" data-toggle="${task.id}">${task.done ? "✓" : ""}</button>
      <div>
        <p class="task-title">${task.title}</p>
        <div class="task-meta">
          <span class="pill">${task.owner}</span>
          <span class="pill category ${task.category}">${categoryLabels[task.category] || categoryLabels.general}</span>
          <span class="pill ${task.priority}">${priorityLabels[task.priority]}</span>
          <span class="pill">${task.due} 마감</span>
        </div>
        ${task.category === "influencer" ? renderInfluencerFlow(task) : ""}
      </div>
      <button class="delete-button" type="button" aria-label="${task.title} 삭제" data-delete="${task.id}">×</button>
    </article>
  `).join("");

  if (!visibleTasks.length) taskList.innerHTML = `<p class="empty">해당 조건의 업무가 없습니다.</p>`;
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

function renderMetrics() {
  const total = tasks.length || 1;
  const done = tasks.filter((task) => task.done).length;
  const active = tasks.filter((task) => !task.done).length;
  const risks = tasks.filter((task) => !task.done && (task.priority === "high" || task.type === "risk")).length;
  const today = tasks.filter((task) => task.due === "오늘" && !task.done).length;
  const meetings = getOpenMeetingChecks().length;
  const rate = Math.round((done / total) * 100);

  document.querySelector("#completionRate").textContent = `${rate}%`;
  document.querySelector("#completionMeter").style.width = `${rate}%`;
  document.querySelector("#activeCount").textContent = active;
  document.querySelector("#riskCount").textContent = risks;
  document.querySelector("#todayCount").textContent = `${today}건`;
  document.querySelector("#meetingCount").textContent = meetings;
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
  grid.innerHTML = days.map((dateItem) => `<article class="day-card ${isSameDate(dateItem, baseToday) ? "is-today" : ""}"><div class="day-name"><span>${formatWeekday(dateItem)}</span><span>${formatShortDate(dateItem)}</span></div>${renderEvents(eventsForDate(formatDateKey(dateItem)))}</article>`).join("");
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
  if (!events.length) return `<p class="empty">등록된 일정 없음</p>`;
  const visible = events.slice(0, limit);
  const hiddenCount = events.length - visible.length;
  return `${visible.map((event) => {
    const key = eventKey(event);
    const items = meetingChecklists[key] || [];
    return `<div class="event ${event.kind}" role="button" tabindex="0" data-event-edit="${event.id || key}" aria-label="${event.title} 일정 수정"><div class="event-top"><div><strong>${event.title}</strong><span>${event.time} · ${eventKindLabels[event.kind] || "일정"}</span></div><button class="event-remove" type="button" aria-label="${event.title} 일정 삭제" data-event-delete="${event.id || key}">×</button></div>${event.kind === "meeting" ? renderMeetingChecklist(key, items) : ""}</div>`;
  }).join("")}${hiddenCount > 0 ? `<p class="empty">외 ${hiddenCount}건</p>` : ""}`;
}

function renderMeetingChecklist(key, items) {
  return `
    <form class="meeting-check-form" data-meeting-form="${key}">
      <input type="text" placeholder="회의 체크 항목" aria-label="회의 체크 항목 추가" />
      <button type="submit">추가</button>
    </form>
    <ul class="meeting-check-list">
      ${items.map((item) => `<li class="meeting-check-item ${item.done ? "is-done" : ""}"><button class="mini-check" type="button" data-meeting-key="${key}" data-meeting-item="${item.id}">${item.done ? "✓" : ""}</button><span>${item.text}</span><button class="mini-delete" type="button" data-meeting-delete="${key}" data-meeting-item="${item.id}">×</button></li>`).join("")}
    </ul>
  `;
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
  if (toggleId) memoChecks = memoChecks.map((item) => item.id === toggleId ? { ...item, done: !item.done } : item);
  if (deleteId) memoChecks = memoChecks.filter((item) => item.id !== deleteId);
  saveMemoChecks();
  render();
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
      calendarEvents = calendarEvents.map((eventItem) => (eventItem.id || eventKey(eventItem)) === editingEventId ? { id: nextId, date, time, title, kind } : eventItem);
      const newKey = eventKey({ date, time, title });
      if (oldKey !== newKey && meetingChecklists[oldKey]) {
        meetingChecklists[newKey] = meetingChecklists[oldKey];
        delete meetingChecklists[oldKey];
        saveMeetingChecklists();
      }
    }
  } else {
    calendarEvents.push({ id: crypto.randomUUID(), date, time, title, kind });
  }
  saveCalendarEvents();
  resetEventForm(date);
  visibleMonth = new Date(`${date}T00:00:00`);
  activateCalendarView("month");
});
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.querySelector("#taskTitle").value.trim();
  const category = document.querySelector("#taskCategory").value;
  if (!title) return;
  tasks.unshift(normalizeTask({ id: crypto.randomUUID(), title, owner: document.querySelector("#taskOwner").value, priority: document.querySelector("#taskPriority").value, category, due: "오늘", done: false, type: "task" }));
  taskForm.reset();
  document.querySelector("#taskOwner").value = "ME";
  document.querySelector("#taskCategory").value = "message";
  document.querySelector("#taskPriority").value = "medium";
  saveTasks();
  render();
});

document.querySelector("#calendarGrid").addEventListener("submit", (event) => {
  const form = event.target.closest("[data-meeting-form]");
  if (!form) return;
  event.preventDefault();
  const input = form.querySelector("input");
  const text = input.value.trim();
  if (!text) return;
  const key = form.dataset.meetingForm;
  meetingChecklists[key] = [...(meetingChecklists[key] || []), { id: crypto.randomUUID(), text, done: false }];
  input.value = "";
  saveMeetingChecklists();
  render();
});

document.querySelector("#calendarGrid").addEventListener("click", (event) => {
  const eventRemove = event.target.closest("[data-event-delete]");
  const eventEdit = event.target.closest("[data-event-edit]");
  const toggle = event.target.closest("[data-meeting-key]");
  const remove = event.target.closest("[data-meeting-delete]");
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
  if (!toggle && !remove) return;
  const key = (toggle || remove).dataset.meetingKey || (toggle || remove).dataset.meetingDelete;
  const itemId = (toggle || remove).dataset.meetingItem;
  if (toggle) meetingChecklists[key] = (meetingChecklists[key] || []).map((item) => item.id === itemId ? { ...item, done: !item.done } : item);
  if (remove) meetingChecklists[key] = (meetingChecklists[key] || []).filter((item) => item.id !== itemId);
  saveMeetingChecklists();
  render();
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
    activeFilter = button.dataset.filter;
    filters.forEach((filter) => filter.classList.toggle("is-active", filter === button));
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

resetButton.addEventListener("click", () => { tasks = []; calendarEvents = []; meetingChecklists = {}; memoChecks = []; resetEventForm(); saveTasks(); saveCalendarEvents(); saveMeetingChecklists(); saveMemoChecks(); render(); });

render();
