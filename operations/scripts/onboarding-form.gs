/**
 * OutboundSolved — New Client Onboarding Form Handler
 *
 * SETUP:
 * 1. Update ONBOARDING_FORM_SHEET_ID below with your Ops Hub Google Sheet ID
 * 2. Save this script
 * 3. Set up trigger: Form submit → onFormSubmit
 *
 * WHAT IT DOES:
 * - Adds a new row to the "Clients" tab
 * - Creates a Google Drive folder named "{Company} — OutboundSolved"
 * - Sends a welcome email with Calendly link + Drive folder link
 * - Logs the event to the "Replies" tab as a SYSTEM_EVENT
 */

// ============================================================
// CONFIG — UPDATE THESE WITH YOUR IDs
// ============================================================
const ONBOARDING_FORM_SHEET_ID = 'YOUR_SHEET_ID_HERE';  // Get this from your Sheet URL: /d/THIS_PART/edit
const ONBOARDING_FORM_CALENDLY_LINK = 'https://calendly.com/outboundsolved/15min';
const ONBOARDING_FORM_FROM_EMAIL = 'team@outboundsolved.com';  // Now configured with Send-as + app password

// ============================================================
// MAIN TRIGGER FUNCTION
// ============================================================

/**
 * Triggered when someone submits the Onboarding Form
 * @param {Object} e - The form submit event (passed automatically when triggered by form submission)
 */
function onFormSubmit(e) {
  try {
    // Handle manual testing (when e is undefined)
    if (!e || !e.namedValues) {
      Logger.log('No event data. This function is designed to run from a form submission trigger. To test manually, use testOnboardingForm() instead.');
      return;
    }

    const values = e.namedValues;

    // Extract form data
    const company = values['Company name'] ? values['Company name'][0] : 'Unknown';
    const contact = values['Primary contact name'] ? values['Primary contact name'][0] : 'Unknown';
    const email = values['Primary contact email'] ? values['Primary contact email'][0] : '';
    const tier = values['Pricing tier'] ? values['Pricing tier'][0] : '';
    const icp = values['Describe your ideal customer (ICP) in 2-3 sentences'] ? values['Describe your ideal customer (ICP) in 2-3 sentences'][0] : '';
    const dealSize = values["What's your average deal size?"] ? values["What's your average deal size?"][0] : '';
    const notes = (values['Anything else we should know?'] && values['Anything else we should know?'][0]) ? values['Anything else we should know?'][0] : '';

    if (!email) {
      Logger.log('No email provided in form submission. Skipping.');
      return;
    }

    // 1. Add to Clients tab
    const ss = SpreadsheetApp.openById(ONBOARDING_FORM_SHEET_ID);
    const clientsSheet = ss.getSheetByName('Clients');

    clientsSheet.appendRow([
      company,           // A: Client
      contact,           // B: Contact
      email,             // C: Email
      tier,              // D: Tier
      new Date().toISOString().split('T')[0],  // E: Start Date
      icp,               // F: ICP
      dealSize,          // G: Avg Deal $
      getMonthlyFee(tier), // H: Monthly Fee
      'Onboarding',      // I: Status
      '🟡',              // J: Health (yellow = new)
      `Auto-created from onboarding form. ${notes}`  // K: Notes
    ]);

    Logger.log(`Added client: ${company}`);

    // 2. Create Drive folder
    const folderName = `${company} — OutboundSolved`;
    const clientFolder = DriveApp.getRootFolder().createFolder(folderName);
    Logger.log(`Created Drive folder: ${folderName}`);

    // 2. Send welcome email (Email 1 of welcome sequence)
    const subject = `Welcome to OutboundSolved — your B2B cold email playbook is here`;
    const body = `Hi ${contact ? contact.split(' ')[0] : 'there'},

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

If you want to skip ahead and see how we'd do this for YOUR business, here's my calendar: ${ONBOARDING_FORM_CALENDLY_LINK}

Talk soon,
The OutboundSolved team

---
You're receiving this because you submitted your email on outboundsolved.com.
Reply to this email if you'd like to unsubscribe.
`;

    GmailApp.sendEmail(email, subject, body, {
      from: ONBOARDING_FORM_FROM_EMAIL,
      name: 'OutboundSolved'
    });

    Logger.log(`Sent welcome email to: ${email}`);

    // 4. Log system event to Replies tab
    const repliesSheet = ss.getSheetByName('Replies');
    repliesSheet.appendRow([
      new Date().toISOString(),  // A: Date
      email,                      // B: Lead Email
      contact,                    // C: Lead Name
      company,                    // D: Company
      'SYSTEM: New client onboarded',  // E: Subject
      `Tier: ${tier} | Deal size: ${dealSize} | ICP: ${icp.substring(0, 100)}`,  // F: Reply Snippet
      'SYSTEM_EVENT',             // G: Category
      'Onboarding complete',      // H: Action
      new Date().toISOString(),  // I: Handled Date
      notes                       // J: Notes
    ]);

    Logger.log(`Logged system event for: ${company}`);

  } catch (error) {
    Logger.log(`Error in onFormSubmit: ${error.toString()}`);
    // Optional: send yourself an error notification
    GmailApp.sendEmail(
      ONBOARDING_FORM_FROM_EMAIL,
      'Ops Hub Error — Onboarding Form',
      `Error processing onboarding form submission:\n\n${error.toString()}\n\nCheck the Apps Script execution log for details.`
    );
  }
}

// ============================================================
// TEST FUNCTION (run this manually to test without submitting the form)
// ============================================================

/**
 * Test the onboarding flow with sample data
 * Run this function manually from the script editor to test
 * (Does NOT require a real form submission)
 */
function testOnboardingForm() {
  // Sample test data (mimics what e.namedValues looks like)
  const testEvent = {
    namedValues: {
      'Company name': ['TestCorp Inc'],
      'Primary contact name': ['Test User'],
      'Primary contact email': ['archonode.assistant+testclient@gmail.com'],
      'Pricing tier': ['Growth ($2,497/mo) — Most popular'],
      'Describe your ideal customer (ICP) in 2-3 sentences': ['VP Marketing at B2B SaaS companies with 50-200 employees'],
      "What's your average deal size?": ['$5,000 - $25,000'],
      'Anything else we should know?': ['This is a test submission']
    }
  };

  Logger.log('Running test with sample data...');
  onFormSubmit(testEvent);
  Logger.log('Test complete. Check the Clients tab, Drive, and email.');
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Extract the monthly fee based on the pricing tier selected
 * @param {string} tier - The tier string from the form
 * @returns {number} Monthly fee in dollars
 */
function getMonthlyFee(tier) {
  if (!tier) return 0;
  if (tier.includes('Starter')) return 997;
  if (tier.includes('Growth')) return 2497;
  if (tier.includes('Scale')) return 4997;
  return 0;
}