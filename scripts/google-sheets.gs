/** Deploy from the clinic's own Apps Script account; see README.md. */
function doPost(e) {
  const json = value => ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
  const lock = LockService.getScriptLock();
  try {
    const config = PropertiesService.getScriptProperties();
    const body = JSON.parse(e.postData.contents);
    if (!config.getProperty('WEBHOOK_SECRET') || body.secret !== config.getProperty('WEBHOOK_SECRET')) return json({ok:false});
    const item = body.enquiry;
    if (!item || item.consent !== true || !/^(?:\+91[ -]?|0)?[6-9]\d{9}$/.test(item.phone) || typeof item.name !== 'string' || item.name.length > 100 || !item.branch || !item.date) return json({ok:false});
    const phoneKey = Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, item.phone.replace(/\D/g, '').slice(-10)));
    if (!lock.tryLock(10000)) return json({ok:false});
    const cache = CacheService.getScriptCache();
    if (cache.get(phoneKey)) return json({ok:false});
    const spreadsheet = SpreadsheetApp.openById(config.getProperty('SHEET_ID'));
    const sheet = spreadsheet.getSheetByName('Enquiries') || spreadsheet.insertSheet('Enquiries');
    if (sheet.getLastRow() === 0) sheet.appendRow(['Received (UTC)','Name','Mobile','Email','Branch','Treatment','Preferred date','Preferred time','Message','Consent','Status']);
    // Prevent spreadsheet formula injection for every submitted text field.
    const safe = value => { const text = String(value == null ? '' : value).slice(0, 1500); return /^[\s]*[=+@\-]/.test(text) ? "'" + text : text; };
    sheet.appendRow([new Date().toISOString(), item.name, item.phone, item.email, item.branch, item.treatment, item.date, item.time, item.message, 'Yes', 'Enquiry — awaiting clinic confirmation'].map(safe));
    SpreadsheetApp.flush();
    cache.put(phoneKey, '1', 60);
    return json({ok:true});
  } catch (_) { return json({ok:false}); }
  finally { if (lock.hasLock()) lock.releaseLock(); }
}
