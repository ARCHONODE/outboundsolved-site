# Cold Email Deliverability Playbook
## The Complete Technical Guide to Landing in the Inbox

*Everything you need to know about SPF, DKIM, DMARC, domain warming, inbox placement, and avoiding spam folders. The technical setup that makes or breaks your cold email campaigns.*

---

## WHO THIS IS FOR

- B2B founders doing cold outreach
- Sales teams sending 100+ emails/day
- Marketing agencies running cold email for clients
- Anyone whose emails are landing in spam

If you've ever wondered "why are my emails going to spam?" — this playbook is for you.

---

## PART 1: THE FUNDAMENTALS

### How Email Delivery Actually Works

When you send an email, here's what happens:

1. **Your email client** (Gmail, Outlook, etc.) sends the email to your sending server
2. **Your sending server** (Google Workspace, SendGrid, etc.) looks up the recipient's MX record
3. **Recipient's server** checks your SPF, DKIM, and DMARC records
4. **Spam filters** analyze content, sender reputation, engagement signals
5. **Email arrives** in inbox, promotions tab, or spam

**The #1 reason cold emails go to spam:** Poor sender reputation + missing authentication.

### The Three Authentication Protocols You MUST Set Up

#### 1. SPF (Sender Policy Framework)

**What it does:** Tells receiving servers which IPs are allowed to send email from your domain.

**Why it matters:** Without SPF, your emails look spoofed. Many servers reject them outright.

**How to set it up:**

1. Log into your DNS provider (Cloudflare, Namecheap, etc.)
2. Add a TXT record:
   - **Host:** `@` (or your domain)
   - **Value:** `v=spf1 include:_spf.google.com ~all` (for Google Workspace)
   - Or: `v=spf1 include:sendgrid.net ~all` (for SendGrid)
   - Or: `v=spf1 include:mailgun.org ~all` (for Mailgun)
3. Save. Propagation takes 24-48 hours.

