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

- make source control changes (commits, reverts, rebases, etc.) autonomously.
- bypass verification gates.

The AI agent **should**:

- perform dry code analysis.
- reason about control flow, concurrency, idempotency, and failure paths.
- surface likely bugs or race conditions early.

- **No Assumptions (Anti-Hallucination Rule)**: Any technical statement, explanation, or conclusion you make MUST be strictly based on actual, referenceable code or documentation in this repository. You are expressly forbidden from making blind assumptions about how systems (like edge nodes or routing logic) behave without verifying them via search, reading the code, or consulting `AGENTS.md`/`GEMINI.md`. When the resources are available to you, use them before you speak.

## 3. Native Identifier Strategy

- **Eliminate `uuid` Dependency**: To reduce security surface area and avoid CommonJS/ESM compatibility friction, **DO NOT** use the `uuid` npm package in the microservice or SDK.
- **Authority**: Use Node.js's built-in **`crypto.randomUUID()`** for all random identifier generation (ERCs, correlation IDs, task IDs).

<!-- markdownlint-disable MD049 -->

---

_Last Updated: 2026-07-20_ | _Last Reviewed: 2026-07-20_
