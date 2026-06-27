# Email Capture Setup — Step by Step (10 minutes total)

**Goal:** When someone submits their email on outboundsolved.com, it gets added to a Google Sheet you control. No third-party service, free forever, you own the data.

---

## STEP 1: Create the Google Sheet (1 min)

1. Open https://sheets.google.com/create
2. Name it **"OutboundSolved Leads"** (or anything you want — just remember the name)
3. Leave Sheet1 empty — the Apps Script will create headers on the first submission

---

## STEP 2: Open Apps Script editor (30 sec)

1. In your Google Sheet, click **Extensions** (top menu bar) → **Apps Script**
2. This opens a new tab with a code editor
3. **Delete** any code that's already in the editor (usually a `function myFunction() {}` placeholder)

---

## STEP 3: Paste the Apps Script code (1 min)

1. Open the file `apps-script-email-capture.gs` from this folder (you can read it in any text editor)
2. Select ALL the code in that file (Ctrl+A) and copy (Ctrl+C)
3. Paste it into the Apps Script editor (Ctrl+V)
4. Click the **💾 Save** icon (top-left) or Ctrl+S
5. When prompted, name the project **"Email Capture"** and click OK

---

## STEP 4: Deploy as a Web App (2 min)

1. Click **Deploy** (top-right) → **New deployment**
2. Click the **⚙️ gear icon** next to "Select type" → choose **Web app**
3. Fill in the deployment settings:
   - **Description:** `Email capture v1` (or anything)
   - **Execute as:** `Me` (your Google account)
   - **Who has access:** `Anyone` (this lets your landing page POST to it without OAuth)
4. Click **Deploy**

---

## STEP 5: Authorize the script (1 min)

Google will show a scary "Authorization required" screen. This is normal.

1. Click **Authorize access**
2. Choose your Google account
3. You'll see "Google hasn't verified this app" — click **Advanced** (bottom-left)
4. Click **Go to Email Capture (unsafe)**
5. Click **Allow**

---

## STEP 6: Copy your Web App URL (10 sec)

After authorization, you'll see a **Web app URL** that looks like:

```
https://script.google.com/macros/s/AKfycbxYz1234abcdef.../exec
```

**Copy this entire URL** — you'll paste it into the HTML next.

---

## STEP 7: Update the HTML with your URL (2 min)

1. Open `C:\Users\drago\outboundsolved-site\index.html` in any text editor (Notepad works, VS Code is better)
2. Find this line (search for `REPLACE_WITH_YOUR_DEPLOYMENT_ID`):
   ```html
   <form class="capture-form" id="capture-form-primary" action="https://script.google.com/macros/s/REPLACE_WITH_YOUR_DEPLOYMENT_ID/exec" method="POST">
   ```
   It appears **twice** (primary form + footer form).
3. Replace `https://script.google.com/macros/s/REPLACE_WITH_YOUR_DEPLOYMENT_ID/exec` with YOUR actual URL
4. Save the file

---

## STEP 8: Redeploy to Vercel (2 min)

The HTML file changed, so Vercel needs to re-deploy. Easiest path:

1. Open https://vercel.com/dashboard
2. Click your `outboundsolved-site` project
3. **Drag and drop** the updated `index.html` onto the deployment area (or use the CLI: `vercel --prod` if you have it installed)
4. Wait 30 seconds for the rebuild
5. Visit `https://outboundsolved.com` and submit a test email

---

## STEP 9: Test it works (1 min)

