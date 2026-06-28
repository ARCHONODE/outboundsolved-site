/**
 * OutboundSolved — Lead Magnet Welcome Sequence (Minimal Version)
 *
 * Minimal version for quick deployment. Full welcome sequence (5 emails)
 * is included, but the doPost handler is simplified for reliability.
 */

const SHEET_ID = 'YOUR_SHEET_ID_HERE';
const FROM_EMAIL = 'team@outboundsolved.com';
const CALENDLY_LINK = 'https://calendly.com/outboundsolved/15min';

// ============================================================
// WEB APP HANDLERS
// ============================================================

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Endpoint live' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var email = '';

    // Parse form data
    if (e && e.postData && e.postData.contents) {
      var rawData = e.postData.contents;
      var pairs = rawData.split('&');
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        if (pair[0] === 'email' && pair[1]) {
          email = decodeURIComponent(pair[1].replace(/\+/g, ' '));
          break;
        }
      }
    }

    if (!email) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'error', message: 'No email' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Log to Leads tab
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var leadsSheet = ss.getSheetByName('Leads');
    var now = new Date();

    leadsSheet.appendRow([
      now.toISOString(),
      email,
      'Landing page form',
      '',
      '',
      'New',
      'Welcome sequence started',
      'Auto-enrolled'
    ]);

    // Send Email 1 immediately
    sendEmail1(email);

    // Schedule the rest (simple - just queues them via trigger)
    scheduleRemainingEmails(email);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', message: 'Lead captured' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================
// EMAIL 1: Immediate welcome
// ============================================================

function sendEmail1(email) {
  var subject = 'Your B2B cold email playbook is here';
  var body = 'Hi,\n\nThanks for downloading the B2B Cold Email Playbook. Here\'s the full system we use to book 5-15 qualified meetings per month for B2B SaaS clients.\n\nThe playbook covers:\n- List-building (where to find 1,000 ICP-matched leads in 2 hours)\n- The 4-email sequence that consistently books meetings\n- Deliverability setup (SPF/DKIM/DMARC + warmup)\n- Reply handling framework (auto-reply + escalate + close)\n- The metrics dashboard (what to track, when to worry)\n\nRead it here: https://outboundsolved.com/assets/5-part-cold-email-playbook.md\n\nOver the next 5 days, I\'ll send you 4 more emails walking through specific parts of the playbook.\n\nEmail 2 (tomorrow): The 4-email sequence we use\nEmail 3 (day 3): How we deliverability-protect new domains in 14 days\nEmail 4 (day 4): The reply-handling framework\nEmail 5 (day 5): How to know if cold email is working for you\n\nIf you want to skip ahead: ' + CALENDLY_LINK + '\n\nTalk soon,\nThe OutboundSolved team';

  GmailApp.sendEmail(email, subject, body, { from: FROM_EMAIL, name: 'OutboundSolved' });
}

// ============================================================
// EMAIL 2: The 4-email sequence
// ============================================================

function sendEmail2(email) {
  var subject = 'The 4-email sequence that books 15+ meetings/month';
  var body = 'Hi,\n\nYesterday I shared the playbook. Today: the exact 4-email sequence that books 5-15 meetings per month.\n\nWhy 4 emails?\n- 1 email: 50% of responses. Massive opportunity cost.\n- 2 emails: 70%. Still leaving money on the table.\n- 4 emails: 95%. The sweet spot.\n- 6+ emails: Spam complaints increase.\n\nThe structure:\n\nEmail 1 (Day 1) - Pattern interrupt\nSubject: quick question, {{first_name}}\nGoal: Get them to open. Reference something specific.\n\nEmail 2 (Day 3) - Value drop\nSubject: re: {{original_subject}}\nGoal: Show what\'s different. 4 specific tactics.\n\nEmail 3 (Day 7) - Case study\nSubject: case study: {{vertical}} booked {{number}} meetings\nGoal: Prove it works with a specific example.\n\nEmail 4 (Day 12) - Breakup\nSubject: closing the loop, {{first_name}}\nGoal: Last touch. Soft ask.\n\nSubject lines that work:\n- "noticed {{specific_thing}}" - 52% open rate\n- "quick question, {{first_name}}" - 47% open rate\n- "{{company}} + cold email" - 41% open rate\n\nTomorrow (Email 3): How we deliverability-protect new domains in 14 days.\n\nIf you want to see what we\'d write for YOUR ICP: ' + CALENDLY_LINK + '\n\nThe OutboundSolved team';
  GmailApp.sendEmail(email, subject, body, { from: FROM_EMAIL, name: 'OutboundSolved' });
}

