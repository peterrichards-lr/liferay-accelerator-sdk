# Accelerator SDK - Canonical Agent Context

This file is the single source of truth for agent rules in this repository, for
every AI provider. It is a router: it holds no rules of its own beyond the
pointers below.

Provider discovery files (`gemini.md`, `CLAUDE.md`) exist only so each tool finds
this file, and redirect straight back here. Do not duplicate context into them.

## 1. Project Identity

- **Repository**: `liferay-accelerator-sdk` - hardened SDK for Liferay Batch,
  Workflow and API orchestration, consumed as a git dependency pinned to a tag.
- **Toolchain**: Node `20.x || >=22`, yarn 1.x. `yarn test`, `yarn lint`,
  `yarn validate` (GraphQL and REST drift gates) must all pass before a PR.
- **Publishing**: pack and publish with **npm**, never `yarn pack` - see the
  README, and `package.json`'s `files` allowlist.

## 2. Skills Routing

Agent rules are modular skill files under `.agents/skills/`. Load the specific
skill for the task at hand rather than reading everything up front.

| Skill Name                                                                                 | Path                                                                                                           | Trigger Condition / When to Load                                                | Description                                                                              |
| :----------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------- |
| **[github-issue-sync](file:///.agents/skills/github-issue-sync/SKILL.md)**                 | [.agents/skills/github-issue-sync/SKILL.md](file:///.agents/skills/github-issue-sync/SKILL.md)                 | When starting features, editing task JSONs, or closing issues.                  | Manages issue creation and status synchronization with the GitHub issue tracker.         |
| **[unit-testing](file:///.agents/skills/unit-testing/SKILL.md)**                           | [.agents/skills/unit-testing/SKILL.md](file:///.agents/skills/unit-testing/SKILL.md)                           | When writing/refactoring logic or running verification steps.                   | Governs test-driven development, Vitest coverage checking, and deployment hard-gates.    |
| **[documentation](file:///.agents/skills/documentation/SKILL.md)**                         | [.agents/skills/documentation/SKILL.md](file:///.agents/skills/documentation/SKILL.md)                         | After implementing any code changes.                                            | Details active documentation review, creation, and timestamp hygiene rules.              |
| **[coding-standards](file:///.agents/skills/coding-standards/SKILL.md)**                   | [.agents/skills/coding-standards/SKILL.md](file:///.agents/skills/coding-standards/SKILL.md)                   | When writing or refactoring microservice/SDK source code.                       | Defines self-documenting code style, dry-run profiling, and native identifier practices. |
| **[multi-agent-orchestration](file:///.agents/skills/multi-agent-orchestration/SKILL.md)** | [.agents/skills/multi-agent-orchestration/SKILL.md](file:///.agents/skills/multi-agent-orchestration/SKILL.md) | When delegating tasks or defining subagents.                                    | Orchestrates parallel workflows and delegates to specialized subagents.                  |
| **[tool-use-react](file:///.agents/skills/tool-use-react/SKILL.md)**                       | [.agents/skills/tool-use-react/SKILL.md](file:///.agents/skills/tool-use-react/SKILL.md)                       | When making tool calls, interacting with the terminal, or invoking GitHub APIs. | Enforces ReAct reasoning patterns and strict GitHub CLI usage boundaries.                |
| **[reflection-and-planning](file:///.agents/skills/reflection-and-planning/SKILL.md)**     | [.agents/skills/reflection-and-planning/SKILL.md](file:///.agents/skills/reflection-and-planning/SKILL.md)     | When beginning complex tasks or modifying codebase files.                       | Enforces mandatory implementation plans and predictive failure analysis.                 |
| **[human-in-the-loop](file:///.agents/skills/human-in-the-loop/SKILL.md)**                 | [.agents/skills/human-in-the-loop/SKILL.md](file:///.agents/skills/human-in-the-loop/SKILL.md)                 | When deploying, dropping databases, or opening PRs.                             | Enforces strict human verification gates before destructive or final operations.         |

---

## 3. Current Work State

Active, in-flight task state and intra-task scratchpad context are maintained
locally in `.agent-state.md` (gitignored).

- **On Session Startup**: If `.agent-state.md` exists, read it to discover active
  objectives and resume in-flight work without lost context across AI provider
  switches.
- **During Execution**: Update `.agent-state.md` when making progress,
  encountering blockers, or pausing a workflow.
- **On Feature Completion**: Clear or reset `.agent-state.md` once all objectives
  and verification steps are met.

This file (`AGENTS.md`) is the single source of truth for agent rules, for every
provider. Do not duplicate context into provider-specific discovery files.
Committed narrative history belongs in `gemini.md`; `.agent-state.md` carries
only what is in flight.

## 4. Related References

| File                                                   | Purpose                                                                                         |
| :----------------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| [`.agent-state.md`](./.agent-state.md)                 | In-flight task state, synced between AI providers. Gitignored.                                  |
| [`.agents/TEMPLATE_REF.md`](./.agents/TEMPLATE_REF.md) | Upstream agent-template tracking marker.                                                        |
| [`README.md`](./README.md)                             | Consumer-facing documentation: setup, validation gates, contract validation, batch diagnostics. |
| Git history and GitHub releases                        | Narrative project history. It is deliberately not duplicated into a tracked file.               |

---

For general rules of engagement, refer to the global rules provided in the parent context.

<!-- markdownlint-disable MD049 -->

---

_Last Updated: 2026-08-18_ | _Last Reviewed: 2026-08-18_
