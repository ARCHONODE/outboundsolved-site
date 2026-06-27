/**
 * OutboundSolved Email Capture Endpoint
 *
 * SETUP (one-time, ~5 minutes):
 *
 * 1. Open Google Sheets: https://sheets.google.com/create
 *    Name it "OutboundSolved Leads"
 *
 * 2. In the new Sheet, click Extensions → Apps Script
 *    Delete any code in the editor, paste THIS ENTIRE FILE
 *
 * 3. Click the disk icon (Save project), name it "Email Capture"
 *
 * 4. Click Deploy → New deployment
 *    - Click the gear icon → "Web app"
 *    - Description: "Email capture v1"
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Click Deploy
 *
 * 5. Google will prompt you to authorize — click "Advanced" → "Go to project (unsafe)" → Allow
 *
 * 6. Copy the Web App URL (looks like: https://script.google.com/macros/s/AKfycb.../exec)
 *
 * 7. Paste that URL into index.html (replace REPLACE_WITH_YOUR_DEPLOYMENT_ID in BOTH forms)
 *    Then redeploy to Vercel.
 *
 * 8. Test by submitting an email on the live site.
 *    It should appear as a new row in your Google Sheet within 5 seconds.
 *
 * Done! No third-party service. Free forever. You own the data.
 */

function doPost(e) {
  try {
    // Get the email from the form submission
    var email = e.parameter.email ? e.parameter.email.toString().trim() : '';

    // Basic validation
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'error', message: 'Invalid email' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Open the active sheet (the first one in your spreadsheet)
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // If this is the first submission, write headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Email', 'Source', 'User Agent', 'Referrer']);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#0a1929').setFontColor('#ffffff');
    }

    // Append the new submission
    sheet.appendRow([
      new Date().toISOString(),
      email,
      e.parameter.source || 'landing-page',
      e.parameter.userAgent || '',
      e.parameter.referrer || ''
    ]);

    // Optional: send yourself a notification email
    // Uncomment the lines below to get notified on every signup.
    // GmailApp.sendEmail(
    //   'team@outboundsolved.com',
    //   'New OutboundSolved lead: ' + email,
    //   'Email: ' + email + '\nTime: ' + new Date().toString() + '\nSource: ' + (e.parameter.source || 'landing-page')
    // );

    // Return success
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', email: email }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing in browser)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'OutboundSolved email capture endpoint is live. POST an email to this URL.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}