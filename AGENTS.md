# Accelerator SDK Agent Skills Directory

To prevent cognitive overload and ensure passive rules are not missed during execution, the SDK's agent rules are refactored into active, modular skill files located under `.agents/skills/`.

Please reference the specific skill file based on the context of your task:

## Table of Contents

| Skill Name                                                                                 | Path                                                                                                           | Trigger Condition / When to Load                                                | Description                                                                              |
| :----------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------- |
| **[github-issue-sync](file:///.agents/skills/github-issue-sync/SKILL.md)**                 | [.agents/skills/github-issue-sync/SKILL.md](file:///.agents/skills/github-issue-sync/SKILL.md)                 | When starting features, editing task JSONs, or closing issues.                  | Manages issue creation and status synchronization with the GitHub issue tracker.         |
| **[unit-testing](file:///.agents/skills/unit-testing/SKILL.md)**                           | [.agents/skills/unit-testing/SKILL.md](file:///.agents/skills/unit-testing/SKILL.md)                           | When writing/refactoring logic or running verification steps.                   | Governs test-driven development, Vitest coverage checking, and deployment hard-gates.    |
| **[documentation](file:///.agents/skills/documentation/SKILL.md)**                         | [.agents/skills/documentation/SKILL.md](file:///.agents/skills/documentation/SKILL.md)                         | After implementing any code changes.                                            | Details active documentation review, creation, and timestamp hygiene rules.              |
| **[coding-standards](file:///.agents/skills/coding-standards/SKILL.md)**                   | [.agents/skills/coding-standards/SKILL.md](file:///.agents/skills/coding-standards/SKILL.md)                   | When writing or refactoring microservice/SDK source code.                       | Defines self-documenting code style, dry-run profiling, and native identifier practices. |
| **[multi-agent-orchestration](file:///.agents/skills/multi-agent-orchestration/SKILL.md)** | [.agents/skills/multi-agent-orchestration/SKILL.md](file:///.agents/skills/multi-agent-orchestration/SKILL.md) | When delegating tasks or defining subagents.                                    | Orchestrates parallel workflows and delegates to specialized subagents.                  |
| **[tool-use-react](file:///.agents/skills/tool-use-react/SKILL.md)**                       | [.agents/skills/tool-use-react/SKILL.md](file:///.agents/skills/tool-use-react/SKILL.md)                       | When making tool calls, interacting with the terminal, or invoking GitHub APIs. | Enforces ReAct reasoning patterns and strict GitHub CLI usage boundaries.                |

---

For general rules of engagement, refer to the global rules provided in the parent context.

<!-- markdownlint-disable MD049 -->

---

_Last Updated: 2026-07-20_ | _Last Reviewed: 2026-07-20_
