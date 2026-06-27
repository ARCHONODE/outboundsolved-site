/**
 * OutboundSolved — Reply Tracker
 *
 * SETUP:
 * 1. Update SHEET_ID below with your Ops Hub Google Sheet ID
 * 2. Create a Gmail label called "Cold-Outreach-Replies" and apply it to replies
 * 3. Set up trigger: Time-driven → Every 5 minutes → processReplies
 *
 * WHAT IT DOES:
 * - Checks Gmail every 5 minutes for unread emails with the "Cold-Outreach-Replies" label
 * - Categorizes each reply into one of 11 types (POSITIVE, OBJECTION_PRICE, etc.)
 * - Adds a row to the "Replies" tab with the category and recommended action
 * - Marks the email as read so it doesn't get processed again
 */

// ============================================================
// CONFIG
// ============================================================
const SHEET_ID = 'YOUR_SHEET_ID_HERE';  // Your Ops Hub Google Sheet ID
const SHEET_NAME = 'Replies';
const TRIGGER_LABEL = 'Cold-Outreach-Replies';  // Must match your Gmail label exactly

// ============================================================
// MAIN FUNCTION
// ============================================================

/**
 * Processes unread Gmail messages with the TRIGGER_LABEL
 * Runs automatically every 5 minutes via time-based trigger
 */
function processReplies() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const threads = GmailApp.search(`label:${TRIGGER_LABEL} is:unread`, 0, 50);

    let processed = 0;
    let skipped = 0;

    threads.forEach(thread => {
      thread.getMessages().forEach(message => {
        if (!message.isUnread()) return;

        try {
          const from = message.getFrom();
          const subject = message.getSubject();
          const body = message.getPlainBody();
          const date = message.getDate();

          // Parse sender email
          const emailMatch = from.match(/<(.+?)>/) || [null, from];
          const emailAddress = emailMatch[1] || from;

          // Parse sender name
          const nameMatch = from.match(/^(.+?)\s*</);
          const name = nameMatch ? nameMatch[1].trim().replace(/['"]/g, '') : '';

          // Categorize the reply
          const category = categorizeReply(body, subject);
          const action = getAction(category);

          // Check for duplicates
          const existing = sheet.getDataRange().getValues();
          const alreadyLogged = existing.some(row =>
            row[1] === emailAddress &&
            row[4] === subject &&
            row[6] === category
          );

          if (!alreadyLogged) {
            // Add row to Replies tab
            sheet.appendRow([
              Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm'),  // A: Date
              emailAddress,          // B: Lead Email
              name,                  // C: Lead Name
              extractCompany(emailAddress),  // D: Company
              subject,               // E: Subject
              body.substring(0, 200) + (body.length > 200 ? '...' : ''),  // F: Reply Snippet
              category,              // G: Category
              action,                // H: Action
              '',                    // I: Handled Date
              ''                     // J: Notes
            ]);
            processed++;
          } else {
            skipped++;
          }

          // Mark as read so we don't process again
          message.markRead();

        } catch (msgError) {
          Logger.log(`Error processing message: ${msgError.toString()}`);
          skipped++;
        }
      });
    });

    if (processed > 0) {
      Logger.log(`Processed ${processed} new replies, skipped ${skipped}`);
    }

  } catch (error) {
    Logger.log(`Error in processReplies: ${error.toString()}`);
    // Notify on error
    GmailApp.sendEmail(
      Session.getActiveUser().getEmail(),
      'Ops Hub Error — Reply Tracker',
      `Error processing replies:\n\n${error.toString()}\n\nCheck the Apps Script execution log.`
    );
  }
}

// ============================================================
// CATEGORIZATION
// ============================================================

/**
 * Categorize a reply based on keyword matching
 * @param {string} body - Email body
 * @param {string} subject - Email subject
 * @returns {string} Category name
 */
