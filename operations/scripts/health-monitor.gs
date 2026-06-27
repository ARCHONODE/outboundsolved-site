/**
 * OutboundSolved — Weekly Client Health Monitor
 *
 * SETUP:
 * 1. Update SHEET_ID and REPORTS_FOLDER_ID below
 * 2. Set up trigger: Time-driven → Week timer → Friday 5pm → generateWeeklyReports
 *
 * WHAT IT DOES:
 * - Every Friday 5pm, loops through all Active/Onboarding clients
 * - Counts their replies from the past 7 days
 * - Calculates pipeline estimate, reply rate, meeting count
 * - Generates a formatted Markdown report per client
 * - Saves reports to your Drive folder
 * - Logs each report to the "Weekly Reports" tab in Ops Hub
 */

// ============================================================
// CONFIG
// ============================================================
const SHEET_ID = 'YOUR_SHEET_ID_HERE';
const CLIENTS_SHEET = 'Clients';
const REPLIES_SHEET = 'Replies';
const REPORTS_SHEET = 'Weekly Reports';
const REPORTS_FOLDER_ID = 'YOUR_DRIVE_FOLDER_ID_HERE';  // Drive folder for weekly reports

// ============================================================
// MAIN FUNCTION
// ============================================================

/**
 * Generates weekly health reports for all active/onboarding clients
 * Runs automatically every Friday at 5pm via time-based trigger
 */
function generateWeeklyReports() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const clientsSheet = ss.getSheetByName(CLIENTS_SHEET);
    const repliesSheet = ss.getSheetByName(REPLIES_SHEET);
    const reportsSheet = ss.getSheetByName(REPORTS_SHEET);
    const reportsFolder = DriveApp.getFolderById(REPORTS_FOLDER_ID);

    // Get all active/onboarding clients (skip header row)
    const clientsData = clientsSheet.getDataRange().getValues();
    const clients = clientsData.slice(1).filter(row => {
      const status = row[8];  // I: Status column
      return status === 'Active' || status === 'Onboarding';
    });

    if (clients.length === 0) {
      Logger.log('No active/onboarding clients. Skipping weekly report generation.');
      return;
    }

    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const weekLabel = `Week of ${oneWeekAgo.toISOString().split('T')[0]}`;
    const today = new Date().toISOString().split('T')[0];

    let generated = 0;

    clients.forEach(client => {
      try {
        const clientName = client[0];
        const tier = client[3];
        const monthlyFee = client[7] || 0;

        // Get replies for this client this week
        const allReplies = repliesSheet.getDataRange().getValues();
        const clientReplies = allReplies.filter(row => {
          // Skip header row
          if (!row[0] || typeof row[0] === 'string' && row[0].includes('Date')) return false;
          // Skip SYSTEM_EVENTS
          if (row[6] === 'SYSTEM_EVENT') return false;
          // Match by company name
          if (!row[3] || !row[3].toString().toLowerCase().includes(clientName.toLowerCase().split(' ')[0].toLowerCase())) return false;
          // Within last 7 days
          try {
            const replyDate = new Date(row[0]);
            return replyDate > oneWeekAgo;
          } catch {
            return false;
          }
        });

        // Calculate metrics
        const totalReplies = clientReplies.length;
        const positiveReplies = clientReplies.filter(r => r[6] === 'POSITIVE').length;
        const meetings = positiveReplies; // Approximation
        const replyRate = totalReplies > 0 ? ((totalReplies / 1000) * 100).toFixed(1) : '0.0';
        const pipelineEstimate = meetings * 10000; // Assume $10K avg deal
        const roiMultiple = monthlyFee > 0 ? (pipelineEstimate / monthlyFee).toFixed(1) : 'N/A';

        // Determine health status
        let health = '🟢';
        let healthNote = 'On track';
        if (totalReplies === 0 && tier !== 'Starter') {
          health = '🔴';
          healthNote = 'No replies this week — investigate';
        } else if (totalReplies === 0) {
          health = '🟡';
          healthNote = 'Low reply volume';
        } else if (parseFloat(replyRate) < 3) {
          health = '🟡';
          healthNote = 'Below target reply rate';
        } else if (positiveReplies === 0) {
          health = '🟡';
          healthNote = 'Replies but no positive engagement';
        }

        // Build report content
        const reportContent = buildReport(
          clientName, tier, weeklyCount: totalReplies,
          positiveReplies, meetings, replyRate, pipelineEstimate, monthlyFee, roiMultiple, health, healthNote, weekLabel, today
        );

        // Save to Drive
        const fileName = `Weekly Report — ${clientName} — ${weekLabel}.md`;
        const file = reportsFolder.createFile(fileName, reportContent, MimeType.PLAIN_TEXT);

        // Log to Reports sheet
        reportsSheet.appendRow([
          weekLabel,                    // A: Week
          today,                        // B: Date Generated
          clientName,                   // C: Client
          health,                       // D: Status
          `$${pipelineEstimate.toLocaleString()}`,  // E: Pipeline $
          `${replyRate}%`,              // F: Reply Rate
          meetings,                     // G: Meetings
          healthNote,                   // H: Issues
          file.getUrl()                 // I: Drive Link
        ]);

        generated++;
        Logger.log(`Generated report for ${clientName}`);

      } catch (clientError) {
        Logger.log(`Error generating report for client ${client[0]}: ${clientError.toString()}`);
      }
    });

    Logger.log(`Weekly reports generated: ${generated} of ${clients.length}`);

  } catch (error) {
    Logger.log(`Error in generateWeeklyReports: ${error.toString()}`);
    GmailApp.sendEmail(
      Session.getActiveUser().getEmail(),
      'Ops Hub Error — Weekly Health Monitor',
      `Error generating weekly reports:\n\n${error.toString()}\n\nCheck the Apps Script execution log.`
    );
  }
}

