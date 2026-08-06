#!/usr/bin/env python3
"""
Fails if a diff edits a Markdown file's real content without also bumping that
file's `_Last Updated: YYYY-MM-DD_ | _Last Reviewed: YYYY-MM-DD_` footer in the
same diff (see .agents/skills/documentation/SKILL.md).

This exists because .agents/skills/documentation/SKILL.md's "bump the footer on
every touch" mandate has no enforcement: PR #105 edited five skill files'
content without bumping their footers, and nothing caught it (issue #116).
check_docs_review.py only checks staleness by wall-clock age; it can't tell
that *this* diff changed content without a matching footer change.

Newly added files are exempt (their footer is authored fresh). Files whose
diff touches only the footer line (a deliberate "reviewed, no change" bump)
are also fine -- that's the policy working as intended.

Usage:
    python3 scripts/check-footer-bump.py [base_ref] [head_ref]

Defaults: base_ref=origin/main, head_ref=HEAD. Comparison uses `git diff
base...head` (i.e. against the merge base), matching what a PR's diff shows.
"""
import re
import subprocess
import sys

FOOTER_LINE_REGEX = re.compile(
    r"_Last Updated:\s*[\d\-]+_\s*\|\s*_Last Reviewed:\s*[\d\-]+_"
)


def sh(*args):
    return subprocess.run(
        args, capture_output=True, text=True, check=True
    ).stdout


def changed_md_files(base: str, head: str):
    """Markdown files modified (not added/deleted) between base and head."""
    out = sh(
        "git", "diff", "--name-only", "--diff-filter=M",
        f"{base}...{head}", "--", "*.md",
    )
    return [f for f in out.splitlines() if f.strip()]


def file_diff(base: str, head: str, path: str) -> str:
    return sh("git", "diff", f"{base}...{head}", "--", path)


def touches_content_without_footer_bump(diff_text: str) -> bool:
    footer_touched = False
    content_touched = False
    for line in diff_text.splitlines():
        if not (line.startswith("+") or line.startswith("-")):
            continue
        if line.startswith("+++") or line.startswith("---"):
            continue  # diff file-header lines, not content
        code = line[1:].strip()
        if not code:
            continue
        if FOOTER_LINE_REGEX.search(code):
            footer_touched = True
        else:
            content_touched = True
    return content_touched and not footer_touched


def main():
    base = sys.argv[1] if len(sys.argv) > 1 else "origin/main"
    head = sys.argv[2] if len(sys.argv) > 2 else "HEAD"

    violations = []
    for path in changed_md_files(base, head):
        if touches_content_without_footer_bump(file_diff(base, head, path)):
            violations.append(path)

    if violations:
        print(
            "The following Markdown files were edited without bumping their\n"
            "`_Last Updated_ | _Last Reviewed_` footer in the same diff:\n",
            file=sys.stderr,
        )
        for path in violations:
            print(f"  - {path}", file=sys.stderr)
        print(
            "\nSee .agents/skills/documentation/SKILL.md. If the edit truly "
            "doesn't\nneed a content-footer bump, touch the footer's date "
            "anyway (a 'reviewed,\nno change' bump is valid policy).",
            file=sys.stderr,
        )
        sys.exit(1)

    print("All changed Markdown files bumped their review footer where needed.")


if __name__ == "__main__":
    main()