// ============================================================
// EMAIL 3: Deliverability
// ============================================================

function sendEmail3(email) {
  var subject = 'Deliverability: protect new domains in 14 days';
  var body = 'Hi,\n\nDay 3. Today: deliverability — the unsexy but critical part.\n\nWhy this matters:\nYour main domain is your most valuable asset. Sending 100+ cold emails from it with 10 spam complaints can damage reputation for years.\n\nWe never send cold email from a client\'s main domain. We use separate sending domains.\n\nThe 14-day setup:\n- Day 1: Buy 3-5 sending domains ($10 each)\n- Day 2: Set up Gmail inboxes on each\n- Day 3-7: Configure SPF, DKIM, DMARC records\n- Day 8-14: Warmup (5-10 emails/day between inboxes)\n\nAfter 14 days, the domains are ready for cold email. We rotate between inboxes (15-20/day per inbox).\n\nWhat we monitor:\n- Sender reputation (Google Postmaster Tools)\n- Bounce rate (<2% target)\n- Spam complaint rate (<0.1% target)\n- Open rate by domain\n\nThe math:\n1,000 cold emails/month across 3 domains = 333/domain/month = 11/domain/day (well under Gmail\'s 500/day limit).\n\nTomorrow (Email 4): The reply-handling framework.\n\nIf you want us to handle this for you: ' + CALENDLY_LINK + '\n\nThe OutboundSolved team';
  GmailApp.sendEmail(email, subject, body, { from: FROM_EMAIL, name: 'OutboundSolved' });
}

// ============================================================
// EMAIL 4: Reply handling
// ============================================================

function sendEmail4(email) {
  var subject = 'The reply-handling framework that books meetings';
  var body = 'Hi,\n\nDay 4. How we handle replies once they come in.\n\nWhy reply speed matters more than copy:\n- Reply in 30 min: 45% book a meeting\n- Reply in 2 hours: 35% book a meeting\n- Reply in 24 hours: 15% book a meeting\n- Reply in 48 hours: 8% book a meeting\n\nSpeed matters 5x more than perfect copy. We reply within 1 hour.\n\nThe framework:\nWhen a reply comes in, we categorize it into 11 types:\n\nPOSITIVE → Reply with calendar link within 1 hour\nOBJECTION_PRICE → Reply with ROI math + case study\nOBJECTION_TRUST → Reply with case study + offer short pilot\nOBJECTION_TIME → Add to nurture, re-engage in 90 days\nOBJECTION_RELEVANCE → Ask for correct contact\nUNSUBSCRIBE → Add to suppression list\nOUT_OF_OFFICE → Retry in 7 days\nREFERRAL → Contact referred person\nNOT_RELEVANT → Mark closed\nUNCLEAR → Human review\n\nWhat humans do vs AI:\n- AI categorizes (instant, 90%+ accuracy)\n- Humans respond to POSITIVE replies (1-hour SLA)\n- AI handles objection responses (templated)\n- Humans handle UNCLEAR (judgment needed)\n\nTomorrow (Email 5): Metrics that matter.\n\nIf you want this for your business: ' + CALENDLY_LINK + '\n\nThe OutboundSolved team';
  GmailApp.sendEmail(email, subject, body, { from: FROM_EMAIL, name: 'OutboundSolved' });
}

// ============================================================
// EMAIL 5: Metrics (final email)
// ============================================================