function categorizeReply(body, subject) {
  const text = (body + ' ' + subject).toLowerCase();

  // Unsubscribes (check first — these are definitive)
  if (text.match(/unsubscribe|remove me|stop emailing|remove from list|opt.?out/)) {
    return 'UNSUBSCRIBE';
  }

  // Out of office auto-replies
  if (text.match(/out of office|ooo|vacation|away until|back on|auto.?reply|automatic reply/)) {
    return 'OUT_OF_OFFICE';
  }

  // Positive intent (interested, wants to chat)
  if (text.match(/interested|let.?s chat|tell me more|send (me )?(info|more)|sounds good|would love to|book (a|some) time|schedule (a|some) time|call (you|us)|meeting|yes|absolutely|definitely|love to learn/)) {
    return 'POSITIVE';
  }

  // Objection: Price/cost concerns
  if (text.match(/expensive|cost|price|budget|afford|how much|cheaper|too much/)) {
    return 'OBJECTION_PRICE';
  }

  // Objection: Trust (tried before, skeptical)
  if (text.match(/tried before|didn.?t work|scam|don.?t trust|spam|sure about|legitimate/)) {
    return 'OBJECTION_TRUST';
  }

  // Objection: Timing (not now, later)
  if (text.match(/not (a )?good time|next quarter|maybe later|bad timing|busy right now|not now|later this year|next year/)) {
    return 'OBJECTION_TIME';
  }

  // Objection: Relevance (wrong person, not a fit)
  if (text.match(/wrong person|not (the right|my) area|not relevant|someone else|not interested|not a fit/)) {
    return 'OBJECTION_RELEVANCE';
  }

  // Referral (talk to someone else)
  if (text.match(/talk to|talk with|speak with|reach out to|email my colleague|forward to|connect you with/)) {
    return 'REFERRAL';
  }

  // Not relevant / not a fit at all
  if (text.match(/no thanks|no thank you|not for us|wrong fit/)) {
    return 'NOT_RELEVANT';
  }

  // Default: needs human review
  return 'UNCLEAR';
}

/**
 * Get the recommended action for each category
 * @param {string} category - The category name
 * @returns {string} Action description
 */
function getAction(category) {
  const actions = {
    'POSITIVE': 'Reply with calendar link (within 1 hour)',
    'OBJECTION_PRICE': 'Reply with ROI math + case study',
    'OBJECTION_TRUST': 'Reply with case study + offer short pilot',
    'OBJECTION_TIME': 'Add to nurture, re-engage in 90 days',
    'OBJECTION_RELEVANCE': 'Ask for correct contact',
    'UNSUBSCRIBE': 'Add to suppression list, no further contact',
    'OUT_OF_OFFICE': 'Retry in 7 days',
    'REFERRAL': 'Contact referred person',
    'NOT_RELEVANT': 'Mark closed, no further action',
    'UNCLEAR': 'Human review needed'
  };
  return actions[category] || 'Review';
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Extract company name from email domain
 * @param {string} email - Email address
 * @returns {string} Company name (capitalized) or empty string
 */
function extractCompany(email) {
  if (!email || !email.includes('@')) return '';

  const domain = email.split('@')[1];
  if (!domain) return '';

  // Skip personal email providers
  const personalDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'aol.com', 'protonmail.com'];
  if (personalDomains.includes(domain.toLowerCase())) return '';

  // Extract company name (first part of domain)
  const parts = domain.split('.');
  const name = parts[0];

  // Capitalize first letter
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// ============================================================
// OPTIONAL: Setup function to create the trigger automatically
// Run this ONCE to set up the time-based trigger
// ============================================================

/**
 * Call this function once to set up the 5-minute trigger automatically
 * After running, you can delete this function or leave it (it's safe)
 */
function setupTrigger() {
  // Delete any existing triggers for this function
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'processReplies') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Create new trigger: every 5 minutes
  ScriptApp.newTrigger('processReplies')
    .timeBased()
    .everyMinutes(5)
    .create();

  Logger.log('Trigger set up: processReplies will run every 5 minutes');
}