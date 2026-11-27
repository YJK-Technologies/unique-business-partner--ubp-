/**
 * UNIQUE Business Partner (UBP) — Google Apps Script Backend
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a Google Sheet for storing website enquiries.
 * 2. Open Extensions -> Apps Script in that Google Sheet.
 * 3. Paste this entire file into Code.gs and save.
 * 4. Run `setupSheetHeaders()` once to initialize the "Enquiries" tab and headers.
 * 5. Click Deploy -> New deployment -> Web app:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the deployed Web App URL into `SCRIPT_URL` at the top of `script.js`.
 */

const SHEET_NAME = 'Enquiries';
const NOTIFICATION_EMAIL = 'uniquebusinesspartner@gmail.com';

/**
 * Optional one-time setup function to create the Enquiries sheet & styled header row.
 */
function setupSheetHeaders() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  const headers = [
    'Timestamp',
    'Full Name',
    'Organization',
    'Email',
    'Phone',
    'Service Vertical',
    'Engagement Model',
    'Requirements',
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#0B1F3A')
    .setFontColor('#FFFFFF');
  sheet.setFrozenRows(1);
}

/**
 * Handles POST requests from the UBP website enquiry form (FormData).
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const params = e && e.parameter ? e.parameter : {};

    const fullName = (params.fullName || '').trim();
    const company = (params.company || '').trim();
    const email = (params.email || '').trim();
    const phone = (params.phone || '').trim();
    const service = (params.service || 'General Consultation').trim();
    const engagementModel = (params.engagementModel || 'Not Specified').trim();
    const message = (params.message || '').trim();

    if (!fullName || !email || !phone) {
      return createJsonResponse('error', 'Missing required fields: fullName, email, or phone.');
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      setupSheetHeaders();
      sheet = ss.getSheetByName(SHEET_NAME);
    }

    const timestamp = new Date();
    sheet.appendRow([
      timestamp,
      fullName,
      company,
      email,
      phone,
      service,
      engagementModel,
      message,
    ]);

    sendNotificationEmail({
      timestamp: timestamp,
      fullName: fullName,
      company: company,
      email: email,
      phone: phone,
      service: service,
      engagementModel: engagementModel,
      message: message,
    });

    return createJsonResponse('success', 'Enquiry recorded and notification sent.');
  } catch (error) {
    return createJsonResponse('error', error.toString());
  } finally {
    lock.releaseLock();
  }
}

/**
 * Sends a structured email notification to uniquebusinesspartner@gmail.com.
 */
function sendNotificationEmail(data) {
  const subject = 'New Website Enquiry: ' + data.service + ' — ' + (data.company || data.fullName);

  const plainBody = [
    'New Consultation Enquiry from UNIQUE Business Partner Website',
    '------------------------------------------------------------',
    'Submitted At: ' + data.timestamp.toString(),
    'Full Name: ' + data.fullName,
    'Organization: ' + (data.company || 'N/A'),
    'Email: ' + data.email,
    'Phone: ' + data.phone,
    'Service Vertical: ' + data.service,
    'Engagement Model: ' + data.engagementModel,
    '',
    'Requirements / Scope:',
    data.message || 'N/A',
  ].join('\n');

  const htmlBody =
    '<div style="font-family: Arial, sans-serif; color: #0f172a; max-width: 640px;">' +
    '<div style="background: #0B1F3A; color: #ffffff; padding: 16px 20px; border-radius: 6px 6px 0 0;">' +
    '<h2 style="margin: 0; font-size: 18px;">UNIQUE Business Partner — New Website Enquiry</h2>' +
    '</div>' +
    '<div style="border: 1px solid #e2e8f0; border-top: none; padding: 20px; border-radius: 0 0 6px 6px;">' +
    '<table style="width: 100%; border-collapse: collapse; font-size: 14px;">' +
    '<tr><td style="padding: 8px 0; font-weight: bold; width: 170px;">Full Name:</td><td>' + escapeHtml(data.fullName) + '</td></tr>' +
    '<tr><td style="padding: 8px 0; font-weight: bold;">Organization:</td><td>' + escapeHtml(data.company || 'N/A') + '</td></tr>' +
    '<tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:' + escapeHtml(data.email) + '">' + escapeHtml(data.email) + '</a></td></tr>' +
    '<tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>' + escapeHtml(data.phone) + '</td></tr>' +
    '<tr><td style="padding: 8px 0; font-weight: bold;">Service Vertical:</td><td>' + escapeHtml(data.service) + '</td></tr>' +
    '<tr><td style="padding: 8px 0; font-weight: bold;">Engagement Model:</td><td>' + escapeHtml(data.engagementModel) + '</td></tr>' +
    '</table>' +
    '<div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #e2e8f0;">' +
    '<p style="margin: 0 0 6px 0; font-weight: bold; font-size: 14px;">Scope &amp; Requirements:</p>' +
    '<p style="margin: 0; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">' + escapeHtml(data.message || 'N/A') + '</p>' +
    '</div>' +
    '</div>' +
    '</div>';

  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    replyTo: data.email,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
  });
}

function createJsonResponse(status, message) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: status, message: message }))
    .setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
