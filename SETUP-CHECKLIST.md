# GitHub + Vercel Setup — Just The Commands You Need

Copy/paste each block into Git Bash. Do them in order. Don't paste your actual values into chat — use this as a reference.

---

## BLOCK 1: Tell git who you are (one-time)

Open Git Bash. Run these **with YOUR info** (not mine, not chat's):

```bash
git config --global user.name "Your Name"
git config --global user.email "your-github-email@example.com"
git config --global credential.helper store
```

**Important:** the email must match your GitHub account email. Otherwise commits won't link to your profile.

---

## BLOCK 2: Initialize the local repo (one-time, already mostly done)

I already ran `git init` for you. You just need to do the commit + push. Run from the site folder:

```bash
cd "C:/Users/drago/outboundsolved-site"
git branch -M main
git commit -m "Initial deploy: outboundsolved landing page"
```

You should see `8 files changed` and a commit hash. The branch rename to `main` is important — that's what GitHub uses by default.

If commit fails saying "Author identity unknown" — go back to BLOCK 1, you missed it.

---

## BLOCK 3: Create the GitHub repo (5 min, in your browser)

1. Sign in to https://github.com (or sign up if you don't have an account)
2. Go to https://github.com/new
3. **Repository name:** `outboundsolved-site`
4. **Description:** "OutboundSolved landing page"
5. **Public** selected (recommended — free private repos have limits)
6. **DO NOT** check any "Initialize with" boxes
7. Click **Create repository**
8. You'll see a "Quick setup" page — leave it open, you'll need the URL it gives you

---

## BLOCK 4: Generate a GitHub Personal Access Token (in your browser)

1. Go to https://github.com/settings/tokens/new
2. **Note:** `outboundsolved-deploy`
3. **Expiration:** 90 days (you'll get email reminders)
4. **Scopes:** Check **`repo`** (the only one)
5. Click **Generate token**
6. **COPY THE TOKEN** — looks like `ghp_xx...xxxx`. You will NOT see it again.

⚠️ Paste the token somewhere safe temporarily (1Password, Bitwarden, even a sticky note on your desk). You'll paste it into Git Bash ONCE in BLOCK 5.

---

## BLOCK 5: Push to GitHub (in Git Bash)

Replace `YOUR_USERNAME` with your actual GitHub username. The URL must match what GitHub showed you in BLOCK 3.

```bash
cd "C:/Users/drago/outboundsolved-site"

# Add the remote (use the URL GitHub gave you)
git remote add origin https://github.com/YOUR_USERNAME/outboundsolved-site.git

# Push
git push -u origin main
```

When prompted:
- **Username:** your GitHub username
- **Password:** paste the `ghp_xx...xxxx` token (NOT your GitHub password)

If push succeeds, refresh your GitHub repo page in the browser — you should see all 8 files there.

If push fails with "Authentication failed":
- The token was copied wrong. Generate a new one in BLOCK 4 and try again.

---

## BLOCK 6: Connect Vercel (in your browser)

1. Go to https://vercel.com/signup
2. Sign up with the **same email** as your GitHub account
3. After verifying email, click **Add New Project**
4. Find `outboundsolved-site` → click **Import**
   - If you don't see it, click "Adjust GitHub App Permissions" and grant Vercel access
5. **Configure Project:**
   - Project Name: `outboundsolved-site`
   - Framework Preset: **Other**
   - Root Directory: `./`
   - Build Command: (empty)
   - Output Directory: `./`
6. Click **Deploy**
7. Wait ~30 seconds. First build completes.
8. You now have `https://outboundsolved-site.vercel.app` live.

---

## BLOCK 7: Connect custom domain (in browser + Cloudflare)

1. Vercel dashboard → `outboundsolved-site` → **Settings** → **Domains**
2. Type `outboundsolved.com` → click **Add**
3. Vercel will tell you what DNS record to add. Usually:
   - Type: `A` (preferred) or `CNAME`
   - For A record: Name `@`, Value `76.76.21.21`
   - For CNAME: Name `@`, Value `cname.vercel-dns.com`
4. Go to Cloudflare dashboard → https://dash.cloudflare.com → click `outboundsolved.com`
5. Click **DNS** → **Records** → **Add record**
6. Add the exact record Vercel gave you:
   - Type: `A` (or CNAME)
   - Name: `@`
   - Target: the value from Vercel
   - Proxy status: **DNS only** (GRAY cloud, not orange)
7. Click **Save** in Cloudflare
8. Back in Vercel → click **Verify** next to your domain
9. Wait 1-5 minutes
10. Done. `https://outboundsolved.com` now serves from Vercel.

---

## TESTING THE WORKFLOW

After all blocks are done, test it:

```bash
cd "C:/Users/drago/outboundsolved-site"

# Make a small change to index.html (just edit anything, save)

# Deploy it
./deploy.sh "Test deploy"

# Watch:
# 1. The script shows git status, adds, commits, pushes
# 2. Vercel dashboard shows new deployment in ~10 seconds
# 3. https://outboundsolved.com updates within ~30 seconds
# 4. Hard-refresh (Ctrl+Shift+R) to see the change
```

If you see the change live — the workflow is working. You're done with setup.

---

## TROUBLESHOOTING SHORTCUTS

**"Author identity unknown"** → Go back to BLOCK 1.

**"Authentication failed"** → Generate new token in BLOCK 4, paste it carefully.

**"Repository not found"** → Check the URL in BLOCK 5. Must match GitHub exactly. Case-sensitive.

**"Build failed" in Vercel** → Check Vercel dashboard → Deployments → click the failed build → see the error log. Most common cause is a missing closing HTML tag.

**Site didn't update after push** → Wait 60 seconds. Hard-refresh browser (Ctrl+Shift+R). Check Vercel dashboard for new deployment.

**Want to rollback** → Vercel dashboard → Deployments → click old deploy → "Promote to Production"

---

## TIME ESTIMATE

- BLOCK 1 (git config): 1 min
- BLOCK 2 (commit): 1 min
- BLOCK 3 (GitHub repo): 2 min
- BLOCK 4 (token): 2 min
- BLOCK 5 (push): 2 min
- BLOCK 6 (Vercel): 3 min
- BLOCK 7 (domain): 5 min

**Total: ~15 minutes one-time. Then every future deploy is 1 command.**