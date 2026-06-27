#!/bin/bash
# OutboundSolved deploy script (Git + Vercel auto-deploy)
# Usage: ./deploy.sh "Your commit message"  (logs what you deployed)
# Or:    ./deploy.sh                       (auto-generates timestamped log)
#
# Flow: git add → git commit → git push → Vercel auto-deploys in ~30s

set -e  # Exit on any error

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Always run from this script's directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo -e "${BLUE}  OutboundSolved Deploy (Git + Vercel)${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo

# Check git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}ERROR: Git not installed.${NC}"
    echo "Install Git from https://git-scm.com/download/win"
    exit 1
fi

# Check we're in a git repo
if [ ! -d ".git" ]; then
    echo -e "${RED}ERROR: This folder isn't a git repo yet.${NC}"
    echo
    echo "First-time setup required. See DEPLOY-SYSTEM.md for full instructions."
    echo
    echo "Quick version:"
    echo "  cd \"C:/Users/drago/outboundsolved-site\""
    echo "  git init"
    echo "  git add ."
    echo "  git commit -m 'Initial deploy'"
    echo "  git remote add origin https://github.com/YOUR_USERNAME/outboundsolved-site.git"
    echo "  git push -u origin main"
    echo
    echo "Then connect Vercel: vercel.com → Add New Project → Import the repo"
    exit 1
fi

# Get commit message
if [ -z "$1" ]; then
    COMMIT_MSG="Deploy at $(date '+%Y-%m-%d %H:%M:%S')"
else
    COMMIT_MSG="$1"
fi

echo -e "${YELLOW}Commit message:${NC} $COMMIT_MSG"
echo

# Show what's changed
echo -e "${YELLOW}Git status:${NC}"
git status --short || echo "  (clean)"
echo

# Stage all changes
echo -e "${BLUE}->${NC} Staging changes..."
git add .

# Check if there's anything to commit
if git diff --cached --quiet; then
    echo -e "${YELLOW}No changes to deploy.${NC}"
    exit 0
fi

# Show what's about to be committed
echo
echo -e "${YELLOW}Files to commit:${NC}"
git diff --cached --name-status
echo

# Commit
echo -e "${BLUE}->${NC} Committing..."
git commit -m "$COMMIT_MSG"

# Push
echo -e "${BLUE}->${NC} Pushing to GitHub..."
if git push; then
    echo
    echo -e "${GREEN}OK Pushed to GitHub${NC}"
    echo
    echo -e "${YELLOW}Vercel is now auto-deploying (takes ~30 seconds)${NC}"
    echo
    echo -e "  Live URL:  ${GREEN}https://outboundsolved.com${NC}"
    echo -e "  Dashboard: ${BLUE}https://vercel.com/dashboard${NC}"
    echo
    echo -e "${GREEN}════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}  Deploy complete. Site updates in ~30s.${NC}"
    echo -e "${GREEN}════════════════════════════════════════════════${NC}"
else
    echo
    echo -e "${RED}X Push failed${NC}"
    echo
    echo "Common fixes:"
    echo "  - Auth: git config --global credential.helper store, then push again"
    echo "  - Wrong remote: git remote -v (should show your GitHub repo)"
    echo "  - Network: check your internet connection"
    exit 1
fi