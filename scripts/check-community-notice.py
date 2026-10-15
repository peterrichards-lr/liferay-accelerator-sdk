#!/usr/bin/env python3
"""
Fails if the "not an official Liferay product" notice is missing from a page
that must carry it, or has drifted below that page's first `##` heading.

A reader decides whether to depend on a package in the first screen. This
repository is named for Liferay and describes itself as a Liferay DXP
integration SDK, so the Liferay name carries an implication of official support
it cannot honour. "Not official, not supported" has to arrive before the
decision it bears on, which means above the first section heading rather than
anywhere in the file.

Position is asserted as well as presence, because a notice that slides below
the fold during an unrelated edit is a notice nobody reads, and nothing else
here would notice it moving.

Matches the wording agreed in liferay-ai-commerce-accelerator#1302, so the two
repositories say the same thing rather than two similar things. The match is
case-insensitive and deliberately covers only the load-bearing clause, so the
sentence around it can be reworded without this becoming a style gate.

Usage:
    python3 scripts/check-community-notice.py
"""
import re
import sys
from pathlib import Path

NOTICE = re.compile(
    r"not an official Liferay product and not covered by Liferay Support",
    re.IGNORECASE,
)

PAGES = ["README.md"]


def main():
    root = Path(__file__).resolve().parent.parent
    failures = []

    for page in PAGES:
        path = root / page
        if not path.exists():
            failures.append((page, "page does not exist"))
            continue

        body = path.read_text(encoding="utf-8")
        match = NOTICE.search(body)
        if not match:
            failures.append(
                (page, 'no "not an official Liferay product" notice')
            )
            continue

        # The first `##` is where the document stops introducing itself.
        heading = re.search(r"^##\s", body, re.MULTILINE)
        if heading and match.start() > heading.start():
            failures.append(
                (page, 'notice appears after the first "##" heading')
            )

    if failures:
        print("Community-project notice check failed:")
        for page, reason in failures:
            print(f"  - {page}: {reason}")
        print(
            "\nThe notice belongs above the first section heading. "
            "See the About this project section of README.md."
        )
        sys.exit(1)

    print(f"Community-project notice present and above the fold "
          f"({len(PAGES)} page(s) checked).")


if __name__ == "__main__":
    main()
