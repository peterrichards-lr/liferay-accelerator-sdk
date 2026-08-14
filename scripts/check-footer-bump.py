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

Also exempt: a file whose footer already states the date on which this diff
changed it. When two branches touch the same document on the same day, the
second one has no later date to bump to -- the footer it inherits is already
correct, and demanding a "bump" would mean writing a date that is not the day
the content changed. The comparison uses the authoring date of the last commit
in the diff to touch that file, not wall-clock time, so a long-lived branch
does not start failing just because it was not merged the day it was written.

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

FOOTER_DATES_REGEX = re.compile(
    r"_Last Updated:\s*([\d\-]+)_\s*\|\s*_Last Reviewed:\s*([\d\-]+)_"
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


def footer_dates(head: str, path: str):
    """The (last_updated, last_reviewed) dates in `path` as of `head`."""
    try:
        content = sh("git", "show", f"{head}:{path}")
    except subprocess.CalledProcessError:
        return None
    match = FOOTER_DATES_REGEX.search(content)
    return match.groups() if match else None


def last_change_date(base: str, head: str, path: str):
    """Authoring date (YYYY-MM-DD) of the last commit in the diff to touch `path`."""
    out = sh(
        "git", "log", "-1", "--format=%ad", "--date=short",
        f"{base}..{head}", "--", path,
    ).strip()
    return out or None


def footer_already_states_change_date(base: str, head: str, path: str) -> bool:
    """True when the inherited footer already names the day this diff changed the file."""
    dates = footer_dates(head, path)
    changed_on = last_change_date(base, head, path)
    return bool(dates and changed_on and dates[0] == changed_on)


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
        if not touches_content_without_footer_bump(file_diff(base, head, path)):
            continue
        if footer_already_states_change_date(base, head, path):
            continue
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
