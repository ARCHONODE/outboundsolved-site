# Deploy System — GitHub + Vercel Auto-Deploy

**Goal:** Edit a file → run `./deploy.sh "what changed"` → live site updates in ~30 seconds. No dashboard. No drag-and-drop.

---

## Architecture

```
You edit index.html (or any file)
   ↓
Run: ./deploy.sh "what changed"
   ↓
Script: git add → git commit → git push
   ↓
GitHub: receives the push
   ↓
Vercel: auto-detects push, builds + deploys in ~30 seconds
   ↓
outboundsolved.com: shows your new content
```

---

## ONE-TIME SETUP (15 minutes)

### STEP 1: Create a GitHub account (2 min, skip if you have one)

1. Go to https://github.com/signup
2. Sign up with your email
3. Verify your email

### STEP 2: Create the repo (1 min)

1. Go to https://github.com/new
2. **Repository name:** `outboundsolved-site`
3. **Description:** "OutboundSolved landing page"
4. **Visibility:** Public (recommended for free private repo limits)
5. **DO NOT** check "Add README" / "Add .gitignore" — we provide our own
6. Click **Create repository**

### STEP 3: Generate a Personal Access Token (2 min)

This lets the deploy script push to GitHub without typing your password every time.

1. Go to https://github.com/settings/tokens/new
2. **Note:** `outboundsolved-deploy`
3. **Expiration:** 90 days (you'll get a reminder to regenerate)
4. **Scopes:** Check **`repo`** (the only one needed)
5. Click **Generate token**
6. **COPY THE TOKEN IMMEDIATELY** — you won't see it again. Looks like: `ghp_xx...xxxx`

### STEP 4: Configure git globally (1 min)

In Git Bash:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-github-email@example.com"
git config --global credential.helper store
```

`credential.helper store` saves your GitHub token in Windows Credential Manager. You'll only type it once.

### STEP 5: Initialize the local repo and push (3 min)

Navigate to the site folder and run these commands **one at a time**:

```bash
cd "C:/Users/drago/outboundsolved-site"

# Initialize as a git repo
git init

# Add all files
git add .

# Make the first commit
git commit -m "Initial deploy: outboundsolved landing page"

# Add the GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/outboundsolved-site.git

# Rename branch to main (matches GitHub's default)
git branch -M main

# Push to GitHub (you'll be prompted for username + token)
git push -u origin main
```

When prompted:
- **Username:** your GitHub username
- **Password:** paste the `ghp_xx...xxxx` token (NOT your GitHub password)

After this, the token is saved in Windows Credential Manager. Future pushes won't ask.

### STEP 6: Connect Vercel to the GitHub repo (3 min)

1. Go to https://vercel.com/signup
2. Sign up with the **same email** you used for GitHub (or use "Continue with GitHub")
3. Once in dashboard, click **Add New Project**
4. Find `outboundsolved-site` in the list → click **Import**
   - If you don't see it, click "Adjust GitHub App Permissions" and grant Vercel access
5. **Configure Project:**
   - Project Name: `outboundsolved-site`
   - Framework Preset: **Other** (it's just static HTML)
   - Root Directory: `./`
   - Build Command: (leave empty)
   - Output Directory: `./`
6. Click **Deploy**
7. Wait ~30 seconds. First deploy happens.
8. Vercel gives you a URL like `outboundsolved-site.vercel.app`

### STEP 7: Connect custom domain (5 min, first time only)

1. In Vercel dashboard, click `outboundsolved-site` project → **Settings** → **Domains**
2. Type `outboundsolved.com` → click **Add**
3. Vercel tells you what DNS records to add — usually:
   - Type: `A` or `CNAME`
   - Name: `@`
   - Value: Vercel's value (typically `76.76.21.21` for A record, or `cname.vercel-dns.com` for CNAME)
4. Go to Cloudflare dashboard → **DNS** → **Records** → **Add record**:
   - Use the exact type/name/value Vercel gave you
   - Proxy status: **DNS only** (gray cloud, not orange)
5. Back in Vercel → click **Verify** next to your domain
6. Wait 1-5 minutes for DNS to propagate
7. Vercel auto-provisions SSL → `https://outboundsolved.com` works

---

## EVERY-DAY WORKFLOW (after setup)

### To deploy updates:

```bash
cd "C:/Users/drago/outboundsolved-site"

# 1. Edit your files (any text editor)

# 2. Run the deploy script with a commit message
./deploy.sh "Updated hero headline"

# Done. Vercel auto-detects the push, rebuilds, and deploys in ~30 seconds.
```

### Or skip the wrapper:

```bash
vercel --prod
```

Wait — that was for Vercel CLI. For Git workflow, just:

```bash
git add .
git commit -m "what changed"
git push
```

The `./deploy.sh` script does all 3 steps in one command.

### To check deployment status:

1. Go to https://vercel.com/dashboard
2. Click `outboundsolved-site`
3. See the latest deployment (green = success, red = failed)
4. Click "Visit" to open the live URL

---

## THE DEPLOY SCRIPT

`deploy.sh` (bash) and `deploy.ps1` (PowerShell) both do the same thing:

1. Check we're in a git repo
2. Show what's changed (`git status`)
3. Stage all changes (`git add .`)
4. Show what's about to be committed
5. Commit with your message
6. Push to GitHub (`git push`)
7. Print success message + link to dashboard

If anything fails, it exits with a clear error message.

---

## WHY GITHUB + VERCEL IS THE RIGHT LONG-TERM MOVE

| Aspect | Vercel CLI Only | GitHub + Vercel ⭐ |
|---|---|---|
| **Setup time** | 10 min | 15 min |
| **Accounts needed** | 1 (Vercel) | 2 (GitHub + Vercel) |
| **Version history** | No | **Yes (full git history)** |
| **Rollback to old version** | Dashboard only | `git revert` + push |
| **Preview URLs per PR** | No | **Yes (auto)** |
| **Collaborators** | Hard | Easy (Git permissions) |
| **Open-source friendly** | No | **Yes (public repo)** |

The GitHub version history alone is worth the extra 5 minutes of setup. Six months from now, you'll be glad you can see exactly what changed and when.

---

## TROUBLESHOOTING

### "Permission denied" on git push
- Your token expired or wasn't stored correctly
- Re-run: `git config --global credential.helper store`
- Push again, paste new token

### "fatal: not a git repository"
- You're in the wrong directory
- Run `cd "C:/Users/drago/outboundsolved-site"` first

### Vercel says "Build failed"
- Check build logs in Vercel dashboard
- Most common: a syntax error in your HTML (missing closing tag, bad quote)
- Fix locally, push again

### Site didn't update after push
- Wait 30-60 seconds (Vercel can be slow on first deploy)
- Check Vercel dashboard → Deployments → see if a new deploy was triggered
- Hard-refresh browser (Ctrl+Shift+R) to bypass cache

### Want to revert a bad deploy
**Option A: From Vercel dashboard**
- Deployments → click an older deploy → "Promote to Production"

**Option B: From git (recommended)**
```bash
cd "C:/Users/drago/outboundsolved-site"
git revert HEAD
git push
```

This creates a new commit that undoes the last one. Clean history.

### Want to preview a change before going live
This is the killer feature of GitHub + Vercel:
1. Create a new branch: `git checkout -b test-pricing-change`
2. Make your changes
3. Push the branch: `git push -u origin test-pricing-change`
4. Vercel auto-creates a preview URL (e.g., `outboundsolved-site-git-test-pricing-change-username.vercel.app`)
5. Share the preview URL with anyone for feedback
6. When ready, merge to main → it goes live

This is a massive advantage over drag-and-drop deploys.

---

## COST: $0

- GitHub: free for public repos, free for private repos too (unlimited)
- Vercel free tier: 100GB bandwidth/month, 6,000 build minutes/month
- Git: free, already installed

Total infrastructure cost: **$10/yr** for the domain.

---

## WHAT'S NEXT

Once setup is done:

1. **Edit `index.html`** — try changing the hero headline
2. **Run `./deploy.sh "test deploy"`** — site updates in 30 sec
3. **Verify at outboundsolved.com** — see your change live
4. **Done!** You have a real deploy workflow

Then we can move to:
- Setting up the email capture (Apps Script deploy)
- Building your first prospect list
- Or whatever's most valuable next