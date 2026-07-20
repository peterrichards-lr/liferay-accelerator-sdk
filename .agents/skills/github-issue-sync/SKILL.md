---
name: github-issue-sync
description: Activate this skill when planning features, updating checklist tasks, or closing resolved issues using the automated JSON issue sync workflow.
---

# GitHub Issue Sync Workflow Rules

When planning or implementing new features, you must use the automated JSON-driven issue sync tool located at `scripts/gh-issue-sync.cjs` to synchronize your task checklist with the GitHub issue tracker.

## 1. Tool Setup & Location

- Script: `scripts/gh-issue-sync.cjs` (executable Node.js script)
- Sample Config: `scripts/issues.sample.json`

## 2. Issue Tracking Workflow

Before writing code for any feature or logic change:

1. **Plan & Draft**: Create a temporary JSON file (e.g., `scripts/feature-xyz-plan.json`) containing the Epic description and target sub-issues. Follow the schema defined in `scripts/issues.sample.json`.
2. **Dry Run**: Preview the CLI commands that will run:
   ```bash
   node scripts/gh-issue-sync.cjs scripts/feature-xyz-plan.json --dry-run
   ```
3. **Apply & Link**: Generate the Epic and sub-issues on GitHub:
   ```bash
   node scripts/gh-issue-sync.cjs scripts/feature-xyz-plan.json
   ```
   _Note: The script automatically links all sub-issues to the parent Epic._

## 3. Resolving and Closing Tasks

As you complete individual sub-issues:

1. Update the target JSON file, changing the sub-issue's `"completed"` property to `true`.
2. Execute the sync utility again:
   ```bash
   node scripts/gh-issue-sync.cjs scripts/feature-xyz-plan.json
   ```
   _The utility will automatically detect the completed state, post a reference comment with the current git commit hash, and close the issue on GitHub._

## 4. Technical Debt Tracking

- **Detect & Record**: If you identify code smells, over-complexity, or potential refactoring opportunities during development, you must raise a GitHub issue with the `tech debt` label.
- **Immediate Resolution**: You do not need to resolve the technical debt immediately. However, if it can be resolved quickly without significant deviation or effort from the primary task, you may do so. The primary requirement is to ensure it is recorded.

<!-- markdownlint-disable MD049 -->

---

_Last Updated: 2026-07-20_ | _Last Reviewed: 2026-07-20_
