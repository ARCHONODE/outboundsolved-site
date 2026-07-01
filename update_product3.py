import re
from pathlib import Path

path = Path("C:/Users/drago/outboundsolved-site/hub.html")
content = path.read_text(encoding="utf-8")

# Use regex to match the 100 Cold Emails card (more flexible)
# Match from "<div class="product-card coming-soon">" through the closing </div> of that card
pattern = re.compile(
    r'<div class="product-card coming-soon">\s*'
    r'<div class="product-image"[^>]*>📨</div>\s*'
    r'<span class="badge badge-soon">Coming soon</span>\s*'
    r'<h3>100 Cold Emails That Got Replies</h3>.*?</div>\s*</div>',
    re.DOTALL
)

new_card = '''<div class="product-card">
        <div class="product-image" style="margin-bottom:var(--sp-4)">📨</div>
        <span class="badge badge-live">Live</span>
        <h3>100 Cold Emails That Got Replies</h3>
        <p class="desc">Real cold emails (anonymized) that booked B2B meetings. 13 categories, subject line patterns, every email analyzed.</p>
        <div class="price">$19 <small>one-time</small></div>
        <a href="https://buy.stripe.com/test_eVq8wQ154fGP6S4evl6oo02" class="btn">Get this tool →</a>
      </div>'''

match = pattern.search(content)
if match:
    content = content[:match.start()] + new_card + content[match.end():]
    path.write_text(content, encoding="utf-8")
    print("✓ Product 3 card updated to Live")
    print(f"  Replaced {len(match.group())} chars with {len(new_card)} chars")
else:
    print("✗ Pattern not found")
    if "100 Cold Emails That Got Replies" in content:
        idx = content.find("100 Cold Emails That Got Replies")
        print(f"But '100 Cold Emails That Got Replies' found at index {idx}")