1. Open `https://outboundsolved.com` in your browser
2. Type your own email into the capture form (the one right after the social proof quote)
3. Click "Get the playbook"
4. You should see: "✓ Check your inbox — playbook is on the way."
5. Open your Google Sheet — within 5 seconds you should see a new row with:
   - Timestamp (today's date/time)
   - Your email address
   - Source ("landing-page")
   - User Agent (your browser)
   - Referrer (usually empty if direct)

**If it works:** you're done! Every visitor who submits an email now flows into your Sheet.

**If it doesn't work:** see the troubleshooting section below.

---

## HOW THE DATA FLOWS

```
Visitor types email on outboundsolved.com
   ↓
JavaScript POSTs to https://script.google.com/macros/s/AKfy.../exec
   ↓
Apps Script receives the POST, validates email, appends row to Sheet
   ↓
New row appears in your Google Sheet (OutboundSolved Leads)
   ↓
You check the Sheet daily (or get notification email if you enable that)
```

Total round-trip time: 1-5 seconds.

---

## EXPORTING EMAILS FOR OUTREACH

When you want to email your leads (e.g., to announce a new service or send the actual playbook), you have two options:

### Option A: Manual CSV export from Google Sheets
1. Open your Sheet
2. Click the email column header
3. File → Download → CSV
4. Open in Excel/Google Sheets, copy emails to your email tool

### Option B: Use the included Python script
I built a script `export_leads.py` that pulls the latest emails from your Sheet on demand.

```bash
# First time: copy apps-script-email-capture.gs.gs to scripts/ in your cold-email-agency folder
cp /c/Users/drago/outboundsolved-site/export_leads.py /c/Users/drago/cold-email-agency/scripts/

# Then run it
cd /c/Users/drago/cold-email-agency
python scripts/export_leads.py --output data/leads-from-landing-page.csv
```

It requires a Google Sheets API key (free, 5 min setup — instructions in the script's docstring).

---

## OPTIONAL: Get email notifications on every signup

Uncomment these 4 lines in the Apps Script (search for `GmailApp.sendEmail`):

```javascript
GmailApp.sendEmail(
  'team@outboundsolved.com',
  'New OutboundSolved lead: ' + email,
  'Email: ' + email + '\nTime: ' + new Date().toString() + '\nSource: ' + (e.parameter.source || 'landing-page')
);
```

Then **re-deploy** (Deploy → Manage deployments → pencil icon → Version: New version → Deploy). Every signup will email `team@outboundsolved.com` (which already forwards to your Gmail via Cloudflare).

---

## TROUBLESHOOTING

### "Authorization required" error when submitting
- Re-deploy: Deploy → Manage deployments → pencil icon → New version → Deploy
- Make sure "Who has access" is set to "Anyone"

### Form submits but no row appears in Sheet
- Open Apps Script → Executions (left sidebar) → look for errors
- Most common: the Sheet wasn't created in step 1, OR you're looking at the wrong Sheet
- Fix: in Apps Script, change `getActiveSheet()` to `getSheetByName('Sheet1')` (or your sheet's name)

### Form returns "Something went wrong" in browser
- Open browser DevTools (F12) → Console tab → look for errors
- Most common: the Web App URL is wrong OR has a typo
- Verify by visiting the URL in your browser — you should see `{"status":"ok","message":"OutboundSolved email capture endpoint is live..."}`

### CORS error in console
- The form uses `mode: 'no-cors'` which avoids CORS issues by design
- If you still see CORS errors, check that you're using the EXACT URL from step 6 (no trailing whitespace, no `/` at the end)

### Submissions duplicate
- Check if you have multiple Apps Script deployments pointing to the same Sheet
- Fix: delete old deployments in Deploy → Manage deployments

---

## WHAT YOU'VE BUILT

- ✅ Email capture on the live site (no third-party service)
- ✅ Free forever (Google Apps Script free tier is 20K requests/day)
- ✅ Privacy-friendly (no tracking pixels, no third-party cookies)
- ✅ You own the data (in your Google Sheet)
- ✅ Notification emails (optional)
- ✅ CSV export for outreach (script included)

**Total cost: $0. Total time to set up: ~10 minutes.**

This is the same setup used by indie hackers and one-person SaaS companies that don't want to pay for ConvertKit/Mailchimp until they're profitable.