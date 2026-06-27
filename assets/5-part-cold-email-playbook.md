# THE COLD EMAIL PLAYBOOK
## 5 Emails That Teach You The System

**From OutboundSolved** — A done-for-you cold email agency for B2B SaaS.

---

# EMAIL 1 OF 5: The List-Building System
### *How to find 1,000 ICP-matched leads in 2 hours*

---

## The mistake everyone makes

Most cold email fails before a single email is sent. Not because of the copy. Not because of the deliverability. Because **the list is garbage**.

The pattern I see every week: founder pulls 5,000 "leads" from a sketchy scraper, blasts them all with a "personalized" template that says "Hey {{first_name}}, I noticed you work at {{company}}" — and gets 0.5% reply rate. They conclude cold email doesn't work. The real conclusion: their list was bad.

**Good list = good campaign. Bad list = wasted effort, no matter how good the email.**

---

## What makes a list "good"

A list is good when every person on it has **three things true**:
1. **They match your ICP** — same role, same industry, same company size
2. **They have a real problem you solve** — not "everyone could use this" but "people in this exact role lose sleep over this exact thing"
3. **They're reachable** — they have a verified work email (not personal Gmail), and they're active in their role (not on maternity leave or between jobs)

If any of those three is missing, **delete that lead from your list**. Even if you have 200 instead of 1,000. Quality over quantity, every time.

---

## The 4 sources that work (and 5 that don't)