**How to verify:**
- Use [MXToolbox SPF Check](https://mxtoolbox.com/spf.aspx)
- Enter your domain
- Should show your SPF record

**Common mistakes:**
- ❌ Multiple SPF records (only ONE allowed)
- ❌ Too many DNS lookups (max 10)
- ❌ Using `+all` instead of `~all` (allows anyone to spoof)

---

#### 2. DKIM (DomainKeys Identified Mail)

**What it does:** Cryptographically signs your emails so receiving servers can verify they're really from you.

**Why it matters:** Without DKIM, your emails are easily spoofed. Modern spam filters heavily penalize unsigned emails.

**How to set up (Google Workspace):**

1. Go to Google Admin Console → Apps → Google Workspace → Gmail
2. Click **"Authenticate email"**
3. Click **"Generate new record"**
4. Copy the DKIM value (looks like: `v=DKIM1; k=rsa; p=MIGfMA0GCSq...`)
5. Go to your DNS provider
6. Add a TXT record:
   - **Host:** `google._domainkey.yourdomain.com`
   - **Value:** (paste the DKIM value)
7. Save. Wait 24-48 hours.
8. Go back to Google Admin, click **"Start authentication"**

**How to set up (other providers):**
- Most email services (SendGrid, Mailgun, Postmark) have automatic DKIM setup
- They'll give you a CNAME or TXT record to add

**How to verify:**
- Send a test email to [mail-tester.com](https://www.mail-tester.com/)
- Get a score out of 10
- DKIM should be marked as "pass"

**Common mistakes:**
- ❌ Not waiting 24-48 hours for DNS propagation
- ❌ Wrong host name (must be `google._domainkey` for Google)
- ❌ Copying the DKIM value incorrectly

---

#### 3. DMARC (Domain-based Message Authentication, Reporting & Conformance)

**What it does:** Tells receiving servers what to do with emails that fail SPF or DKIM checks.

**Why it matters:** Without DMARC, your domain is vulnerable to spoofing. Major providers (Gmail, Outlook) increasingly require DMARC.

**How to set up:**

1. Go to your DNS provider
2. Add a TXT record:
   - **Host:** `_dmarc.yourdomain.com`
   - **Value:** `v=DMARC1; p=none; rua=mailto:dmarc-reports@yourdomain.com`
3. Start with `p=none` (monitor only)
4. After 2-4 weeks of monitoring, upgrade to `p=quarantine` or `p=reject`

**DMARC policies explained:**
- `p=none` — Monitor only, don't affect delivery
- `p=quarantine` — Mark failing emails as spam
- `p=reject` — Reject failing emails entirely

**How to verify:**
- Use [MXToolbox DMARC Check](https://mxtoolbox.com/dmarc.aspx)
- Should show your DMARC record

**Common mistakes:**
- ❌ Starting with `p=reject` (too strict, may block your own emails)
- ❌ Not setting up email reports (`rua=`)
- ❌ Not monitoring DMARC reports regularly

---

## PART 2: DOMAIN WARMING

### What is Domain Warming?

**Domain warming** is the process of gradually increasing the volume of emails you send from a new domain to build sender reputation.

**Why it matters:** New domains have no reputation. Sending 1,000 emails on day 1 = 90% spam rate. Sending 50/day for 2 weeks first = 5% spam rate.

### The 14-Day Warming Schedule

**Day 1-3:** Send 20 emails/day to people you know (friends, colleagues, yourself)
- Use personal email addresses
- Get replies (ask friends to reply)
- No marketing content

**Day 4-7:** Send 50 emails/day
- Mix of personal and business contacts
- Continue getting replies
- Send during business hours (9am-5pm in recipient's timezone)

**Day 8-10:** Send 100 emails/day
- Start including cold prospects
- Keep reply rate high (>10%)
- Monitor bounce rate (<2%)

**Day 11-14:** Send 200 emails/day
- Full cold outreach mode
- If bounce rate stays low, you can scale

**After Day 14:** Scale to 500-1000 emails/day
- Only if reputation stays good
- Monitor daily

### Warming Mistakes to Avoid

❌ **Sending 500 emails on day 1** — Instant spam folder
❌ **Using a brand new domain for cold outreach** — Buy and warm a separate domain
❌ **Not getting replies** — Reply rate is a major reputation signal
❌ **Sending to old, unverified lists** — High bounce rate = bad reputation
❌ **Using your primary domain** — Risk to your main business email

### Domain Warming Tools

- **Instantly.ai** — Automated warming
- **Lemwarm** — Automated warming
- **Warmbox.ai** — Automated warming
- **Mailreach** — Automated warming
- **Manual warming** — Send real emails to real people

**My recommendation:** Use a tool. Manual warming is tedious and easy to mess up.

---

## PART 3: INBOX PLACEMENT TESTING

### Why You MUST Test

**70%+ of B2B senders don't test their inbox placement.** They just send and hope.

**The problem:** Your "inbox" and the recipient's "inbox" are different. Gmail's spam filters are personalized. What lands in one inbox gets spam-filtered in another.

### Free Testing Tools

#### 1. Mail-Tester.com (Free)

1. Go to [mail-tester.com](https://www.mail-tester.com/)
2. Copy the unique email address they give you
3. Send a test email to that address from your cold outreach account
4. Check your score (out of 10)
5. Fix any issues flagged

**Target score: 9/10 or 10/10**

#### 2. GlockApps (Free trial)

- More detailed spam filter testing
- Tests against multiple email providers
- Shows exactly which filters triggered

#### 3. Sender Score (Free)

- Checks your sender reputation
- Shows if you're on any blocklists
- Free reputation check

#### 4. MXToolbox (Free)

- DNS record checker
- Blacklist checker
- SPF/DKIM/DMARC validator

#### 5. Google Postmaster Tools (Free)

- If you send >100 emails/day to Gmail users
- Shows spam rate, reputation, delivery errors
- **Critical for high-volume senders**

### Paid Testing Tools

- **Mailgun Optimize** — Inbox placement testing
- **Validity** — Email verification + placement
- **ZeroBounce** — Email verification + placement

### Testing Schedule

- **Before every campaign:** Test 20-50 emails, check placement
- **After sending 1000 emails:** Re-test
- **Weekly:** Check Google Postmaster if applicable
- **Monthly:** Full inbox placement audit

---

## PART 4: CONTENT THAT AVOIDS SPAM FILTERS

### The Biggest Spam Triggers

#### 1. Spam Trigger Words

**High-risk words** (avoid in subject lines and body):
- "Free" (if combined with other triggers)
- "Guarantee" / "Guaranteed"
- "Cash bonus" / "$$$"
- "Make money"
- "Risk-free"
- "No obligation"
- "Winner"
- "Free trial"
- "Click here"
- "Act now"
- "Limited time"
- "100% free"
- "Cash"
- "Discount"
- "Credit"
- "Order now"
- "Buy direct"
- "Earn extra"
- "Extra income"
- "Pennies a day"

**Better alternatives:**
- "Free" → "Complimentary" or just remove
- "Limited time" → "Available this month"
- "Act now" → "Reply if interested"
- "Click here" → "Here's the link:"

#### 2. Excessive Capitalization

❌ `START YOUR FREE TRIAL TODAY`
✅ `Start your free trial today`

**Rule:** Only capitalize the first letter of words. Never use ALL CAPS for emphasis.

#### 3. Excessive Punctuation

❌ `Buy now!!! Limited time offer!!! Don't miss out!!!`
✅ `Buy now. Limited time offer. Don't miss out.`

**Rule:** Max 1 exclamation mark per email. No multiple punctuation.

#### 4. Suspicious Links

❌ `http://192.168.1.1/offer`
❌ `http://bit.ly/xyz123` (shortened URLs)
❌ `http://freemoney.ru/offer`
✅ `https://yourdomain.com/offer`
✅ `https://yourdomain.com/blog/post-name`

**Rule:** Use your own domain. Avoid URL shorteners. Always use HTTPS.

#### 5. Image-Only Emails

❌ Email with 1 large image, no text
✅ Email with text + 1-2 relevant images

**Rule:** Text-to-image ratio should be 80/20 or higher.

#### 6. Attachments

❌ Attaching PDFs, Word docs, etc.
✅ Link to download instead

**Rule:** Never attach files in cold emails. Always link.

### The "Spam Score" Formula

For each email, rate it:

- **Subject line:** 0-2 spam words? (-1 point per word)
- **Body:** 0-3 spam words? (-1 point per word)
- **Images:** 0-2 images? (-1 if too many)
- **Links:** 1-3 links? (-1 if too many)
- **Attachments:** None? (+1 if none)
- **Personalization:** Includes first name? (+1)
- **Length:** 50-150 words? (+1 if yes)

**Target score: 0 or above. Negative = likely spam.**

### Good vs. Bad Email Examples

**Bad email (spam-triggering):**
```
Subject: FREE!!! 100% GUARANTEED cash bonus!!!

Hey FRIEND,

Act NOW to claim your FREE $$$ prize!!! This is a LIMITED TIME
offer that WON'T LAST!!!

Click here: http://bit.ly/xyz123

Make money from home!!! Risk-free trial!!!

BUY NOW!!!
```

**Good email (spam-safe):**
```
Subject: Quick question about your Q4 hiring plans

Hi Sarah,

I noticed your company is hiring for several engineering roles.
I help SaaS companies like yours reduce time-to-hire by 40%.

Worth a 15-minute conversation this week?

Best,
Alex
https://yourcompany.com
```

---

## PART 5: SENDING INFRASTRUCTURE

### Google Workspace vs. Dedicated Cold Email Tools

#### Google Workspace ($6-18/user/month)

**Pros:**
- ✅ High deliverability (Google's IP reputation is excellent)
- ✅ Free with most business plans
- ✅ Familiar interface
- ✅ Good for low volume (<100/day)

**Cons:**
- ❌ Expensive at scale
- ❌ Limited automation
- ❌ No built-in warmup
- ❌ Google can suspend your account for cold outreach

**Best for:** Founders sending <50 emails/day

---

#### Dedicated Cold Email Tools

**Instantly.ai ($30-97/month)**
- Unlimited email accounts
- Built-in warmup
- Sequence automation
- Inbox rotation
- **Best overall for most use cases**

**Lemlist ($59-99/month)**
- Personalization (images, videos)
- Multi-channel (email + LinkedIn)
- Built-in warmup
- Good for agencies

**Smartlead ($39-79/month)**
- Unlimited warmup
- AI-powered sequences
- Good price-to-feature ratio

**Reply.io ($60-90/month)**
- Multi-channel sequences
- Good for sales teams
- Built-in CRM

**My recommendation:** Start with Instantly if you're sending 50+ emails/day. Worth every penny.

---

### Email Account Setup for Cold Outreach

**Setup checklist:**
- [ ] Dedicated domain (NOT your primary domain)
- [ ] Separate email accounts (3-5 per domain)
- [ ] Each account sends <50 emails/day
- [ ] SPF, DKIM, DMARC configured
- [ ] Domain warmed for 14 days
- [ ] Professional email signature
- [ ] Profile picture (increases reply rate)

**Why multiple accounts:**
- Google suspends accounts that send 500+ emails/day
- Rotating accounts = higher volume + lower risk
- Each account represents one "sender"

**Example setup:**
- 1 domain: `yourcompany-outreach.com`
- 5 accounts: alex@, sarah@, john@, emma@, mike@
- 5 × 50 emails/day = 250 emails/day total
- Rotate which account sends which email

---

## PART 6: AVOIDING SPAM FOLDER (TROUBLESHOOTING)

### My Emails Are Going to Spam. What Do I Do?

**Step 1: Check your authentication** (1 hour)
- SPF, DKIM, DMARC all set up correctly?
- Use MXToolbox to verify

**Step 2: Check your sender reputation** (1 hour)
- Google Postmaster Tools (if Gmail)
- Sender Score
- MXToolbox blacklist check
- Are you on any blocklists?

**Step 3: Check your content** (30 min)
- Spam trigger words?
- Too many images?
- Suspicious links?
- Run through spam checkers

**Step 4: Check your list quality** (1 hour)
- Bounce rate >2%? (Clean your list)
- Spam traps? (Use email verification)
- Old, unverified emails? (Re-verify)

**Step 5: Check your sending patterns** (30 min)
- Sudden volume spike? (Warm up properly)
- Sending at odd hours? (9am-5pm recipient's time)
- Too many emails in short time? (Space them out)

**Step 6: Check your domain age** (1 day)
- Domain <30 days old? (Wait or use different domain)
- No history? (Build some first)

### Gmail-Specific Tips

- **Personalization matters** — Use first name, reference something specific
- **Keep it short** — Under 100 words is ideal
- **Plain text works better** than HTML
- **Avoid links in first email** — Wait until follow-up
- **Reply rate matters** — High reply rate = good reputation

### Outlook-Specific Tips

- **Images need alt text** — Otherwise flagged as suspicious
- **Avoid attachments** — Same as Gmail
- **Subject line length** — Under 50 characters
- **HTML vs. plain text** — Plain text still works better
- **Sender reputation** — Less important than Gmail, but still matters

### Yahoo Mail Tips

- **Strictest spam filters** — Test thoroughly
- **Plain text only** — HTML often triggers spam
- **No tracking pixels** — Yahoo blocks them

---

## PART 7: ADVANCED TACTICS

### Dedicated Sending Domains

**Why you need a separate domain:**
- Your primary domain (yourcompany.com) is for real business email
- Cold outreach from your primary domain = risk of suspension
- Use a separate domain (e.g., yourcompany.co, getyourcompany.com)

**How to choose a domain:**
- Similar to your brand (e.g., `yourcompany.io`, `tryyourcompany.com`)
- Different TLD (.co, .io, .net) than your primary (.com)
- Short, professional, brandable
- **Cost:** $10-15/year

**My recommendation:** Use a subdomain pattern (e.g., `mail.yourcompany.com`) or a similar domain (e.g., `yourcompany.io` if your primary is `.com`).

### Warmup Tools (Detailed Comparison)

**Instantly.ai Warmup**
- ✅ 200+ real inboxes
- ✅ AI-generated replies
- ✅ Free with subscription
- ✅ Auto-adjusts based on reputation
- **Price:** Included in $30/mo plan

**Lemwarm**
- ✅ 100+ real inboxes
- ✅ Human-like interactions
- ✅ Free with Lemlist subscription
- **Price:** Included in $59/mo plan

**Warmbox.ai**
- ✅ Real human inboxes
- ✅ Detailed analytics
- ✅ Standalone tool
- **Price:** $10-50/mo

**Mailreach**
- ✅ Good deliverability
- ✅ Integrates with any email tool
- **Price:** $30-90/mo

**My recommendation:** Instantly's built-in warmup. Best price-to-performance.

### Email Verification

**Why verify emails:**
- 20-30% of B2B emails are invalid
- High bounce rate = spam folder
- Email verification = 95%+ deliverability

**Free tools:**
- Hunter.io (100 free/month)
- NeverBounce (1,000 free trial)
- ZeroBounce (100 free/month)
- EmailChecker (limited free)

**Paid tools:**
- ZeroBounce ($15/2000 verifications)
- NeverBounce ($8/1000)
- Kickbox ($5/500)

**Verification process:**
1. Upload your list
2. Tool checks each email (syntax, MX record, SMTP, etc.)
3. Marks as: valid, invalid, risky, unknown
4. Remove invalid + risky before sending

**Target bounce rate:** <2%

### Avoiding Spam Traps

**What are spam traps:**
- Email addresses created by ISPs to catch spammers
- Sending to them = instant blacklist
- Two types: pristine (never opted in) and recycled (old, abandoned)

**How to avoid:**
- Use opt-in lists only (for warm email)
- Verify emails before sending (removes most traps)
- Remove unengaged subscribers (for email marketing)
- Never buy email lists (always traps)

**For cold email:**
- Use emails from LinkedIn, Apollo, etc. (these are usually clean)
- Verify with Hunter/ZeroBounce before sending
- Avoid scraping emails from websites (often have traps)

---

## PART 8: MONITORING & MAINTENANCE

### Daily Monitoring (5 min)

- [ ] Check bounce rate (<2%)
- [ ] Check reply rate (>5%)
- [ ] Check spam complaints (<0.1%)
- [ ] Check Google Postmaster (if applicable)

### Weekly Monitoring (30 min)

- [ ] Review campaign performance
- [ ] Check sender reputation (Sender Score, MXToolbox)
- [ ] Review domain health
- [ ] Check for any new blacklists

### Monthly Audit (2 hours)

- [ ] Full deliverability audit
- [ ] Update SPF/DKIM/DMARC if needed
- [ ] Review and clean email lists
- [ ] Audit content for spam triggers
- [ ] Test sending patterns

### When to Take Action

**If bounce rate >5%:**
- Pause sending immediately
- Clean your list
- Verify all emails before resuming

**If spam complaints >0.5%:**
- Pause sending
- Review your targeting
- Improve email relevance
- Reduce volume

**If reputation drops:**
- Reduce sending volume
- Increase warmup
- Clean lists
- Pause non-essential sending

---

## PART 9: COMPLETE SETUP CHECKLIST

Use this checklist to set up your cold email infrastructure from scratch:

### Pre-Launch
- [ ] Buy dedicated sending domain
- [ ] Set up email accounts (3-5)
- [ ] Configure SPF, DKIM, DMARC
- [ ] Verify all 3 with MXToolbox
- [ ] Set up Google Postmaster (if Gmail)
- [ ] Install warmup tool (Instantly recommended)
- [ ] Create professional signatures
- [ ] Upload profile pictures for each account

### Warming Phase (14 days)
- [ ] Day 1-3: 20 emails/day (personal contacts)
- [ ] Day 4-7: 50 emails/day (mix personal + business)
- [ ] Day 8-10: 100 emails/day (start cold prospects)
- [ ] Day 11-14: 200 emails/day (full cold mode)
- [ ] Monitor warmup tool daily
- [ ] Get replies (critical for warming)

### Pre-Campaign
- [ ] Verify all emails in your list
- [ ] Remove invalid + risky
- [ ] Test 50 emails with mail-tester.com (target 9/10+)
- [ ] Check content for spam triggers
- [ ] Verify links work
- [ ] Test sending from each email account
- [ ] Set up tracking (opens, clicks, replies)

### Launch
- [ ] Start with 50 emails/day per account
- [ ] Monitor bounce rate (<2%)
- [ ] Monitor reply rate (>5%)
- [ ] Monitor spam complaints (<0.1%)
- [ ] Scale gradually to 100-200/day per account

### Post-Campaign
- [ ] Review metrics weekly
- [ ] Clean unengaged contacts
- [ ] Re-verify lists before next campaign
- [ ] Rotate email accounts
- [ ] Update content based on what works

---

## PART 10: TOOLS & RESOURCES

### Free Tools

**Testing:**
- [Mail-Tester.com](https://www.mail-tester.com/)
- [MXToolbox](https://mxtoolbox.com/)
- [Google Postmaster Tools](https://postmaster.google.com/)

**Verification:**
- Hunter.io (100/month free)
- NeverBounce (trial)
- ZeroBounce (100/month free)

**DNS:**
- Cloudflare DNS (free)
- Namecheap (free with domain)

**Authentication Checkers:**
- [Mailgun SPF Check](https://www.mailgun.com/email-tools/spf-record-checker)
- [DKIM Validator](https://dkimvalidator.com/)

### Paid Tools (Recommended)

**Sending:**
- Instantly.ai ($30/mo) — Best overall
- Smartlead ($39/mo) — Good value
- Lemlist ($59/mo) — Multi-channel

**Verification:**
- ZeroBounce ($15/2K)
- NeverBounce ($8/1K)

**Warmup:**
- Instantly (included)
- Lemwarm (included)
- Warmbox.ai (standalone)

**Reputation:**
- Sender Score (free tier)
- Validity (enterprise)
- 250ok (enterprise)

### Learning Resources

- **Mailgun Blog** — Excellent deliverability content
- **Postmark Blog** — Email best practices
- **SendGrid Blog** — Technical deep dives
- **Really Good Emails** — Examples of great emails
- **Really Good Emails Cold** — Cold email examples

---

## FINAL CHECKLIST: ARE YOU READY TO SEND?

Before you send your first cold email campaign, verify:

✅ SPF, DKIM, DMARC all configured and passing
✅ Domain warmed for 14+ days
✅ Email list verified (bounce rate <2%)
✅ Content passed spam check (9/10+)
✅ Sending accounts have profile pictures
✅ Professional email signatures
✅ Google Postmaster set up (if Gmail)
✅ Warmup tool active and showing good reputation
✅ Test email landed in inbox (not spam)

**If you checked all 9 boxes: you're ready to send.**

**If you missed any: fix it first, then send.** Sending with bad setup = permanent reputation damage.

---

## WANT UNLIMITED COLD EMAIL TEMPLATES?

Use our AI Sequence Generator to create unlimited variations:
**outboundsolved.com/ai-sequence**

One payment, unlimited sequences. AI-personalized to your offer and audience.

---

**Created by:** The OutboundSolved team
**Version:** 1.0 (June 2026)
**License:** Personal use
**Support:** team@outboundsolved.com