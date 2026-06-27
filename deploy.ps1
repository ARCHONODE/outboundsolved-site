# OutboundSolved deploy script (Git + Vercel auto-deploy, PowerShell)
# Usage: .\deploy.ps1 "Your commit message"
# Or:    .\deploy.ps1  (auto-generates timestamped log)

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptDir

Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  OutboundSolved Deploy (Git + Vercel)" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Check git
$git = Get-Command git -ErrorAction SilentlyContinue
if (-not $git) {
    Write-Host "ERROR: Git not installed." -ForegroundColor Red
    Write-Host "Install from https://git-scm.com/download/win"
    exit 1
}

# Check repo
if (-not (Test-Path ".git")) {
    Write-Host "ERROR: Not a git repo. Run setup first (see DEPLOY-SYSTEM.md)." -ForegroundColor Red
    exit 1
}

# Get message
if ($args.Count -eq 0) {
    $Msg = "Deploy at $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
} else {
    $Msg = $args[0]
}

Write-Host "Commit message: $Msg" -ForegroundColor Yellow
Write-Host ""

Write-Host "Git status:" -ForegroundColor Yellow
git status --short
Write-Host ""

Write-Host "-> Staging changes..." -ForegroundColor Cyan
git add .

# Check if there's anything to commit
$diff = git diff --cached
if ([string]::IsNullOrWhiteSpace($diff)) {
    Write-Host "No changes to deploy." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "Files to commit:" -ForegroundColor Yellow
git diff --cached --name-status
Write-Host ""

Write-Host "-> Committing..." -ForegroundColor Cyan
git commit -m "$Msg"

Write-Host "-> Pushing to GitHub..." -ForegroundColor Cyan
git push

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "OK Pushed to GitHub" -ForegroundColor Green
    Write-Host ""
    Write-Host "Vercel is now auto-deploying (takes ~30 seconds)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  Live URL:  https://outboundsolved.com" -ForegroundColor Green
    Write-Host "  Dashboard: https://vercel.com/dashboard" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "=================================================" -ForegroundColor Green
    Write-Host "  Deploy complete. Site updates in ~30s." -ForegroundColor Green
    Write-Host "=================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "X Push failed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common fixes:"
    Write-Host "  - Auth: git config --global credential.helper store, then push again"
    Write-Host "  - Wrong remote: git remote -v (should show your GitHub repo)"
    exit 1
}