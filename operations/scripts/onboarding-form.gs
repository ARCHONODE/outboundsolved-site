/**
 * OutboundSolved — New Client Onboarding Form Handler
 *
 * SETUP:
 * 1. Update SHEET_ID below with your Ops Hub Google Sheet ID
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
const SHEET_ID = 'YOUR_SHEET_ID_HERE';  // Get this from your Sheet URL: /d/THIS_PART/edit
const CALENDLY_LINK = 'https://calendly.com/outboundsolved/15min';
const FROM_EMAIL = 'team@outboundsolved.com';  // Now configured with Send-as + app password

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
    const ss = SpreadsheetApp.openById(SHEET_ID);
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

    // 3. Send welcome email
    const subject = `Welcome to OutboundSolved — let's schedule your kickoff`;
    const body = `Hi ${contact},

Welcome to OutboundSolved! 🎉

Here's what happens next:

Step 1: Schedule your kickoff call
Book a 30-minute slot in the next 7 days:
${CALENDLY_LINK}

Step 2: Prepare for the call (5 min review)
Think about your 3-5 best past customers — what made them great? We'll use this in the kickoff.

Your dedicated Drive folder:
https://drive.google.com/drive/folders/${clientFolder.getId()}

Your onboarding timeline:
- Day 1: Kickoff call (30 min)
- Days 2-7: We build your lead list, email sequence, and deliverability infrastructure
- Days 8-14: Soft launch and reply handling
- Day 14+: Weekly performance reports every Monday

If you have any questions before our call, just reply to this email.

Welcome aboard,
The OutboundSolved team

---
This is an automated message from your onboarding form submission.`;

    GmailApp.sendEmail(email, subject, body, {
      from: FROM_EMAIL,
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
      FROM_EMAIL,
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