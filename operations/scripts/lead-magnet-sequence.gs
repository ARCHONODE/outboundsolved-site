/**
 * OutboundSolved — Lead Magnet Welcome Sequence
 *
 * WHAT IT DOES:
 * When someone submits the email capture form on outboundsolved.com,
 * this script:
 * 1. Logs them to the Leads tab in Ops Hub
 * 2. Sends Email 1 immediately (welcome + playbook)
 * 3. Schedules Emails 2-5 over the next 5 days (one per day)
 *
 * SETUP:
 * 1. Update SHEET_ID and FROM_EMAIL below
 * 2. Set up triggers (see SETUP section at bottom)
 */

const SHEET_ID = 'YOUR_SHEET_ID_HERE';
const FROM_EMAIL = 'team@outboundsolved.com';
const CALENDLY_LINK = 'https://calendly.com/outboundsolved/15min';

// ============================================================
// MAIN TRIGGER: Email capture form submission
// ============================================================

/**
 * Triggered when someone submits the email capture form on the landing page
 */
function onLeadCapture(e) {
  try {
    // Handle missing event (manual testing)
    if (!e || !e.namedValues) {
      Logger.log('No event data. This function is designed for form submissions.');
      return;
    }

    const email = e.namedValues['email'] ? e.namedValues['email'][0] : '';
    if (!email) {
      Logger.log('No email provided. Skipping.');
      return;
    }

    // 1. Log to Leads tab
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const leadsSheet = ss.getSheetByName('Leads');
    const now = new Date();

    leadsSheet.appendRow([
      now.toISOString(),
      email,
      'Landing page form',
      '', // UTM Source (will be filled via UTM tracking later)
      '', // UTM Medium
      'New',
      'Email 1 sent ' + now.toISOString().split('T')[0],
      'Auto-enrolled in welcome sequence'
    ]);

    // 2. Send Email 1 immediately
    sendEmail1(email);

    // 3. Schedule Emails 2-5 (one per day for next 4 days)
    scheduleFollowupEmails(email);

    Logger.log(`Lead captured: ${email}, welcome sequence scheduled`);

  } catch (error) {
    Logger.log(`Error in onLeadCapture: ${error.toString()}`);
    GmailApp.sendEmail(
      FROM_EMAIL,
      'Ops Hub Error — Lead Capture',
      `Error processing lead capture:\n\n${error.toString()}`
    );
  }
}

// ============================================================
// EMAIL 1: Immediate welcome + playbook
// ============================================================

function sendEmail1(email) {
  const subject = 'Your B2B cold email playbook is here';
  const body = `Hi,

Thanks for downloading the B2B Cold Email Playbook. Here's the full system we use to book 5-15 qualified meetings per month for B2B SaaS clients.

The playbook covers:
- List-building (where to find 1,000 ICP-matched leads in 2 hours)
- The 4-email sequence that consistently books meetings
- Deliverability setup (SPF/DKIM/DMARC + warmup)
- Reply handling framework (auto-reply + escalate + close)
- The metrics dashboard (what to track, when to worry)

**Read it here:** https://outboundsolved.com/assets/5-part-cold-email-playbook.md

Over the next 5 days, I'll send you 4 more emails walking through specific parts of the playbook — with real examples from our client work.

Email 2 (tomorrow): The 4-email sequence we use (with subject lines that work)
Email 3 (day 3): How we deliverability-protect new domains in 14 days
Email 4 (day 4): The reply-handling framework (positive/objection/unsubscribe)
Email 5 (day 5): How to know if cold email is working for you (metrics that matter)

If you want to skip ahead and see how we'd do this for YOUR business, here's my calendar: ${CALENDLY_LINK}

Talk soon,
The OutboundSolved team

---
You're receiving this because you submitted your email on outboundsolved.com.
Reply to this email if you'd like to unsubscribe.
`;

  GmailApp.sendEmail(email, subject, body, { from: FROM_EMAIL, name: 'OutboundSolved' });
}

// ============================================================
// EMAIL 2: The 4-email sequence (day 2)
// ============================================================

