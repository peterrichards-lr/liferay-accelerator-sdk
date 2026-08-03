---
name: reflection-and-planning
description: Activate this skill when beginning complex tasks, proposing architectural changes, or modifying codebase files to ensure proper planning and predictive failure analysis.
---

# Reflection and Planning Pipelines

To ensure thoughtful decision-making and robust implementations, the AI agent MUST strictly adhere to the following Reflection and Planning constraints before and after task execution.

## 1. Mandatory Implementation Plans

Before making structural modifications or editing logic blocks larger than 10 lines across any files, you MUST outline your approach using a formalized implementation plan.

- **Artifact Creation**: You MUST explicitly write out the implementation plan (e.g., in your response, or as an `implementation_plan.md` file via the Write tool) before making the changes.
- **Self-Review Gate**: Verify the plan addresses the task's requirements and edge cases before proceeding. This can happen within the same turn — draft the plan, confirm it holds up, and continue with the implementation once it does.
- **Prohibited Execution**: You are FORBIDDEN from executing any code modifications using your file edit tools until the implementation plan has been drafted and verified as sound.

## 2. Predictive Failure Analysis

Anticipating system failures before they happen is critical to stability. Whenever you finalize or execute code modifications, you MUST practice predictive failure analysis.

- **Required Output Section**: You MUST append a specific markdown section to your reasoning or visible output titled "Failure Analysis".
- **Analysis Content**: This section MUST detail exactly two explicit failure points (e.g., specific edge cases, unhandled promises, permission errors, or performance bottlenecks) related to the code you just wrote.
- **Mitigation Strategy**: You MUST explicitly describe exactly how your newly implemented code natively handles or mitigates these two predicted failure points.

<!-- markdownlint-disable MD049 -->

---

_Last Updated: 2026-07-22_ | _Last Reviewed: 2026-07-22_