### Works:
- **Apollo.io** (free tier: 10K credits/mo) — best for SaaS/agency targeting. Filter by title + company size + industry. Verify emails. Export as CSV.
- **LinkedIn Sales Navigator** ($99/mo) — best for senior targeting. Use saved searches. Export leads manually (don't scrape — LinkedIn bans you).
- **Your own network** — every founder has 100-200 people in their network who know 100-200 more. Ask for intros. Highest-converting leads you'll ever get.
- **Industry events attendee lists** — conference websites publish attendee lists. Pull them manually. They self-identified as your ICP by attending.

### Doesn't work (ignore these):
- ❌ **Scraped emails from random websites** — half are dead, half are personal emails, no filtering
- ❌ **"Cold email lists" for sale** — usually repackaged scrapes with inflated counts
- ❌ **Twitter follower lists of competitors** — most aren't your ICP, most don't check DMs
- ❌ **Google Maps scrapes for local businesses** — works for some local businesses, doesn't work for SaaS
- ❌ **Purchased "intent data" lists** — overpriced, outdated, often fake

---

## The exact workflow (2 hours)

**Hour 1: Build the foundation**
1. Open Apollo.io
2. Set filters:
   - Job titles: ["Founder", "CEO", "Head of Growth", "VP Marketing"] (or whatever matches your buyer)
   - Company headcount: 5-50 (or your sweet spot)
   - Industries: ["Software", "Marketing", "SaaS"] (or your verticals)
   - Location: ["United States", "Canada", "United Kingdom"] (English-speaking to start)
3. Pull 500-1,000 leads
4. Verify emails (Apollo does this automatically, ~70% will be valid)
5. Export as CSV

**Hour 2: Refine and enrich**
1. Open the CSV
2. Remove anyone whose title includes "intern", "junior", "assistant" (not your ICP)
3. Remove anyone whose company has <2 employees or >200 (outside your sweet spot)
4. Add a "personalization_note" column (use our `enrich_leads.py` script — it generates icebreaker data via Gemini)
5. Sort by company size descending (larger companies first — usually better fit)
6. Take the top 100-500 for your first campaign

**Total time: 2 hours. Total cost: $0 (free tier). Result: 500 leads you'll actually contact.**

---

## The personalization cheat code

Most cold emails fail because they say the same thing to 1,000 different people. **Personalization is the difference between 0.5% reply rate and 5%+ reply rate.**

But personalization doesn't mean "I noticed you work at {{company}}" — that's not personalization, that's mail-merge.

Real personalization sounds like this:

> "Hey Sarah, saw Acme SaaS just launched the new analytics dashboard — congrats. We've helped 3 other analytics SaaS companies get from launch to first 10 customers via cold outbound to product managers at mid-market companies. Curious if that's even on your radar?"

Three things in that email:
1. **Specific observation** about their company (recent launch)
2. **Specific proof point** for their ICP (3 similar companies, specific outcome)
3. **Specific question** that's relevant to their current focus (launch → first customers)

Generating this for 500 leads takes 30 seconds each with a good AI workflow. That's 4 hours of work. Worth it.

Our `enrich_leads.py` script + `build_campaign.py` does this automatically. Free.

---

## Quick checklist before you move to Email 2

- [ ] List has 100+ leads (more is fine, don't go below 100)
- [ ] Every lead has a verified work email (no personal Gmail/Yahoo)
- [ ] Every lead matches your ICP (role + company size + industry)
- [ ] Every lead has a personalization note generated
- [ ] CSV is saved as `data/leads-enriched.csv`
- [ ] Total spend: $0

**You're ready for Email 2: writing the sequence.**

---

*This is Email 1 of 5. The next email covers the 4-email sequence template — subject lines, opening lines, CTAs that get replies.*

*You signed up at outboundsolved.com. If you want us to do this for you (deliver a 500-lead ICP list in 48 hours), [book a 15-min fit call](https://calendly.com/outboundsolved/15min). First 5 clients get 50% off month 1.*

---

# EMAIL 2 OF 5: The 4-Email Sequence Template
### *The exact emails that get 5%+ reply rates*

---

## Why a 4-email sequence (not 1, not 12)

Most people either:
- **Send 1 email and give up** — you get 30% of the response you'd otherwise get
- **Send 8+ emails** — you get flagged as spam and your domain reputation tanks

**The sweet spot: 4 emails over 14 days.**

Each email has a different psychological job:
- **Email 1:** Get them to *notice* you (pattern interrupt + relevance)
- **Email 2:** Get them to *consider* you (value drop + proof point)
- **Email 3:** Get them to *take you seriously* (case study + specific numbers)
- **Email 4:** Get them to *reply or unsubscribe* (low-pressure breakup)

After Email 4, **stop**. Anyone who didn't reply to 4 emails in 14 days isn't going to. Move on.

---

## Email 1 — The Pattern Interrupt

**Send:** Day 1

**Subject line options** (test 2-3 per campaign):
- `quick question, {{first_name}}`
- `{{specific_observation_about_their_company}}`
- `your {{thing_they_obviously_care_about}}`
- `noticed {{something_specific}}`

**The 5 elements:**
1. **Specific observation** about them or their company (NOT "I noticed you work at X")
2. **Insider reference** — quote a podcast they were on, a post they wrote, a feature they shipped
3. **One-line value statement** — what you do, for whom, what result
4. **Specific proof point** — a number from your work, not "many clients"
5. **Soft CTA** — "worth a 15-min fit call?" not "BUY NOW"

**Template (80-100 words):**

```
Hey {{first_name}},

Noticed {{specific_company_observation}}.

{{insider_reference_about_them}}.

We {{what_you_do}} for {{specific_ICP}}, generating {{specific_result_number}} per month.

{{proof_point_with_specific_number}}.

Worth a 15-min fit call to see if it'd work for {{their_company}}?

{{sender_name}}
```

**Real example:**
```
Hey Sarah,

Noticed Acme SaaS just launched the new analytics dashboard — congrats.

Saw your LinkedIn post about the launch hitting PMF signals in week 1 — felt real, not the usual "we crushed it" flex.

We book 5-15 qualified demos/month for B2B SaaS at the post-launch stage, via cold email to product managers at companies matching your ICP.

Our last client in a similar spot went from 2 demos/mo to 14 demos/mo in 60 days.

Worth a 15-min fit call?

Alex
```

---

## Email 2 — The Value Drop

**Send:** Day 3

**Subject line options:**
- `re: {{original_subject}}` (best — keeps the thread)
- `{{first_name}} - quick follow-up`
- `the {{number}} things that make cold email work`

**The job:** Give them something useful. Even if they don't reply, they'll remember you as helpful, not salesy.

**Template:**

```
Hey {{first_name}},

Quick follow-up.

Wanted to share the {{3-5}} things that make our cold email system work:

1. {{specific_tactic_1}}
2. {{specific_tactic_2}}
3. {{specific_tactic_3}}

Most agencies skip {{number_1_and_2}}. We don't.

If even half those numbers would help {{company}}, worth 15 min: {{calendar_link}}

{{sender_name}}
```

**Real example:**
```
Hey Sarah,

Quick follow-up.

The 4 things that make cold email actually work for post-launch SaaS:

1. Hyper-targeted list (we cap at 500 leads per campaign, not 5,000 garbage ones)
2. 4-email sequence with line-1 personalization per lead (no templates)
3. 3-5 warmed sending domains per client (your main domain never gets burned)
4. AI handles replies within 1 hour, humans handle objections

Most agencies skip #1 and #2. That's why their clients see 0.5% reply rates.

If those numbers would help Acme SaaS grow post-launch, worth 15 min: [calendar]

Alex
```

---

## Email 3 — The Case Study

**Send:** Day 7

**Subject line options:**
- `case study: {{similar_vertical}} booked {{number}} meetings in week 1`
- `numbers from {{case_study_company_vertical}}`

**The job:** Prove you can do what you say. Use numbers, be specific.

**Template:**

```
Hey {{first_name}},

Wanted to share a case study since you didn't reply to the last email.

{{similar_company_or_situation}}:
- Before: {{specific_before_state}}
- After {{timeframe}}: {{specific_after_state}}
- What we did: {{3_specific_things}}

If you want the same outcome for {{their_company}}, here's my calendar: {{calendar_link}}

{{sender_name}}
```

**Real example:**
```
Hey Sarah,

Wanted to share a case study since you didn't reply.

A B2B SaaS in the analytics space (similar size to Acme SaaS):
- Before: 1-2 inbound demos/mo, 0 outbound
- After 60 days: 11 demos booked, 4 closed deals, $47K new ARR
- What we did: 500-lead ICP list + 4-email sequence + 5 warmed domains + AI reply handling

Worth 15 min to see if it'd work for Acme SaaS?

Alex
```

---

## Email 4 — The Breakup

**Send:** Day 12

**Subject line options:**
- `closing the loop, {{first_name}}`
- `last email from me`

**The job:** Final touch with zero pressure. Paradoxically, this gets the most replies of any email.

**Template:**

```
Hey {{first_name}},

Last email from me on this. If cold email isn't a priority for {{company}}, no worries.

But if you ever want to see how we'd write a campaign for your ICP, the door's open: {{calendar_link}}

Either way — keep building.

{{sender_name}}
```

**Why breakup emails work:** People feel guilty ignoring you. The breakup email removes the pressure, and they often reply with "actually, send me info" or "let's chat next quarter." Capture these as warm leads for follow-up.

---

## The 10 subject lines that consistently get 40%+ open rates

Use these as templates. Replace the placeholder:

1. `quick question, {{first_name}}`
2. `your {{specific_thing}}` (e.g., "your Q4 outbound plan")
3. `{{specific_observation}}` (e.g., "saw you just launched X")
4. `{{specific_number}} {{specific_thing}}` (e.g., "47 leads in 30 days")
5. `noticed {{recent_activity}}`
6. `re: {{previous_thread_subject}}` (always works for follow-ups)
7. `{{first_name}} - {{one_word}}` (e.g., "Sarah - intro")
8. `the {{n}} things {{industry}} gets wrong about {{topic}}`
9. `{{competitor_name}} {{action}}` (controversial but works)
10. `closing the loop, {{first_name}}` (breakup — 50%+ open rate)

**Avoid:** "Hello", "Quick question" alone (too generic), "Special offer", ALL CAPS, emojis in subject line, anything over 60 characters.

---

## Quick checklist before you move to Email 3

- [ ] 4 emails drafted in your tool (Instantly, Smartlead, Lemlist, or Gmail)
- [ ] Each email has personalization variables (`{{first_name}}`, `{{company}}`)
- [ ] Email 1 has a specific pattern interrupt (not generic)
- [ ] Email 3 has a specific case study with real numbers
- [ ] Email 4 is short (under 60 words)
- [ ] Sequence is set to send Day 1, 3, 7, 12
- [ ] Stop condition set: stop sequence after Email 4 if no reply

**You're ready for Email 3: deliverability setup.**

---

*This is Email 2 of 5. The next email covers SPF/DKIM/DMARC + domain warmup — the technical stuff that determines whether your emails land in inbox or spam.*

*Want us to do this for you? [Book a 15-min fit call](https://calendly.com/outboundsolved/15min). First 5 clients get 50% off month 1.*

---

# EMAIL 3 OF 5: Deliverability Setup
### *SPF/DKIM/DMARC + the 14-day warmup calendar*

---

## Why this email matters more than the previous two

You could have the world's best list and the world's best copy. If your emails land in spam, **none of it matters**. 0% reply rate on 0% delivered emails.

Deliverability is the unsexy technical foundation that makes everything else possible. Get it wrong and you spend 2 weeks crafting campaigns that nobody sees.

**This email will take you ~3 hours to implement.** It's the highest-leverage 3 hours in cold email.

---

## The 4 things that determine deliverability

When you send an email, Gmail/Outlook decides whether to deliver it to:
- **Primary inbox** (recipient sees it)
- **Promotions tab** (recipient might see it)
- **Spam folder** (recipient never sees it)
- **Blocked entirely** (recipient's server rejects it)

The decision is based on:
1. **Sender reputation** — your domain's history. New domains start neutral. Bad behavior tanks you.
2. **Authentication** — SPF, DKIM, DMARC records prove you're not spoofing. Without them, you're suspect.
3. **Content signals** — spam-trigger words, all caps, image-only emails, links to sketchy sites.
4. **Recipient engagement** — if recipients open + reply, future emails land in inbox. If they delete without opening, you get filtered.

**We'll cover all 4.**

---

## Step 1: Buy 3-5 sending domains (30 min, ~$30-50)

**Why multiple:** If one domain gets burned (spam complaints, low engagement), your other domains are unaffected. **Don't put all your eggs in one basket.**

**What to buy:**
- 3-5 cheap `.com` domains (Namecheap, $10 each)
- Names that sound neutral — not your main brand. Examples:
  - `pitchdesk.co`, `reachflow.io`, `replyloop.co`, `mailforge.com`, `connecthq.co`
- Avoid: domains with hyphens, numbers, or that sound like spam ("best-deals-247.com")

**Don't use `outboundsolved.com` for sending.** That's your main domain. Use the 3-5 throwaway domains.

---

## Step 2: Set up email inboxes on each domain (30 min/domain)

**Recommended:** Google Workspace (Microsoft 365 also works, Google is slightly more cold-email-friendly in 2026).

For each domain:
1. Sign up for Google Workspace ($7/mo per inbox, or use free Gmail if you don't want to pay)
2. Create 1 inbox per domain (e.g., `alex@reachflow.co`, `alex@pitchdesk.co`)
3. Send a few test emails from each to confirm it works
4. Don't connect to your main inbox yet — keep these separate

**Cost if you do Google Workspace:** 3-5 inboxes × $7 = $21-35/mo. Worth it for the deliverability.

**Cost if you do free Gmail:** 3-5 free Gmail accounts, each forwarding to your main inbox. Free. Slightly less professional but works.

---

## Step 3: Configure SPF, DKIM, DMARC (45 min, one-time per domain)

This is the technical part. You need to add 3 DNS records to each domain. Your DNS provider is wherever you bought the domain (Namecheap, Cloudflare, etc.).

### SPF record

**Type:** TXT
**Name:** `@` (or your domain root)
**Value:** `v=spf1 include:_spf.google.com ~all` (if using Google Workspace)

**What it does:** Tells receiving servers "Google is allowed to send email from this domain."

### DKIM record

**Type:** TXT
**Name:** `google._domainkey` (or similar — Google gives you the exact value)
**Value:** `[long string Google provides in Workspace admin]` 

**What it does:** Cryptographically signs every email you send. Proves it's really from you, not spoofed.

### DMARC record

**Type:** TXT
**Name:** `_dmarc`
**Value:** `v=DMARC1; p=none; rua=mailto:dmarc-reports@yourdomain.com`

**What it does:** Tells receiving servers what to do with emails that fail SPF or DKIM checks. Start with `p=none` (just monitor). After 2 weeks, move to `p=quarantine` (send failures to spam). After 4 weeks, `p=reject` (block failures entirely).

**Verify all 3 records work:** Use https://mxtoolbox.com/spf.aspx and https://mxtoolbox.com/dkim.aspx to check. Should return valid records within 24 hours of adding.

---

## Step 4: The 14-day warmup calendar

**This is the most important step.** New domains have zero reputation. Sending 100 cold emails from a new domain on day 1 = 100% spam folder. Sending 20 emails/day of real engagement for 14 days = inbox placement.

**What is warmup?**
Automated tool that sends emails between real inboxes, marks them as important/not-spam, and gradually builds reputation.

**Tools (in order of recommendation):**
- **Instantly.ai** (free tier, includes warmup) — best for new senders
- **Lemlist** ($59/mo, includes warmup) — best if you also want their campaign tool
- **Mailreach** ($39/mo) — warmup-only, no campaign tool

**The 14-day warmup calendar:**

| Day | Warmup sends/day | Notes |
|---|---|---|
| 1-3 | 5 | Just warmup. Don't send any real cold emails yet. |
| 4-7 | 10 | Add 1-2 real cold emails per day to test deliverability |
| 8-10 | 20 | Ramp real sends to 5-10/day |
| 11-13 | 30 | Ramp real sends to 15-20/day |
| 14 | 50 | **Full campaign launch.** Start your real sequence. |

**During warmup, also:**
- Check Gmail "Sent" folder daily — make sure emails aren't going to spam from your own domain
- Use https://www.mail-tester.com/ (free) to score your inbox's spam rating — should be 9/10 or 10/10
- Send 2-3 emails per day to **real humans you know** (friends, colleagues) and ask them to reply. Real replies boost reputation fastest.

---

## Step 5: The content signals that trigger spam filters

Even with perfect setup, bad content = spam folder. Avoid:

- ❌ ALL CAPS in subject or body
- ❌ Multiple exclamation marks (!!!)
- ❌ Words: "free", "guaranteed", "act now", "limited time", "$$$"
- ❌ URLs to unverified domains
- ❌ Images in the first email (text-only is safer)
- ❌ Attachments (PDFs, Word docs) — almost always spam
- ❌ More than 1 link per email
- ❌ Overly long subject lines (over 60 chars)

**What works (looks human, lands in inbox):**
- ✓ Mixed case in subject line ("Quick question, Sarah" not "QUICK QUESTION SARAH")
- ✓ Plain text formatting (no HTML, no images)
- ✓ One link max per email (your calendar link is fine)
- ✓ Conversational tone ("Hey" not "Dear Sir/Madam")
- ✓ Specific details (not generic claims)
- ✓ Under 150 words per email

---

## The deliverability checklist (per campaign)

- [ ] 3-5 sending domains configured
- [ ] Each domain has SPF + DKIM + DMARC
- [ ] Each domain has a warmed-up inbox (14+ days)
- [ ] Mail-tester score 9/10 or higher
- [ ] No spam-trigger words in subject or body
- [ ] First email is plain text, under 150 words
- [ ] Each email has max 1 link (calendar)
- [ ] All links point to legitimate domains (calendly.com, your-domain.com)
- [ ] Test email sent to mail-tester.com scores 9+

---

## The troubleshooting matrix

| Symptom | Likely cause | Fix |
|---|---|---|
| All emails going to spam | New domain, no warmup | Run 14-day warmup. Don't send real cold emails yet. |
| Open rate < 30% | Subject line weak OR emails landing in Promotions | Test new subject lines. Ask recipients to "move to Primary." |
| Open rate > 50% but reply rate < 1% | List quality OR copy | Verify ICP match. Rewrite opening line. |
| Bounce rate > 5% | Bad email list | Use Hunter.io to verify. Remove bounces before next send. |
| "Delivery failed" errors | SPF/DKIM misconfigured | Check DNS records on mxtoolbox.com. Wait 24h for propagation. |
| Domain got blacklisted | Too many spam complaints | Pause sending. Submit delisting request to spamhaus.org. Use different domain. |

---

## Quick checklist before you move to Email 4

- [ ] 3-5 domains purchased and configured
- [ ] SPF, DKIM, DMARC records verified on each
- [ ] 14-day warmup calendar in progress
- [ ] Mail-tester score 9/10+
- [ ] Spam-trigger words audit complete
- [ ] Test inbox receiving emails correctly

**You're ready for Email 4: the reply-handling framework.**

---

*This is Email 3 of 5. The next email covers the AI + human handoff for handling replies — the part where most agencies fail their clients.*

*Want us to set this up for you? [Book a 15-min fit call](https://calendly.com/outboundsolved/15min). First 5 clients get 50% off month 1.*

---

# EMAIL 4 OF 5: The Reply-Handling Framework
### *AI handles 70% of replies, humans handle the rest. Here's how.*

---

## Why this is where most agencies fail

The pattern I see constantly:
1. Agency sends great campaign
2. Recipient replies "interested, tell me more"
3. Agency takes 24-48 hours to reply (because they're handling 10 clients)
4. Lead has cooled off, gone cold, or booked with a competitor
5. Client wonders why they're paying $1K/mo for "5-15 meetings" when they're getting 1

**Speed matters more than perfection in reply handling.** A good reply in 30 minutes beats a perfect reply in 24 hours.

The system below gets you to sub-1-hour response time with 5 minutes/day of human work.

---

## The 5 categories of replies

Every reply falls into exactly one of these:

| Category | % of replies | Action |
|---|---|---|
| **POSITIVE** — "interested", "send info", "let's chat" | ~10-15% | AI replies with calendar link. Books meeting. |
| **OBJECTION** — "too expensive", "tried before", "not now" | ~20-30% | AI replies with objection-handling. Escalate to human if "human" or "call me" appears. |
| **UNSUBSCRIBE** — "remove me", "stop", "unsubscribe" | ~5-10% | AI replies politely. Add to suppression list. Never email again. |
| **OUT_OF_OFFICE** — auto-responder | ~10-15% | AI marks "try again in 7 days." Re-sends Email 1 in 7 days. |
| **REFERRAL** — "talk to X instead" | ~5% | Human follows up with the referred person. |
| **NOT_RELEVANT** — wrong person, not ICP | ~5-10% | AI asks for the right contact. Mark for follow-up. |
| **UNCLEAR** — can't determine intent | ~10-15% | Human reviews within 1 hour. |
| **SPAM/ABUSE** | ~1-2% | Mark. Add to suppression. |

**Why these percentages matter:** Most replies are OBJECTIONS or NOT_RELEVANT, not POSITIVE. You need systems for ALL categories, not just the hot leads.

---

## The AI reply handler (your `classify_replies.py` script)

This is what runs in the background, processing replies within 1 minute of arrival:

**Inputs:** Every reply (subject + body)
**Outputs:** Category + auto-reply (if applicable) + action (human review needed, suppress, retry, etc.)

**The exact prompts and logic:**

### Auto-reply for POSITIVE
```
Hey {{first_name}},

Great, happy to walk through it.

Here's my calendar for a 15-min fit call: {{calendar_link}}

I'll come prepared with a sample campaign for your top 3 ideal customers so you can see what we'd write.

{{sender_name}}
```

### Auto-reply for OBJECTION_PRICE
```
Hey {{first_name}},

Fair question — price is usually the main hesitation.

Our Growth tier is $997/mo. Most clients book 5-15 meetings/mo from the campaign. Average B2B SaaS deal size is $3-15K. So the math usually pays for itself in the first 1-2 closed deals.

If your average deal size is below $1K, we might not be the right fit. Happy to refer you elsewhere.

Worth 15 min to see your specific math?

{{calendar_link}}

{{sender_name}}
```

### Auto-reply for OBJECTION_TRUST ("tried before, didn't work")
```
Totally hear you — most "tried it" stories I hear are from generic blasts or single-inbox campaigns that got burned.

What we do differently:
- 3-5 dedicated sending domains (not your main domain)
- 2-week warmup before first send
- Line-1 personalization per email (no templates)
- Reply handling within 1 hour during business hours

If you tried without those pieces, that's almost always why it failed.

Worth a 10-min call to compare?

{{calendar_link}}
```

### Auto-reply for UNSUBSCRIBE
```
Got it, removing you from our list. No further contact from us.

If you ever want to try us again, just reply to this email.

{{sender_name}}
```

### Auto-reply for NOT_RELEVANT (wrong person)
```
Hey {{first_name}},

No worries if it's not your area. Mind pointing me to whoever handles {{topic}} at {{company}}?

Thanks!

{{sender_name}}
```

---

## The human handoff system

**When does a reply escalate to you (the human)?**
- Category is `UNCLEAR` (can't determine intent)
- Reply contains "call me", "human", "let me think", or asks a specific question
- POSITIVE reply that needs calendar confirmation
- Any reply that mentions a specific objection beyond the standard 4

**Your time per human review:** ~2-3 minutes. Average 5-10 human reviews per day = 15-30 minutes/day.

**The review workflow:**

1. Open your inbox or `classify_replies.py` output
2. For each UNCLASSIFIED reply:
   - Read subject + body
   - Determine category (or just decide what to reply)
   - Send a tailored response
3. Mark as handled

**Tool stack for this:**
- `classify_replies.py` (we built this) does the AI part
- A simple spreadsheet or Notion doc tracks human reviews
- Or upgrade to a tool like Front or HelpScout for shared inbox (later, not now)

---

## The 1-hour SLA in practice

The promise to clients: "We reply to every interested lead within 1 hour during business hours."

**How to actually deliver this:**

| Time of day | Who handles |
|---|---|
| 9am-6pm (your timezone) | You manually review UNCLASSIFIED replies + send any required human replies |
| 6pm-9am + weekends | AI auto-replies handle everything. UNCLASSIFIED replies get "We'll respond tomorrow morning" or similar |
| Overnight | Suppress OOO replies, mark for retry in 7 days |

**Total daily work:** 15-30 minutes during business hours. Outside that, the system runs itself.

---

## The objection-handling playbook (real responses that work)

### "We already do cold email in-house"
```
Makes sense. Most of our clients had an in-house attempt before outsourcing.

The question is: how much is your founder/head of sales time worth per hour? If they're spending 5-10 hrs/week on outbound ops, that's 20-40 hrs/mo at $200+/hr = $4-8K/mo of opportunity cost.

We're $997/mo. The math usually pencils out.

Worth a 15-min call?
```

### "Send me more info first"
```
Sure, happy to.

Best path: a 15-min call where I learn about your ICP and show you exactly how we'd approach it.

Here's my calendar: {{calendar_link}}

I'll come with a sample campaign for your top 3 ideal customers.
```

### "Not the right time / call back in Q3"
```
All good — when's a better time to follow up? I'll add it to my calendar.

Or if it helps, our playbook page has the full breakdown: outboundsolved.com
```

### "We use [competitor] already"
```
Got it — happy with them?

We typically work with folks who tried the in-house or competitor route first and want better results, OR who want to layer outbound on top of what they're already doing.

Worth a 15-min comparison?
```

### "How much does it cost?"
```
Depends on volume, but most of our B2B SaaS clients land on our Growth tier at $997/mo.

That includes 1,000 emails/mo, lead list, copy, sending, AI reply handling, and a bi-weekly strategy call.

Worth 15 min to see if it's a fit for {{company}}?
```

---

## The auto-reply audit

Once a week, spend 15 minutes reviewing:

- How many replies came in?
- How many were categorized correctly?
- How many auto-replies went out?
- How many needed human escalation?
- Any new objection types you should add?

This keeps the AI handler improving over time. Add new objection categories as they come up.

---

## Quick checklist before you move to Email 5

- [ ] `classify_replies.py` set up and running daily
- [ ] Auto-reply templates for POSITIVE, OBJECTION, UNSUBSCRIBE, NOT_RELEVANT configured
- [ ] Calendar link working
- [ ] Suppression list maintained (everyone who unsubscribes)
- [ ] OOO retry logic set (7-day re-send)
- [ ] Human review process documented (15-30 min/day during business hours)
- [ ] Weekly auto-reply audit scheduled

**You're ready for the final email: the metrics dashboard.**

---

*This is Email 4 of 5. The final email covers what to track, when to worry, and how to show clients the dollar impact of your work.*

*Need help setting up the reply system? [Book a 15-min fit call](https://calendly.com/outboundsolved/15min). First 5 clients get 50% off month 1.*

---

# EMAIL 5 OF 5: The Metrics Dashboard
### *What to track, when to worry, and how to show dollar impact*

---

## Why this email matters

Numbers without context are noise. "We sent 1,000 emails, got 8 replies, booked 2 meetings" — so what?

Numbers WITH context are stories. "We sent 1,000 emails, got 8 replies, booked 2 meetings. Your average deal size is $8K. Both meetings are decision-makers with budget. That's $16K in pipeline generated from $997/mo spend. **16x ROI.**"

Same numbers, completely different impact. This email teaches you to tell the story.

---

## The 7 metrics that matter (and the 10 that don't)

### Track these (the 7):

| Metric | Target | Why it matters |
|---|---|---|
| **Open rate** | >50% | Tells you subject lines + inbox placement work |
| **Reply rate** | >5% | Tells you your copy + personalization work |
| **Positive reply rate** | >1% | Tells you your targeting works |
| **Meetings booked per 1000 emails** | 5-15 | Tells you your funnel works end-to-end |
| **Show-up rate** | >70% | Tells you your calendar booking process works |
| **Pipeline generated ($)** | 5-10x monthly fee | Tells you the business value of the work |
| **Closed deals (from meetings)** | 20-40% of meetings | Tells you the lead quality is good |

### Don't track these (the 10):

- ❌ Total emails sent (volume isn't a goal)
- ❌ Total replies (raw count is meaningless)
- ❌ Click-through rate (CTAs in cold emails get clicked <1% — that's normal)
- ❌ Bounce rate (just keep it under 5%, don't optimize further)
- ❌ Spam complaints (just keep it at 0%, don't optimize further)
- ❌ Followers / connections / vanity metrics
- ❌ Email open rate from your own team (irrelevant)
- ❌ Time spent on campaign (efficiency matters, but not a client-facing metric)
- ❌ Subject line A/B test results (marginal gains, focus on copy instead)
- ❌ Sender score / domain reputation numbers (proxy metrics, not outcomes)

---

## The monthly performance report format

This is what you send to clients every month. Format is fixed, so it's the same template every time.

```
# MONTHLY OUTBOUND REPORT
**Client:** {{client_name}}
**Period:** {{month}} {{year}}
**Tier:** {{starter/growth/scale}}

## HEADLINE NUMBER
**Pipeline generated this month: ${{total_pipeline_dollar_value}}**
**Cost: ${{monthly_fee}}**
**ROI: {{roi_multiple}}x**

## KEY METRICS
- Emails sent: {{total_emails}}
- Reply rate: {{reply_rate_pct}}% ({{replies}} replies)
- Positive reply rate: {{positive_rate_pct}}% ({{positive_replies}} positive)
- Meetings booked: {{meetings}} (target: 5-15)
- Show-up rate: {{showup_rate_pct}}%
- Closed deals (from our meetings): {{closed_count}}
- Pipeline value: ${{pipeline_value}}

## TOP 3 MEETINGS THIS MONTH
1. {{company_1}} — {{contact_name}}, {{contact_title}}. Pain: {{brief_pain}}. Status: {{discovery/scheduled/closed}}
2. {{company_2}} — {{contact_name}}, {{contact_title}}. Pain: {{brief_pain}}. Status: {{discovery/scheduled/closed}}
3. {{company_3}} — {{contact_name}}, {{contact_title}}. Pain: {{brief_pain}}. Status: {{discovery/scheduled/closed}}

## WHAT WORKED
- {{insight_1: specific tactic that worked this month}}
- {{insight_2: another specific insight}}

## WHAT TO TRY NEXT MONTH
- {{recommendation_1: based on data}}
- {{recommendation_2: based on data}}

## RAW DATA
[Attached: CSV of all replies, all meetings booked, all leads contacted]
```

---

## The dashboard view (real-time, not monthly)

For your own use (not client-facing), build a simple dashboard tracking weekly:

| Week | Emails | Replies | Positive | Meetings | Show-ups | Closed | Pipeline $ |
|---|---|---|---|---|---|---|---|
| W1 | 250 | 14 | 3 | 1 | 1 | 0 | $5K |
| W2 | 250 | 18 | 4 | 2 | 1 | 1 | $12K |
| W3 | 250 | 12 | 2 | 1 | 1 | 0 | $0 |
| W4 | 250 | 22 | 5 | 3 | 2 | 1 | $8K |
| **Total** | **1,000** | **66** | **14** | **7** | **5** | **2** | **$25K** |

**Cost: $997. Pipeline generated: $25K. ROI: 25x.**

That's the kind of number that makes a client stay for 12+ months.

---

## When to worry (and when not to)

### Open rate

- **< 30%:** Worry. Spam folder issue or weak subject lines.
- **30-50%:** OK but improvable. Test new subject lines.
- **50-70%:** Good. Normal range.
- **> 70%:** Suspicious — could be inflated by Apple Mail Privacy Protection (truncated opens). Don't trust >70%.

### Reply rate

- **< 1%:** Big problem. List quality or copy issue.
- **1-3%:** Below average but workable.
- **3-7%:** Good. Industry standard.
- **7-15%:** Excellent. Your ICP is dialed in.
- **> 15%:** Almost too good. Verify these are real human replies, not auto-replies.

### Positive reply rate

- **< 0.5%:** Targeting is too broad.
- **0.5-1%:** Average.
- **1-2%:** Good.
- **> 2%:** Excellent.

### Meetings booked

- **< 3 per 1000 emails:** Your funnel is broken somewhere (positive replies not booking calls).
- **3-5 per 1000:** Below average but workable.
- **5-15 per 1000:** Good.
- **> 15 per 1000:** Excellent. Rare and worth investigating what's working.

### Show-up rate

- **< 50%:** People are booking but not showing. Calendar reminder issue or weak confirmation flow.
- **50-70%:** Average.
- **> 70%:** Excellent. Add reminder emails 24h before.

### Pipeline $

- **< 3x monthly fee:** Work is happening but not converting. Re-evaluate targeting.
- **3-10x monthly fee:** Healthy.
- **> 10x monthly fee:** Great. Client should be thrilled.
- **> 20x monthly fee:** Consider raising prices.

---

## The diagnostic decision tree

When something's off, work through this:

**Open rate is low?**
- → Check spam folder placement (send test to yourself)
- → Check SPF/DKIM/DMARC
- → Check domain warmup status (still warming?)
- → Test different subject lines

**Open rate is high but reply rate is low?**
- → The first line is generic or uninteresting
- → ICP match is off
- → The CTA isn't compelling (weak "worth a chat?" vs stronger proof points)

**Reply rate is high but meetings booked is low?**
- → Calendar link not working
- → Auto-reply isn't fast enough (taking 4+ hours)
- → CTA isn't a calendar link, just a reply request

**Meetings booked but show-up is low?**
- → No 24h reminder email
- → Confirmation email is too plain (no agenda, no link)
- → Calendar link points to a different timezone (recipient gets confused)

**Pipeline $ is low?**
- → Wrong ICP (targeting people who aren't buyers)
- → Lead quality is good but your closing rate is low (client's problem, not yours)
- → Deal sizes are too small for the effort

---

## The "should we change strategy?" checklist

After 30 days of running with same list + same copy, ask:

- [ ] Is open rate stable around 50%+?
- [ ] Is reply rate above 5%?
- [ ] Are meetings being booked (3+ per week)?
- [ ] Are show-ups above 70%?
- [ ] Is pipeline $ tracking toward 5x monthly fee?

If all 5 are yes: **don't change anything**. Most agencies over-optimize. Consistency wins.

If 3-4 are yes: minor tweaks (subject lines, opening lines).

If 2 or fewer are yes: pause and do a full diagnostic. Probably targeting or copy is broken at a fundamental level.

---

## Quick checklist before you launch

- [ ] Weekly tracking spreadsheet set up
- [ ] Monthly report template saved
- [ ] 7 key metrics identified for your client
- [ ] Diagnostic decision tree reviewed
- [ ] When-to-worry thresholds understood
- [ ] First monthly report ready to send on Day 30

---

## Final word

That's the system. 5 emails, 5 days of reading. If you implement all of it:

- A list you actually trust
- A sequence that gets replies
- A deliverability setup that lands in inbox
- A reply system that books meetings
- A metrics dashboard that shows clients the dollar impact

**Total time to implement:** ~20 hours of setup
**Total cost to implement:** $30-50 (domains) + ~$21-35/mo (Google Workspace) = ~$50-85 one-time + ~$25/mo

**What you get back:** A cold email system that books 5-15 meetings/month consistently, that you can either use yourself or sell to clients at $500-2K/mo per engagement.

---

## Want us to do this for you?

OutboundSolved implements this exact system for B2B SaaS founders and agencies:

- Day 1: ICP interview + lead list delivery (500 contacts)
- Day 7: Sequence delivery + deliverability setup
- Day 14: Launch + reply handling begins
- Ongoing: Weekly reports, monthly strategy calls

**Pricing:** $497-$1,997/mo depending on volume. First 5 clients get 50% off month 1.

[Book a 15-min fit call](https://calendly.com/outboundsolved/15min) to see if it's a fit.

---

**You finished all 5 emails of the playbook. You have everything you need to run cold email that books meetings.**

If you want to skip the 20 hours of setup and have us do it for you, [book a fit call](https://calendly.com/outboundsolved/15min). If you'd rather build it yourself, [the scripts and templates are free in our GitHub repo](https://github.com/ARCHONODE/outboundsolved-site).

— The OutboundSolved team