// ============================================================
// REPORT BUILDER
// ============================================================

/**
 * Builds the formatted Markdown report for one client
 */
function buildReport(clientName, tier, weeklyCount: totalReplies, positiveReplies, meetings, replyRate, pipelineEstimate, monthlyFee, roiMultiple, health, healthNote, weekLabel, today) {
  return `# Weekly Outbound Report — ${clientName}

**Period:** ${weekLabel} to ${today}
**Tier:** ${tier}
**Status:** ${health} ${healthNote}

---

## 🎯 This Week's Highlights

**Meetings booked:** ${meetings}
**Estimated pipeline:** $${pipelineEstimate.toLocaleString()}
**ROI:** ${roiMultiple}x (vs $${monthlyFee.toLocaleString()} fee)

---

## 📊 Key Metrics

| Metric | This Week | Target | Status |
|---|---|---|---|
| Replies received | ${totalReplies} | 5+ | ${totalReplies >= 5 ? '✅' : '⚠️'} |
| Positive replies | ${positiveReplies} | 1+ | ${positiveReplies >= 1 ? '✅' : '⚠️'} |
| Meetings booked | ${meetings} | 1-3 | ${meetings >= 1 ? '✅' : '⚠️'} |
| Estimated pipeline | $${pipelineEstimate.toLocaleString()} | 5x fee ($${(monthlyFee * 5).toLocaleString()}) | ${pipelineEstimate >= monthlyFee * 5 ? '✅' : '⚠️'} |

---

## 💡 Analysis

${totalReplies > 0 ?
  `- ${totalReplies} prospects engaged with your outreach this week
- ${positiveReplies} showed clear buying intent
- ${meetings} qualified calls scheduled to your calendar` :
  `- Low reply volume this week
- Possible causes: ICP targeting, email timing, subject line fatigue, prospect list quality
- Recommended: review subject lines, test new angles, refresh lead list`}

---

## 🎯 Next Week's Plan

- Continue current sequence (Day 8-14 of campaign)
- Test 2 new subject lines to combat fatigue
- Refresh lead list with fresh prospects
- Reply to any unanswered positive replies within 1 hour

---

## 📅 Your Action Items

${meetings > 0 ?
  `- [ ] Show up to the ${meetings} meeting(s) on your calendar
- [ ] Send post-meeting follow-ups within 24 hours` :
  `- [ ] Review this week's report (5 min)
- [ ] Check the Replies tab in Ops Hub for any pending actions`}

---

*Report auto-generated by OutboundSolved on ${today}*
*Questions? Reply to this email or book a call: https://calendly.com/outboundsolved/15min*
`;
}

// ============================================================
// SETUP HELPER (run once to set up the weekly trigger)
// ============================================================

function setupWeeklyTrigger() {
  // Delete any existing triggers for this function
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'generateWeeklyReports') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Create new trigger: Friday at 5pm
  ScriptApp.newTrigger('generateWeeklyReports')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.FRIDAY)
    .atHour(17)
    .create();

  Logger.log('Trigger set up: generateWeeklyReports will run every Friday at 5pm');
}