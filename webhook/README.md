# Lead Webhook (Google Apps Script)

`Code.gs` in this folder is a version-controlled copy of the Google Apps
Script Web App that `index.html` posts leads to (via
`GOOGLE_SHEET_WEBHOOK_URL`). The actual, *running* copy lives inside the
Google Sheet's script editor — Google Apps Script isn't hosted in this
repo, so this file exists purely so the logic isn't undocumented and can
be recovered/updated without hunting through the Sheet's UI.

**If leads start landing in the wrong columns again** (name under the
wrong header, phone under "Intent", etc.), the fix is almost always here,
not in `index.html` — the form's JS payload is stable; what breaks is
this script's mapping from payload fields to sheet columns.

## To update the live script

1. Open the Sheet: https://docs.google.com/spreadsheets/d/1BK1r88FSGV5ZIXQ_3fyixMQW8E6Bjuoa9faRMdUjEak/edit
2. `Extensions > Apps Script`
3. Paste in the contents of `Code.gs` (overwrite what's there), Save.
4. Make sure row 1 (headers) reads exactly, left to right:
   `Timestamp | Source | Name | Phone | Child's Class/Age | Intent`
5. `Deploy > Manage deployments` > pencil (Edit) icon on the existing
   deployment > Version: **New version** > Deploy. This keeps the same
   `/exec` URL, so `index.html` never needs to change.
6. To verify it works, either:
   - Submit a test lead on the live site, **or**
   - In the Apps Script editor, select **`doTest`** from the function
     dropdown next to the Run button (not `doPost`) and click **Run**.
     `doTest` fakes a realistic form submission and calls `doPost` with
     it, so you can confirm a row lands under the right headers without
     touching the live site. Delete the test row from the sheet after.

   ⚠️ If you click **Run** on `doPost` itself, you will always get
   `TypeError: Cannot read properties of undefined (reading 'postData')`.
   That is expected and **not a bug** — `doPost` only receives a real
   event object when Google's servers invoke it for an actual HTTP
   POST; the editor's Run button calls it with no arguments. Use
   `doTest` to test manually instead.

`Code.gs` maps values to columns **by header name**, not by fixed
position — so reordering or adding columns in the sheet won't break it
again as long as the header text still matches a key in `fieldMap`.
