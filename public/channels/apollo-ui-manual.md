# Apollo UI Manual Lead Pull Guide
*15-20 minutes per week, 50 leads per session, $0 cost, no API needed*

---

## Why This Works (When API Doesn't)

The Apollo API requires a paid plan for the search + enrichment endpoints. But the **web UI at app.apollo.io is free forever** for the same operations — just with manual work.

The trade:
- API: 1 command = 500 leads in 30 seconds
- UI: 15-20 min clicking = 50 leads saved as CSV

For our use case (50 leads per week), the UI is fine.

---

## The Exact Workflow (15-20 min for 50 leads)

### Step 1: Open Apollo and start a new search (2 min)

1. Go to https://app.apollo.io
2. Log in (free account)
3. Click **"Search"** in the top nav
4. Click **"People"** (not "Companies" or "Accounts")

### Step 2: Set your filters (5 min)

In the left sidebar, set:

**Job Titles** (click "Add title" and add each one):
- Founder
- CEO
- Co-Founder
- Head of Growth
- VP Marketing
- Head of Sales
- (Skip "intern", "junior", "assistant")

**Location:** United States, Canada, United Kingdom

**Company size:** 5-50 employees (or whatever your sweet spot is)

**Industry:** Software, SaaS, Marketing, Internet

**Seniority:** Founder, Owner, CXO, VP, Director (skip "entry", "individual contributor")

**Keywords (optional):** "B2B SaaS" or "outbound" or your specific ICP trigger

### Step 3: Review and filter (3 min)

1. Apollo returns 500-5,000 results
2. **Quick scan:** skip anyone whose title is irrelevant (account exec, recruiter, etc.)
3. **Look for red flags:** "looking for new opportunities," recently laid off, etc.
4. Aim for **50 highly-qualified leads** in your visible result set

### Step 4: Select all and export (5 min)

1. Click the **checkbox at the top of the table** to select all visible results
2. Click **"Export"** (top right of the table)
3. Choose **CSV** format
4. **Include these fields:** First Name, Last Name, Title, Company, Company Size, Industry, Email, LinkedIn URL
5. **Limit to 50** records (don't grab 500 — you'll waste Hunter credits)
6. Click **Export**
7. Apollo emails you a download link OR shows a download button
8. Save the CSV to: `C:\Users\drago\cold-email-agency\data\leads-manual-YYYY-MM-DD.csv`

### Step 5: Format the CSV for our scripts (2 min)

Open the downloaded CSV in Notepad or Excel.

