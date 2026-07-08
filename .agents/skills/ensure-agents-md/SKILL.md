---
name: ensure-agents-md
description: Run FIRST before any task when workspace root lacks AGENTS.md. Creates AGENTS.md tailored to the Liferay Accelerator SDK environment.
---

# Ensure AGENTS.md (Bootstrap)

Before any other work, the agent MUST:

1. Check whether `AGENTS.md` exists at the workspace root.
2. If it exists, skip this skill entirely.
3. If it does not exist, create `AGENTS.md` based on the SDK environment.

## Steps

1. **Verify Environment**: Confirm this is the Liferay Accelerator SDK repo.
2. **Generate AGENTS.md**: Create `AGENTS.md` with base project instructions for AI coding agents.
3. **Inform User**: Tell the user that the bootstrap is complete, and proceed with their request.

<!-- markdownlint-disable MD049 -->

---

_Last Updated: 2026-07-08_ | _Last Reviewed: 2026-07-08_