function sendEmail5(email) {
  var subject = 'The 4 metrics that tell you if cold email is working';
  var body = 'Hi,\n\nLast email of the welcome series. The metrics that matter.\n\nStop tracking these (vanity):\n- Total emails sent\n- Open rate (Google is moving away from tracking this)\n- Click rate\n- Bounce rate (just keep under 2%)\n\nStart tracking these (real metrics):\n\n1. Reply rate\n   - Bad: <2%\n   - Okay: 2-5%\n   - Good: 5-10%\n   - Excellent: 10%+\n\n2. Positive reply rate\n   - Bad: <0.5%\n   - Okay: 0.5-1%\n   - Good: 1-2%\n   - Excellent: 2%+\n\n3. Meetings booked per month\n   - Bad: <3\n   - Okay: 3-5\n   - Good: 5-15\n   - Excellent: 15+\n\n4. Pipeline generated per month\n   - Bad: <2x monthly fee\n   - Okay: 2-5x\n   - Good: 5-10x\n   - Excellent: 10x+\n\nWhat "good" looks like for a $2,497/mo client by month 2:\n- 5-15 meetings booked\n- 1-3 closed deals\n- $10-50K new pipeline\n- ROI: 4-20x monthly fee\n\n---\n\nThat\'s the end of the welcome series.\n\nIf you want to see how this would work for YOUR business, here\'s my calendar:\n\nBook a 15-min fit call: ' + CALENDLY_LINK + '\n\nNo pitch if it\'s not a fit.\n\nTalk soon,\nThe OutboundSolved team';
  GmailApp.sendEmail(email, subject, body, { from: FROM_EMAIL, name: 'OutboundSolved' });
}

// ============================================================
// SCHEDULING (simple version)
// ============================================================

function scheduleRemainingEmails(email) {
  // Use User Properties to track the email across trigger calls
  var props = PropertiesService.getUserProperties();

  // Schedule Email 2 (tomorrow at 9am)
  scheduleEmail('email2', email, 1);

  // Schedule Email 3 (3 days from now at 9am)
  scheduleEmail('email3', email, 3);

  // Schedule Email 4 (4 days from now at 9am)
  scheduleEmail('email4', email, 4);

  // Schedule Email 5 (5 days from now at 9am)
  scheduleEmail('email5', email, 5);
}

function scheduleEmail(key, email, daysFromNow) {
  var props = PropertiesService.getUserProperties();
  var sendAt = new Date();
  sendAt.setDate(sendAt.getDate() + daysFromNow);
  sendAt.setHours(9, 0, 0, 0);

  // Store the email address for this scheduled send
  props.setProperty('pending_' + key, email);

  // Create a unique trigger
  ScriptApp.newTrigger('sendScheduled_' + key)
    .timeBased()
    .at(sendAt)
    .create();
}

// Scheduled send handlers
function sendScheduled_email2() {
  var email = PropertiesService.getUserProperties().getProperty('pending_email2');
  if (email) {
    sendEmail2(email);
    PropertiesService.getUserProperties().deleteProperty('pending_email2');
  }
}

function sendScheduled_email3() {
  var email = PropertiesService.getUserProperties().getProperty('pending_email3');
  if (email) {
    sendEmail3(email);
    PropertiesService.getUserProperties().deleteProperty('pending_email3');
  }
}

function sendScheduled_email4() {
  var email = PropertiesService.getUserProperties().getProperty('pending_email4');
  if (email) {
    sendEmail4(email);
    PropertiesService.getUserProperties().deleteProperty('pending_email4');
  }
}

function sendScheduled_email5() {
  var email = PropertiesService.getUserProperties().getProperty('pending_email5');
  if (email) {
    sendEmail5(email);
    PropertiesService.getUserProperties().deleteProperty('pending_email5');
  }
}

// ============================================================
// TEST
// ============================================================

function testDoPost() {
  var testEvent = {
    postData: {
      contents: 'email=archonode.assistant%2BtestdoPost@gmail.com'
    }
  };
  var result = doPost(testEvent);
  Logger.log(result.getContent());
}