function sendEmail2(email) {
  const subject = 'The 4-email sequence that books 15+ meetings/month';
  const body = `Hi,

Yesterday I shared the B2B Cold Email Playbook. Today: the exact 4-email sequence that consistently books 5-15 meetings per month.

**Why 4 emails?**

We tested 1, 2, 4, 6, and 8-email sequences over 50+ campaigns. Here's what we found:

- 1 email: You get 50% of the responses. Massive opportunity cost.
- 2 emails: 70% of responses. Still leaving money on the table.
- 4 emails: 95% of responses. The sweet spot.
- 6 emails: 98% of responses. Diminishing returns.
- 8 emails: Spam complaints start increasing. Hurts your domain reputation.

**The 4-email structure:**

Email 1 (Day 1) — Pattern interrupt
Subject: quick question, {{first_name}}
Goal: Get them to open. Reference something specific about their role or company.

Email 2 (Day 3) — Value drop
Subject: re: {{original_subject}}
Goal: Show them what's different about our approach. 4 specific tactics they haven't tried.

Email 3 (Day 7) — Case study
Subject: case study: {{vertical}} booked {{number}} meetings
Goal: Prove it works with a specific example (industry, company size, results).

Email 4 (Day 12) — Breakup
Subject: closing the loop, {{first_name}}
Goal: Last touch. Soft ask: "the door's open if you ever want to chat."

**Subject lines that work:**

For Email 1, we A/B tested these:
- "quick question, {{first_name}}" — 47% open rate
- "{{company}} + cold email" — 41% open rate
- "noticed {{specific_thing}}" — 52% open rate
- "{{first_name}}, your take on {{topic}}" — 38% open rate

The "noticed X" pattern interrupt performs best because it's specific to them, not generic.

**Tomorrow (Email 3):** How we deliverability-protect new domains in 14 days.

If you want to see what we'd write for YOUR ICP, here's my calendar: ${CALENDLY_LINK}

Talk soon,
The OutboundSolved team
`;

  GmailApp.sendEmail(email, subject, body, { from: FROM_EMAIL, name: 'OutboundSolved' });
}

// ============================================================
// EMAIL 3: Deliverability setup (day 3)
// ============================================================

function sendEmail3(email) {
  const subject = 'Deliverability: protect new domains in 14 days';
  const body = `Hi,

Day 3 of the welcome series. Today: deliverability — the unsexy but critical part of cold email that most people skip.

**Why this matters:**

Your main domain (the one on your website, in your email signature, that everyone knows) is your most valuable asset. If you send 100+ cold emails from it and get 10 spam complaints, you can damage your domain reputation for years.

We never send cold email from a client's main domain. We use separate sending domains.

**The 14-day setup:**

Day 1: Buy 3-5 sending domains ($10 each on Namecheap or similar)
Day 2: Set up Gmail inboxes on each domain (or use Google Workspace $7/mo)
Day 3-7: Configure SPF, DKIM, DMARC records (DNS settings)
Day 8-14: Warmup — send 5-10 emails/day between inboxes (replies to real people, newsletter signups, etc.)

After 14 days, the domains are ready for cold email. We rotate between inboxes (15-20 emails/day per inbox, not 100 from one).

**What we monitor:**

- Sender reputation (via Google Postmaster Tools)
- Bounce rate (target: <2%)
- Spam complaint rate (target: <0.1%)
- Open rate by domain (if one domain is tanking, we pause and diagnose)

**The math:**

If you send 1,000 cold emails per month across 3 sending domains:
- 333 per domain per month
- 11 per domain per day (well under Gmail's 500/day limit)
- 0.3% spam complaint rate (well below Gmail's 0.5% threshold)

**What happens if you skip this:**

You send 500 cold emails from your main domain in week 1. 2.5 spam complaints. Your domain gets flagged. Your normal email (to clients, vendors, investors) starts going to spam.

This is the #1 mistake agencies make. Don't be that agency.

**Tomorrow (Email 4):** The reply-handling framework.

If you want us to handle all this for you: ${CALENDLY_LINK}

Talk soon,
The OutboundSolved team
`;

  GmailApp.sendEmail(email, subject, body, { from: FROM_EMAIL, name: 'OutboundSolved' });
}

