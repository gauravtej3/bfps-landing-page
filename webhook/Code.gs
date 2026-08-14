/**
 * BFPS Landing Page — Lead Webhook
 *
 * This is the Google Apps Script Web App that index.html's
 * GOOGLE_SHEET_WEBHOOK_URL posts leads to. It is bound to the
 * "BFPS Lead 4m LP Contacts" spreadsheet and lives ONLY in that
 * spreadsheet's script editor (Extensions > Apps Script) — this file
 * is a version-controlled copy so it isn't lost/undocumented.
 *
 * WHY THIS VERSION EXISTS:
 * A previous version of this script appended row values in a fixed,
 * hardcoded order (timestamp, source, name, phone, age, intent) that
 * didn't match the sheet's header row (Name, Phone, Child's Class/Age,
 * Intent, Time) — so every lead's details landed in the wrong columns.
 *
 * This version fixes that by reading row 1 (the header row) at write
 * time and mapping each field to its matching header BY NAME. As long
 * as the header text matches a key in fieldMap below, columns can be
 * freely reordered or new ones added in the sheet without breaking
 * anything or requiring another code change.
 *
 * HOW TO APPLY:
 * 1. Open the Sheet: https://docs.google.com/spreadsheets/d/1BK1r88FSGV5ZIXQ_3fyixMQW8E6Bjuoa9faRMdUjEak/edit
 * 2. Extensions > Apps Script
 * 3. Replace the existing code with the contents of this file, Save.
 * 4. Set row 1 (header row) to exactly, in this order:
 *      Timestamp | Source | Name | Phone | Child's Class/Age | Intent
 * 5. Deploy > Manage deployments > pencil (Edit) icon on the existing
 *    deployment > Version: "New version" > Deploy.
 *    (This keeps the same /exec URL — index.html does NOT need to change.)
 * 6. Submit a test lead on the live site and confirm it lands in the
 *    right columns.
 */
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var data = JSON.parse(e.postData.contents);

  // Canonical field -> value map. Add new form fields here as needed —
  // the key must exactly match the header text in row 1 of the sheet.
  var fieldMap = {
    'Timestamp': data.submittedAt || new Date().toISOString(),
    'Source': data.source || '',
    'Name': data.name || '',
    'Phone': data.phone || '',
    "Child's Class/Age": data.childClass || data.childAge || '',
    'Intent': data.intent || ''
  };

  var lastCol = sheet.getLastColumn();
  var headers = lastCol > 0 ? sheet.getRange(1, 1, 1, lastCol).getValues()[0] : [];

  // First-time setup: no header row yet, write one out in a sensible order.
  if (headers.length === 0 || headers.join('') === '') {
    headers = Object.keys(fieldMap);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }

  // Build the row in whatever order the sheet's headers actually are,
  // instead of a hardcoded order — this is the fix.
  var row = headers.map(function (h) {
    return fieldMap.hasOwnProperty(h) ? fieldMap[h] : '';
  });

  sheet.appendRow(row);

  return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * TEST-ONLY: run this function (not doPost) from the Apps Script editor's
 * "Run" button to verify the logic without submitting the real form.
 *
 * Clicking Run on doPost() itself will always throw
 * "Cannot read properties of undefined (reading 'postData')" — that is
 * expected and NOT a bug. doPost only receives a real event object (e)
 * when Google's servers invoke it for an actual HTTP POST; the editor's
 * Run button calls it with no arguments at all. Use doTest() instead —
 * it fakes a realistic postData payload and calls doPost() with it, so
 * you can confirm a row lands in the right columns and then just delete
 * that test row from the sheet afterward.
 */
function doTest() {
  var fakeEvent = {
    postData: {
      contents: JSON.stringify({
        name: 'Test Parent',
        phone: '9999999999',
        childAge: '5',
        intent: 'Download Screen-Time Guide',
        source: 'lead-magnet',
        submittedAt: new Date().toISOString()
      })
    }
  };
  var result = doPost(fakeEvent);
  Logger.log(result.getContent());
}
