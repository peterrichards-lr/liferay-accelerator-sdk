#!/usr/bin/env python3
import os
import re
from pathlib import Path
from datetime import datetime

IGNORE_DIRS = {'.git', 'node_modules', '.venv', '.smoke_venv', 'coverage'}
FOOTER_PATTERN = re.compile(
    r'<!-- markdownlint-disable MD049 -->\s*---\s*\*Last Updated:\s*[\d\-]+\*\s*\|\s*\*Last Reviewed:\s*[\d\-]+\*'
)

def should_ignore(path: Path) -> bool:
    for part in path.parts:
        if part in IGNORE_DIRS:
            return True
    return False

def append_timestamps():
    today_str = datetime.today().strftime('%Y-%m-%d')
    footer_text = f"\n\n<!-- markdownlint-disable MD049 -->\n---\n*Last Updated: {today_str}* | *Last Reviewed: {today_str}*\n"
    
    root_dir = Path(__file__).parent.parent.resolve()
    print(f"Scanning for markdown files in {root_dir}...")
    
    count = 0
    for md_path in root_dir.rglob('*.md'):
        if should_ignore(md_path):
            continue
            
        content = md_path.read_text(encoding='utf-8')
        
        if not FOOTER_PATTERN.search(content):
            print(f"Appending footer to {md_path.relative_to(root_dir)}")
            # Normalize trailing whitespace before appending
            content = content.rstrip()
            md_path.write_text(content + footer_text, encoding='utf-8')
            count += 1
            
    print(f"Done. Appended footers to {count} markdown files.")

if __name__ == '__main__':
    append_timestamps()
