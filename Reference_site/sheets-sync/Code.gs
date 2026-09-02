// Apps Script Web App backing the "Reference Site Links" Google Sheet.
// Deploy: Extensions > Apps Script > paste this file's contents > Deploy > New deployment > Web app.
// Before deploying, set a Script Property named API_SECRET (Project Settings > Script Properties).

const FIELDS = ["id", "name", "url", "category", "subcategory", "description", "tags", "memo", "editor", "status", "editInfo", "image", "updatedAt"];

function doGet(e) {
  const sheet = getSheet();
  const values = sheet.getDataRange().getValues();
  values.shift(); // header row
  const items = values.filter((row) => row[0]).map(rowToItem);
  return output(items);
}

function doPost(e) {
  const secret = PropertiesService.getScriptProperties().getProperty("API_SECRET");
  const body = JSON.parse(e.postData.contents || "{}");
  if (body.secret !== secret) return output({ error: "unauthorized" });

  const sheet = getSheet();
  if (body.action === "delete" && body.id) {
    removeRowById(sheet, body.id);
    return output({ ok: true });
  }
  if (body.action === "reset") {
    clearAllRows(sheet);
    return output({ ok: true });
  }
  if (body.action === "upsert" && body.item && body.item.id) {
    upsertRow(sheet, body.item);
    return output({ ok: true });
  }
  return output({ error: "bad_request" });
}

function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
}

function rowToItem(row) {
  const item = {};
  FIELDS.forEach((field, i) => {
    item[field] = row[i] === undefined ? "" : row[i];
  });
  item.tags = item.tags
    ? String(item.tags).split(",").map((tag) => tag.trim()).filter(Boolean)
    : [];
  return item;
}

function itemToRow(item) {
  return FIELDS.map((field) => {
    if (field === "tags") return (item.tags || []).join(", ");
    return item[field] === undefined || item[field] === null ? "" : item[field];
  });
}

function findRowIndexById(sheet, id) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return -1;
  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (let i = 0; i < ids.length; i++) {
    if (ids[i][0] === id) return i + 2; // account for header row + 1-index
  }
  return -1;
}

function upsertRow(sheet, item) {
  const rowIndex = findRowIndexById(sheet, item.id);
  const row = itemToRow(item);
  if (rowIndex > -1) {
    sheet.getRange(rowIndex, 1, 1, row.length).setValues([row]);
  } else {
    sheet.appendRow(row);
  }
}

function removeRowById(sheet, id) {
  const rowIndex = findRowIndexById(sheet, id);
  if (rowIndex > -1) sheet.deleteRow(rowIndex);
}

function clearAllRows(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clearContent();
}

function output(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