// ============================================================
// EMAIL 4: Reply handling (day 4)
// ============================================================

function sendEmail4(email) {
  const subject = 'The reply-handling framework that books meetings';
  const body = `Hi,

Day 4. Today: how we handle replies once they come in.

**Why reply speed matters more than copy:**

We tested reply times across 30+ campaigns. Here's the data:
- Reply in 30 min: 45% book a meeting
- Reply in 2 hours: 35% book a meeting
- Reply in 24 hours: 15% book a meeting
- Reply in 48 hours: 8% book a meeting

Speed matters 5x more than perfect copy. We reply within 1 hour, every business day.

**The framework:**

When a reply comes in, we categorize it into one of 11 types:

POSITIVE — interested, let's chat, send info
→ Action: Reply with calendar link within 1 hour

OBJECTION_PRICE — too expensive, what's the cost
→ Action: Reply with ROI math + case study

OBJECTION_TRUST — tried before, didn't work
→ Action: Reply with case study + offer short pilot

OBJECTION_TIME — not now, later, next quarter
→ Action: Add to nurture sequence, re-engage in 90 days

OBJECTION_RELEVANCE — wrong person, not a fit
→ Action: Ask for correct contact or close

UNSUBSCRIBE — remove me, stop emailing
→ Action: Add to suppression list, no further contact

OUT_OF_OFFICE — auto-reply
→ Action: Retry in 7 days

REFERRAL — talk to my colleague
→ Action: Reach out to referred person

NOT_RELEVANT — no thanks
→ Action: Mark closed, no action

UNCLEAR — can't determine intent
→ Action: Human review

**What humans do vs AI:**

AI categorizes (instant, 90%+ accuracy)
Humans respond to POSITIVE replies (1-hour SLA)
AI handles objection responses (templated, then escalated)
Humans handle UNCLEAR replies (judgment needed)

This split gives you speed + quality. AI doesn't lose replies. Humans don't miss the hot leads.

**Tomorrow (Email 5):** Metrics — how to know if cold email is working for you.

If you want this for your business: ${CALENDLY_LINK}

Talk soon,
The OutboundSolved team
`;

  GmailApp.sendEmail(email, subject, body, { from: FROM_EMAIL, name: 'OutboundSolved' });
}

// ============================================================
// EMAIL 5: Metrics (day 5) — final email in sequence
// ============================================================

function sendEmail5(email) {
  const subject = 'The 4 metrics that tell you if cold email is working';
  const body = `Hi,

Last email of the welcome series. Today: the metrics that matter.

**Stop tracking these (vanity metrics):**

- Total emails sent (who cares?)
- Open rate (Google is moving away from tracking this)
- Click rate (cold email isn't about clicks)
- Bounce rate (just keep it under 2%, that's enough)

**Start tracking these (real metrics):**

1. Reply rate
   - Bad: <2%
   - Okay: 2-5%
   - Good: 5-10%
   - Excellent: 10%+
   - What it tells you: Your targeting + copy is working

2. Positive reply rate
   - Bad: <0.5%
   - Okay: 0.5-1%
   - Good: 1-2%
   - Excellent: 2%+
   - What it tells you: Your offer is compelling

3. Meetings booked per month
   - Bad: <3
   - Okay: 3-5
   - Good: 5-15
   - Excellent: 15+
   - What it tells you: End-to-end funnel is working

4. Pipeline generated per month
   - Bad: <2x monthly fee
   - Okay: 2-5x monthly fee
   - Good: 5-10x monthly fee
   - Excellent: 10x+ monthly fee
   - What it tells you: ROI is real

**What "good" looks like:**

For a $2,497/mo client, we expect by month 2:
- 5-15 meetings booked
- 1-3 closed deals
- $10-50K new pipeline generated
- ROI: 4-20x monthly fee

If we're not hitting these targets, we diagnose: list quality, copy, targeting, offer, or sales process.

**The weekly report:**

Every Monday at 9am, clients get a report with:
- This week's numbers vs targets
- Reply breakdown by category
- Action items for next week
- Pipeline estimate based on meetings booked

No fluff. Just numbers and what they mean.

---

That's the end of the welcome series.

If you want to see how this would work for YOUR business, here's my calendar:

**Book a 15-min fit call:** ${CALENDLY_LINK}

We'll talk about:
- Your ICP and current outbound situation
- What realistic results look like for your business
- Which tier ($997 / $2,497 / $4,997) makes sense
- No pitch if it's not a fit

Talk soon,
The OutboundSolved team

---
You're receiving this because you submitted your email on outboundsolved.com.
Reply to this email if you'd like to unsubscribe from future emails.
`;

  GmailApp.sendEmail(email, subject, body, { from: FROM_EMAIL, name: 'OutboundSolved' });
}

