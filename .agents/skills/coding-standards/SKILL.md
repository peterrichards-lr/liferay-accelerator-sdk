---
name: coding-standards
description: Activate this skill when writing or refactoring microservice and SDK javascript/typescript source files.
---

# Coding & Clean Code Standards

All code contributions must follow these clean coding standards:

## 1. Code Style & Self-Documentation

- **No Comments**: All code must be **self-documenting** and contain **no comments**.
- **Zero Warning Mandate**: The codebase must be free of lint warnings and formatting errors.
- **Intentional Omissions**: Use the **`_` (underscore)** prefix for any intentionally unused parameters, variables, or caught errors (e.g., `const { unused: _unused } = obj`, `catch (_err) {}`).

## 2. Agent Constraints & Verification

The AI agent must **not**:

- **Source Control Changes**: Before making any source control changes (commits, reverts, rebases), you MUST first execute the `write_to_file` tool to draft an implementation plan, request user approval by setting `RequestFeedback` to true, and END your turn. You are FORBIDDEN from executing these `git` commands until the user explicitly approves the plan.
- **Pull Request Creation**: Before creating a Pull Request, you MUST execute `run_command` to run `git fetch origin` and verify your feature branch is up to date with the remote `main` branch, and END your turn. You are FORBIDDEN from executing `gh pr create` until you have verified the branch is up to date and rebased if necessary.
- bypass verification gates.

The AI agent **should**:

- perform dry code analysis.
- reason about control flow, concurrency, idempotency, and failure paths.
- surface likely bugs or race conditions early.

- **No Assumptions (Anti-Hallucination Rule)**: Before generating any technical statement, explanation, or conclusion about how systems (like edge nodes or routing logic) behave, you MUST first explicitly state your intent to verify the codebase, execute `grep_search`, `view_file`, or `run_command` to fetch the relevant source code or documentation, and then END your turn. You are FORBIDDEN from formulating your answer until the subsequent turn, after the required context is loaded.

## 3. Native Identifier Strategy

- **Eliminate `uuid` Dependency**: To reduce security surface area and avoid CommonJS/ESM compatibility friction, **DO NOT** use the `uuid` npm package in the microservice or SDK.
- **Authority**: Use Node.js's built-in **`crypto.randomUUID()`** for all random identifier generation (ERCs, correlation IDs, task IDs).

<!-- markdownlint-disable MD049 -->

---

_Last Updated: 2026-07-20_ | _Last Reviewed: 2026-07-20_
