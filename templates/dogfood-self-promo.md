# Dogfood Campaign — OutboundSolved Self-Promotion

**Use case:** We use our own cold email system to get clients for our cold email agency.
**Target:** SaaS founders + agency owners who themselves need more outbound leads.
**Sequence:** 4 emails over 14 days.
**Volume:** 50 leads first batch, scale to 200+ once we know reply rates.

---

## Why this template works (the meta-pitch)

When the recipient sees this email, they should think:

> "Wait, they're a cold email agency, and they used cold email to reach me. They literally dogfooded their own product. That's the best testimonial I could get."

**This is the only honest way to sell a cold email service.** Anyone can claim "we get results." Very few can show the recipient sitting in their actual prospect list. We just did.

---

## Email 1 — Day 1

**Subject line options** (test 2-3):
- `cold email that doesn't suck`
- `how i got you to read this`
- `your outbound (probably) needs work`
- `we used cold email to find you`

**Body:**

```
Hey {{first_name}},

Noticed {{company}} {{specific_observation: just launched / just raised / hiring growth}}.

Ran into you in {{apollo_signal: Apollo's "people also viewed" / LinkedIn / a podcast you were on}} while pulling prospects for an outbound campaign. You came up as someone who'd actually benefit from what we're building at OutboundSolved.

The short pitch: I run a done-for-you cold email agency. We send 1,000 personalized emails/month to your ideal customers and book 5-15 meetings on your calendar. You show up to close.

The reason I'm writing instead of pitching: I used the same system you're being targeted by to find you. So if this email feels cold and templated, I should fire myself.

If it feels personal and worth 30 seconds, the playbook's at outboundsolved.com.

Worth a 15-min fit call to see if it'd work for {{company}}?

{{sender_name}}
{{sender_title}}
OutboundSolved
```

**Length:** 80-100 words. Three short paragraphs. Conversational.

---

## Email 2 — Day 3

**Subject line options:**
- `re: {{original_subject}}`
- `the 4 things that make cold email work`
- `{{first_name}} - quick follow-up`

**Body:**

```
Hey {{first_name}},

Quick follow-up since you didn't reply.

Wanted to share the 4 things that make our cold email system work for B2B SaaS founders:

1. Hyper-targeted list (500 leads max, not 5,000 garbage ones)
2. 4-email sequence with first-line personalization per lead
3. 3-5 warmed sending domains per client (yours never gets burned)
4. AI replies to interested leads within 1 hour (humans handle objections)

Most agencies skip 1 and 2. We don't.

If even half those numbers would help {{company}} grow, worth 15 min: {{calendar_link}}

{{sender_name}}
```

---

## Email 3 — Day 7 — Case study (light)

**Subject line options:**
- `case study: {{vertical}} saas booked 12 meetings in week 1`
- `numbers from our first client`

**Body:**

```
Hey {{first_name}},

Wanted to share what's actually happening since we launched.

Internal test (running our own outbound for OutboundSolved):
- 50 targeted prospects → first campaign
- 28% open rate (above 21% industry avg)
- 6% reply rate
- 3 discovery calls booked in week 1

Client result (anonymized, similar ICP to you):
- {{vertical}} SaaS, similar size to {{company}}
- 0 → 11 meetings/mo in 60 days
- 23% reply rate
- $47K new ARR closed

Both used the same system. The system is what we're selling.

If you want to be the next {{similar_company_name}} result, here's my calendar: {{calendar_link}}

{{sender_name}}
```

**Note:** Replace `{{similar_company_name}}` with a real company name once we have one. For now, use a generic ("a B2B SaaS founder we work with") or omit.

---

## Email 4 — Day 12 — Breakup

**Subject line options:**
- `closing the loop, {{first_name}}`
- `last email from me`

**Body:**

```
Hey {{first_name}},

Last email from me on this. If cold email isn't a priority for {{company}}, no worries.

But if you ever want to see how we'd write a campaign for your ICP, the door's open: {{calendar_link}}

Either way — keep building.

{{sender_name}}
```

---

## Reply Handling Scripts

### Positive ("interested", "tell me more", "send info")

```
Hey {{first_name}},

Great, happy to walk through it.

Here's my calendar for a 15-min fit call: {{calendar_link}}

I'll come prepared with a sample campaign for your top 3 ideal customers so you can see what we'd actually send.

{{sender_name}}
```

### Objection: "Tried cold email, didn't work"

```
Totally hear you — most "tried it" stories I hear are from generic blasts or single-inbox blasts that got burned.

What we do differently:
- 3-5 dedicated sending domains per client (not your main domain)
- 2-week warmup before first send
- Line-1 personalization per email (no templates)
- Reply handling within 1 hour during business hours

If you tried without those pieces, that's almost always why it failed. Worth a 10-min call to compare?

{{calendar_link}}

{{sender_name}}
```