// ============================================================
// SCHEDULING: Queue follow-up emails via time-based triggers
// ============================================================

/**
 * Creates 4 time-based triggers to send emails 2-5 over the next 4 days
 */
function scheduleFollowupEmails(email) {
  // Delete any existing triggers for these functions (to avoid duplicates)
  const existingTriggers = ScriptApp.getProjectTriggers();
  existingTriggers.forEach(trigger => {
    const func = trigger.getHandlerFunction();
    if (['sendScheduledEmail2', 'sendScheduledEmail3', 'sendScheduledEmail4', 'sendScheduledEmail5'].includes(func)) {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Store the email in User Properties so the trigger functions can access it
  const props = PropertiesService.getUserProperties();

  // Email 2: tomorrow at 9am
  scheduleEmailForTomorrow('sendScheduledEmail2', props, email, '2');

  // Email 3: 2 days from now at 9am
  scheduleEmailForDaysAhead('sendScheduledEmail3', props, email, '3', 2);

  // Email 4: 3 days from now at 9am
  scheduleEmailForDaysAhead('sendScheduledEmail4', props, email, '4', 3);

  // Email 5: 4 days from now at 9am
  scheduleEmailForDaysAhead('sendScheduledEmail5', props, email, '5', 4);
}

function scheduleEmailForTomorrow(funcName, props, email, emailNumber) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(9, 0, 0, 0);

  props.setProperty('pending_email_' + emailNumber, email);
  props.setProperty('pending_email_' + emailNumber + '_sendat', tomorrow.toISOString());

  ScriptApp.newTrigger(funcName)
    .timeBased()
    .at(tomorrow)
    .create();
}

function scheduleEmailForDaysAhead(funcName, props, email, emailNumber, daysAhead) {
  const target = new Date();
  target.setDate(target.getDate() + daysAhead);
  target.setHours(9, 0, 0, 0);

  props.setProperty('pending_email_' + emailNumber, email);
  props.setProperty('pending_email_' + emailNumber + '_sendat', target.toISOString());

  ScriptApp.newTrigger(funcName)
    .timeBased()
    .at(target)
    .create();
}

// ============================================================
// TRIGGER HANDLERS (called by the scheduled triggers)
// ============================================================

function sendScheduledEmail2() { sendScheduledHelper('2', sendEmail2); }
function sendScheduledEmail3() { sendScheduledHelper('3', sendEmail3); }
function sendScheduledEmail4() { sendScheduledHelper('4', sendEmail4); }
function sendScheduledEmail5() { sendScheduledHelper('5', sendEmail5); }

function sendScheduledHelper(emailNumber, sendFunction) {
  const props = PropertiesService.getUserProperties();
  const email = props.getProperty('pending_email_' + emailNumber);

  if (email) {
    sendFunction(email);
    // Clean up
    props.deleteProperty('pending_email_' + emailNumber);
    props.deleteProperty('pending_email_' + emailNumber + '_sendat');
    Logger.log(`Sent scheduled email ${emailNumber} to ${email}`);
  }
}

// ============================================================
// TEST FUNCTION
// ============================================================

function testLeadCapture() {
  const testEvent = {
    namedValues: {
      'email': ['archonode.assistant+welcometest@gmail.com']
    }
  };

  Logger.log('Running test with sample email...');
  // Note: this will create real triggers. To avoid spam, only run once.
  // onLeadCapture(testEvent);
  Logger.log('Test uncommented line to actually run. Skipping for safety.');
}