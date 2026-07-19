---
name: unit-testing
description: Activate this skill when writing or refactoring SDK logic, updating REST/GraphQL services, or validating SDK changes before commit.
---

# Unit Testing & Verification Rules

To maintain high code quality and prevent regression, the following testing rules must be strictly adhered to:

## 1. Test Execution & Coverage

- **Run unit tests**:
  ```bash
  yarn test
  ```
  This runs all 289 unit tests via Vitest. Ensure all tests pass.
- **Coverage check**:
  ```bash
  vitest run --coverage
  ```
  Ensure any new files or logic have adequate test coverage.

## 2. Test-Driven Alignment & Gates

- **Test-Driven Alignment**: Propose test cases _before_ providing the implementation of any logic changes.
- **Unit Test Requirement**: All new logic must have corresponding unit tests.
- **The Deployment Gate**: Never suggest a deployment command until you have explicitly verified that all unit tests are passing.

<!-- markdownlint-disable MD049 -->

---

_Last Updated: 2026-07-19_ | _Last Reviewed: 2026-07-19_