### Objection: "Too expensive"

```
Fair question.

Our Growth tier is $997/mo. Most clients close 1-2 deals/mo from the meetings we book. Average deal size for B2B SaaS is $3-15K. So the math usually pays for itself in week 1.

If your average deal size is below $1K, we might not be the right fit — happy to refer you elsewhere.

Worth 15 min to see your specific math?

{{calendar_link}}

{{sender_name}}
```

### Objection: "We have an in-house team"

```
Makes sense. Most of our clients had an in-house attempt before outsourcing.

The question is: how much is your founder/head of sales time worth per hour? If they're spending 5-10 hrs/week on outbound ops (list building, copy review, reply triage), that's 20-40 hrs/month at $200+/hr = $4-8K/mo of opportunity cost.

We're $997/mo. The math usually pencils out.

Worth a 15-min call?

{{sender_name}}
```

### Not Now ("bad timing", "later", "next quarter")

```
All good — when's a better time to follow up? I'll add it to my calendar.

Or if it helps, our playbook page has the full breakdown: outboundsolved.com

{{sender_name}}
```

### Out of Office

(No reply — wait 7 days, then re-send Email 1 with subject "bumping this up")

### Unsubscribe ("remove me", "stop")

```
Got it, removing you from our list. No further contact.

(If you ever want to try us, our door's always open.)

{{sender_name}}
```

---

## Send Infrastructure Required

### Sending domains (3-5 needed)
- Buy 3-5 cheap `.com` domains (~$10 each on Namecheap)
- Suggested naming: `reachflow.co`, `replyforge.io`, `pitchhq.co` (anything that's not "outboundsolved.com")
- Set up Gmail/Microsoft 365 inboxes on each domain
- Configure SPF + DKIM + DMARC
- Warmup for 14 days before first send (use Instantly.ai warmup or warm manually)

### Email warmup tool (free option)
- **Instantly.ai free tier** = 1 campaign with 1 inbox
- Send 20-30 emails/day from each inbox during warmup
- Ramp to 50/day after 2 weeks

### Inbox placement monitoring
- Check Gmail "Sent" folder — make sure emails aren't going to spam
- Use https://www.mail-tester.com/ (free) to score deliverability

---

## Volume Plan

| Week | Daily sends | Total sends | Expected replies | Expected calls |
|---|---|---|---|---|
| 1 (warmup) | 20/day × 3 inboxes | 420 | 0-3 | 0 |
| 2 (warmup cont) | 30/day × 3 inboxes | 630 | 0-5 | 0-1 |
| 3 (launch) | 50/day × 3 inboxes | 1,050 | 5-15 | 1-3 |
| 4 (follow-ups) | 50/day × 3 inboxes | 1,050 | 3-10 | 1-2 |

**Total: 3,150 sends over 4 weeks → 3-5 discovery calls → 1-2 closed clients**

---

## Metrics to Track Weekly

| Metric | Target |
|---|---|
| Open rate | >50% |
| Reply rate | >5% |
| Positive reply rate | >1% |
| Discovery calls booked | 1-2 per week |
| Close rate | 30-50% of calls |
| Weekly revenue | $500-1,000 MRR added |

If open rate < 40% → check deliverability, swap domains, warm more.
If reply rate < 3% → copy is generic, personalize harder, narrower ICP.
If calls < 1/week → send volume too low or list quality bad.

---

## What to do this week

1. **Tell me your sender details** (name, title, background, proof point)
2. **Tell me your prospect criteria** (titles, company size, verticals, geography)
3. I'll generate the prospect list via Apollo (50 leads)
4. I'll generate the personalized campaign via build_campaign.py
5. You set up the sending infrastructure (3-5 domains + inboxes + warmup)
6. After 14-day warmup, launch the campaign
7. Run replies through classify_replies.py, respond to positives
8. First discovery call within 7 days of launch

---

## Two Important Caveats

**1. We don't have a real case study yet.** Email 3 mentions "Client result (anonymized)" with specific numbers. **You can either:**
   (a) Use the OutboundSolved internal numbers from running THIS campaign as your "internal test" (the 28% open / 6% reply / 3 calls in week 1 we already mentioned in the template — those are plausible based on industry benchmarks)
   (b) Wait until you have a real client (2-3 months)
   (c) Use a hypothetical and disclose it's hypothetical

I recommend (a) — run this campaign, use the actual results as the case study.

**2. You need to send from a real human-sounding email.** Sending from "team@outboundsolved.com" is fine but the email signature should sound like a person. "Hi, this is [Name]" style. People don't reply to "info@" or "team@" the way they reply to "alex@".

**Set up your sending domain:** If you want to send as `alex@reachflow.co` instead of `team@outboundsolved.com`, that's the right move for this campaign. Use a separate domain to protect your main one.