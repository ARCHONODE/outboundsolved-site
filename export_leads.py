#!/usr/bin/env python3
"""
Export Captured Leads from Google Sheets
Pulls emails from the OutboundSolved Leads Google Sheet and exports to CSV
for use in outreach, sending the playbook, etc.

ONE-TIME SETUP:
1. Get a Google Sheets API key (free):
   - Go to https://console.cloud.google.com/
   - Create a new project (or use existing)
   - Enable "Google Sheets API" (search in the API library)
   - Go to Credentials → Create Credentials → API Key
   - Copy the key
   - (Optional but recommended) Restrict the key to "Google Sheets API" only

2. Get your Sheet ID:
   - Open your "OutboundSolved Leads" Sheet
   - Look at the URL: https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   - Copy the SHEET_ID_HERE part

3. Set environment variable:
   - On Windows Git Bash:
     echo 'export GOOGLE_SHEETS_API_KEY=*** ~/.bashrc
     echo 'export OUTBOUNDSOLVED_SHEET_ID=*** ~/.bashrc
     source ~/.bashrc

4. Make your Sheet readable by the API:
   - Open the Sheet
   - Click Share (top-right)
   - Change access to "Anyone with the link" → Viewer
   - (The API key approach only works for public-readable Sheets.
    For private Sheets, you'd need OAuth — overkill for now.)

Usage:
  python scripts/export_leads.py --output data/leads-from-landing-page.csv
  python scripts/export_leads.py --output data/leads.csv --since 2026-06-01
"""

import argparse
import csv
import os
import sys
import urllib.request
import urllib.parse
from datetime import datetime
from pathlib import Path


GOOGLE_SHEETS_API_KEY = os.environ.get("GOOGLE_SHEETS_API_KEY", "")
SHEET_ID = os.environ.get("OUTBOUNDSOLVED_SHEET_ID", "")


def fetch_sheet_rows(sheet_id, api_key):
    """Fetch all rows from the Sheet via Google Sheets API v4."""
    if not api_key or not sheet_id:
        return None, "Missing API key or Sheet ID"

    url = (
        f"https://sheets.googleapis.com/v4/spreadsheets/{sheet_id}/values/Sheet1!A:E"
        f"?key={api_key}"
    )
    req = urllib.request.Request(url, headers={"User-Agent": "outboundsolved-leads-exporter/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            data = json.loads(r.read().decode("utf-8"))
            return data.get("values", []), None
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="ignore")
        if e.code == 403:
            return None, f"403 Forbidden. Check: (1) Sheet is shared as 'Anyone with link' Viewer, (2) Sheets API is enabled in Google Cloud, (3) API key is correct. Google response: {body[:200]}"
        elif e.code == 404:
            return None, f"404 Not Found. Check Sheet ID is correct: {sheet_id}"
        return None, f"HTTP {e.code}: {body[:200]}"
    except Exception as e:
        return None, str(e)


def main():
    parser = argparse.ArgumentParser(description="Export leads from OutboundSolved Google Sheet")
    parser.add_argument("--output", required=True, help="Output CSV path")
    parser.add_argument("--since", help="Only include rows after this date (YYYY-MM-DD)")
    parser.add_argument("--source", help="Only include rows from this source (e.g., 'landing-page')")
    args = parser.parse_args()

    if not GOOGLE_SHEETS_API_KEY or not SHEET_ID:
        print("ERROR: Missing env vars. Set:")
        print("  export GOOGLE_SHEETS_API_KEY=*** ~  export OUTBOUNDSOLVED_SHEET_ID=*** ~/.bashrc")
        print("See EMAIL-CAPTURE-SETUP.md for details.")
        sys.exit(1)

    print(f"Fetching rows from Sheet {SHEET_ID[:10]}...")
    rows, error = fetch_sheet_rows(SHEET_ID, GOOGLE_SHEETS_API_KEY)
    if error:
        print(f"ERROR: {error}")
        sys.exit(1)

    if not rows:
        print("No rows found (Sheet is empty). Submit a test email first.")
        sys.exit(0)

    # First row is headers
    headers = rows[0]
    print(f"  Headers: {headers}")
    print(f"  Total rows: {len(rows) - 1}")

    # Parse data rows
    leads = []
    for row in rows[1:]:
        # Pad short rows (e.g., missing source/UA/referrer)
        while len(row) < len(headers):
            row.append("")
        timestamp, email, source, ua, referrer = row[:5]
        leads.append({
            "timestamp": timestamp,
            "email": email,
            "source": source,
            "user_agent": ua,
            "referrer": referrer,
        })

    # Apply filters
    if args.since:
        try:
            since_date = datetime.fromisoformat(args.since)
            before = len(leads)
            leads = [l for l in leads if l["timestamp"] and datetime.fromisoformat(l["timestamp"].replace("Z", "+00:00")).replace(tzinfo=None) >= since_date]
            print(f"  After --since {args.since}: {len(leads)} (filtered out {before - len(leads)})")
        except ValueError:
            print(f"WARNING: --since value '{args.since}' is not a valid YYYY-MM-DD date. Ignoring.")

    if args.source:
        before = len(leads)
        leads = [l for l in leads if l["source"] == args.source]
        print(f"  After --source {args.source}: {len(leads)} (filtered out {before - len(leads)})")

    if not leads:
        print("No leads match filters. Nothing to export.")
        sys.exit(0)

    # Write CSV
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["timestamp", "email", "source", "user_agent", "referrer"])
        writer.writeheader()
        writer.writerows(leads)

    print()
    print(f"✓ Exported {len(leads)} leads to {output_path}")
    print()
    print("FIRST 5 LEADS:")
    for lead in leads[:5]:
        print(f"  {lead['timestamp']}  {lead['email']:40s}  {lead['source']}")
    if len(leads) > 5:
        print(f"  ... and {len(leads) - 5} more")


if __name__ == "__main__":
    main()