**Required columns** (rename if needed):
- `first_name`
- `last_name`
- `company`
- `domain` (the company's website domain, e.g., `notion.so` — NOT the @ symbol)
- `title` (optional)
- `industry` (optional)
- `linkedin_url` (optional)

**To get the domain from a company name:**
- Open the Apollo profile, the website is usually shown
- Or Google "{{company name}} official site"
- Or just use the email's domain (e.g., from `sarah@notion.so` → `notion.so`)

### Step 6: Run the enrichment pipeline (5 min)

In Git Bash:

```bash
cd "C:/Users/drago/cold-email-agency"
bash -c "source ~/.bashrc && python scripts/enrich_leads_free.py --input data/leads-manual-YYYY-MM-DD.csv --output data/leads-enriched-YYYY-MM-DD.csv"
```

This will:
- Verify each email (Hunter.io, ~1 credit per email)
- Find missing emails via Domain Search (Hunter.io, ~1 credit per find)
- Generate Gemini icebreakers
- Skip any unverifiable emails

**Output:** `data/leads-enriched-YYYY-MM-DD.csv` with `email`, `email_status`, `icebreaker` columns added.

### Step 7: Build the campaign (5 min)

```bash
python scripts/build_campaign.py \
  --leads data/leads-enriched-YYYY-MM-DD.csv \
  --template templates/b2b-saas.md \
  --output data/campaign-YYYY-MM-DD.csv \
  --sender-context "We book 5-15 meetings/mo for B2B SaaS via cold email. Free playbook at outboundsolved.com"
```

This generates 4 emails × 50 leads = 200 personalized emails ready to send.

### Step 8: Send via Gmail (no Instantly needed)

**Low volume (under 20/day):** Use Gmail directly. See `channels/gmail-sending.md` for the exact workflow.

---

## Weekly Schedule (15-20 min, 1x per week)

| Day | Time | Action |
|---|---|---|
| Monday | 9:00 AM | Pull 50 leads from Apollo UI (15 min) |
| Monday | 9:15 AM | Run enrichment pipeline (5 min) |
| Monday | 9:20 AM | Build campaign (5 min) |
| Monday-Wednesday | Throughout day | Send 15-20 emails/day from Gmail |
| Friday | 5:00 PM | Reply to any responses, classify them |

**Total weekly time: 1-2 hours + daily sending**

---

## What the CSV Looks Like (formatted correctly)

```csv
first_name,last_name,company,domain,title,industry,linkedin_url
Sarah,Chen,Notion,notion.so,Co-Founder,SaaS,https://linkedin.com/in/sarahchen
Ivan,Zhao,Linear,linear.app,Co-Founder,SaaS,https://linkedin.com/in/ivanzhao
Guillermo,Rauch,Vercel,vercel.com,CEO,Developer Tools,https://linkedin.com/in/rauchg
```

**Headers are case-sensitive.** Use exactly: `first_name`, `last_name`, `company`, `domain`, etc.

**Common mistakes:**
- `First Name` (with space) instead of `first_name` (with underscore) → script won't read it
- `notion.com` (with TLD) instead of `notion.so` (the actual domain) → wrong emails found
- `sarah@notion.so` (with @) instead of `notion.so` (just the domain) → script will fail

---

## Tips for Faster Manual Pulls (after you do it a few times)

### Saved searches
Apollo lets you save searches. Set up your ICP once, then just click "Run" each Monday. Saves 5 min per week.

### Use "Saved Lists"
After exporting, save the list as "OutboundSolved Q3 2026" in Apollo. Next week, just duplicate the list and refresh (Apollo will update emails that changed).

### Filter for "Recently Active"
Add filter: "Last activity date" = last 30 days. These leads are more likely to be in their role and responsive. Cuts 20% of stale leads.

### Export smaller batches
50 leads is the sweet spot. Bigger batches (100+) hit Hunter's 100/mo limit faster.

---

## When to Switch from Manual to API

Once you have **3+ paying clients** ($1,500+/mo MRR), upgrade to Apollo's $49/mo plan. The API pays for itself with the time saved.

**Time saved per week:** 15-20 min × 4 weeks = 60-80 min/month
**Value of your time:** At $1,500/mo MRR, your time is worth ~$30/hr
**Apollo cost:** $49/mo
**ROI:** Saves 1+ hour, costs less than 2 hours of your time

But until then, **the manual UI is free and works.**

---

## Troubleshooting

### "Apollo UI won't let me export"
- Free tier has export limits. Some searches can be 50-100 records max
- Try filtering more aggressively (smaller company size range, fewer titles)
- If you hit a hard limit, just save the leads to an Apollo "List" and reference them later

### "All my emails are 'unverified' in Hunter"
- The email exists but isn't accepting mail
- Common for: founders@, no-reply@, personal Gmail, very small startups
- Filter out these leads — don't waste your 100/mo Hunter credits

### "Hunter Domain Search returns nothing"
- The company's website doesn't list employee emails publicly
- Common for: companies without a "team" page, stealth startups, very small companies
- Try finding the email via LinkedIn manually instead

### "My CSV has 50 leads but only 30 get enriched"
- 20 leads probably had personal Gmail, bounced, or had Hunter-untouchable emails
- That's NORMAL. Industry average verification rate is 60-70%
- The 30 enriched leads are still very valuable

---

## Scaling This Beyond 50 Leads/Week

### If you need 100+ leads/week:
1. Upgrade Apollo to Basic plan ($49/mo) for unlimited exports
2. OR use multiple free Apollo accounts (against TOS, not recommended)
3. OR supplement with LinkedIn Sales Navigator manual exports

### If you need 200+ leads/week:
1. Apollo Professional plan ($99/mo) is the cheapest option
2. Or use a VA (virtual assistant) on Upwork for $5/hr to do the manual pulling

### For our current scale (50/week):
The manual UI is perfect. Don't optimize past the point of need.

---

## The Honest Math

**Cost per lead using manual Apollo + Hunter:**

| Item | Cost |
|---|---|
| Apollo UI | $0 (free tier) |
| Hunter verification (1 per email) | $0 (free tier) |
| Hunter Domain Search (1 per missing email) | $0 (free tier) |
| Gemini icebreaker (1 per lead) | $0 (free tier) |
| Gmail sending | $0 |
| **Total per lead** | **$0** |
| **Per 50-lead batch** | **$0** |
| **Time per 50 leads** | 15-20 min |

**Per 1,000 leads over 20 weeks:** $0

When you can afford it, Apollo's $49/mo plan brings this down to 5 min per 50 leads. But that's a 2026 decision, not a 2026-day-1 decision.

---

## Quick Start (Next Monday)

1. Open https://app.apollo.io
2. Search: People + Founder/CEO + 5-50 employees + US/Canada/UK + Software
3. Export 50 leads to CSV
4. Save to `C:\Users\drago\cold-email-agency\data\leads-manual-2026-06-30.csv`
5. Run `python scripts/enrich_leads_free.py --input data/leads-manual-2026-06-30.csv --output data/leads-enriched-2026-06-30.csv`
6. Build the campaign
7. Start sending

That's it. 20 minutes. Zero cost. Real leads in your pipeline.

---

## Why I Wrote This Guide

When the Apollo API was locked behind a paid plan, I almost gave up on the whole pipeline. Then I realized the web UI does the same thing in 15 min vs 30 sec. For our scale (50 leads/week), 15 min is fine.

This is the pattern: **don't pay for automation until the manual version is too slow.** Most side hustles never get past the manual version because the ROI isn't there yet. We're at 50 leads/week for $0 — the math works.

When you have 5+ clients and need 200+ leads/week, then pay for Apollo. Until then, this guide is all you need.