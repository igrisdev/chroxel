<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Agent Guidelines

This document provides practical, prescriptive guidance for writing, testing, building, and maintaining code in this repository. It is intended for automated agents as well as human contributors.

- Build tasks are driven by npm scripts declared in package.json. Use the project’s standard entry points to ensure consistent results across environments.
- Tests are optional in this repository. If tests are added, prefer a single-command pattern that can isolate a single test case.
- Style guidelines cover imports, formatting, types, naming, and error handling to keep the codebase coherent.
- Cursor and Copilot rules: if present, follow them. If absent, document the absence plainly.

## 1) Build / Lint / Test Commands
- Build: `npm run build` and verify it completes without errors. For development builds, use `npm run dev`.
- Start (production): `npm run start` to serve a prebuilt app.
- Lint: `npm run lint` to lint the codebase using ESLint configured for Next.js + TypeScript.
- Test: There is no test script currently defined in package.json. To add tests, introduce a test runner (Jest or Vitest) and expose a `test` script. See below for concrete patterns.

### Running a Single Test (when tests exist)
- Jest (example):
  - Run a single test by name: `npm test -- -t "test name" path/to/file.test.ts`
- Vitest (example):
  - Run a single test by name: `npx vitest run path/to/file.test.ts -t "test name"`
- If your test runner supports selection by file only, use:
  - Jest: `npm test -- path/to/file.test.ts` and then filter by name with `-t`.
  - Vitest: `npx vitest run path/to/file.test.ts --testNamePattern="test name"`

#### How to enable tests (basic guidance)
- Install a test framework (Jest or Vitest) and TypeScript support if needed.
- Add a `test` script in package.json, e.g.:
  - Jest: "test": "jest"
  - Vitest: "test": "vitest"
- Add example tests under __tests__ or *.test.ts/.spec.ts as your project convention requires.
- Ensure test commands are deterministic and do not rely on a production DB or external services without mocks.

## 2) Code Style Guidelines

- General: Code should be clear, maintainable, and well-typed. Prefer explicit types over implicit any. Follow the repo's conventions for file and directory layout.
- Imports:
  - External modules first, then internal modules.
  - Group by origin (e.g., React, Next.js, utility libs) with a blank line between groups.
  - Use absolute imports when aliases exist; otherwise, use relative imports sparingly.
  - No unused imports; enable ESLint rule: `no-unused-vars`/`@typescript-eslint/no-unused-vars`.
- Formatting:
  - Use a consistent formatter (Prettier) if available; otherwise follow a simple 2-space indent and 80-120 character line length as a soft guideline.
  - Prefer single quotes for strings in TypeScript/JavaScript; template literals for dynamic strings only when needed.
  - Always end files with a newline.
- Types and Interfaces:
  - Prefer `unknown` over `any` for uncertain values; narrow with type guards.
  - Use `interface` for public object shapes that will be extended; use `type` for unions/aliases.
  - Export types and interfaces from an index if they are shared across modules.
- Naming Conventions:
  - Files/dirs: kebab-case where possible; inside, use PascalCase for React components.
  - Variables and functions: camelCase; constants: ALL_CAPS with underscores.
  - Types/Interfaces/Enums: PascalCase; avoid `I` prefix for interfaces.
- Error Handling:
  - Do not swallow errors; throw or propagate with meaningful messages.
  - Use custom error classes with codes when appropriate.
  - Log actionable errors at the boundary (UI or API layer) but avoid leaking sensitive information.
- React/Frontend:
  - Use function components; keep components small and focused.
  - Prefer hooks, avoid deep prop drilling; lift state where it makes sense.
  - Add ARIA attributes for accessibility where required; ensure keyboard navigation works.
- Testing & Quality:
  - Write tests that cover intent, not implementation details.
  - Keep tests deterministic; mock external calls.
  - Run lint and type checks in CI; fix locally.

## 3) Repository Conventions
- Commit messages should be short and purposeful, focusing on the "why" rather than the "what".
- Use conventional commits style if possible: feat:, fix:, docs:, style:, refactor:, test:, chore:
- Before pushing, ensure `lint` passes and, if tests exist, all tests pass.
- Avoid committing secrets or credentials; use environment-based mocks for tests.

## 4) Cursor / Copilot Rules
- Cursor rules: None detected in this repository (look under `.cursor/rules/` or `.cursorrules`). If added in future, follow them and document in this section.
- Copilot instructions: No `.github/copilot-instructions.md` found. If present, apply those rules when generating code suggestions.

## 5) Change Management & Review
- Run `npm run lint` before creating a PR.
- Run `npm run build` to validate production build locally before review.
- Include a minimal, self-contained repro for any bug fixes in the PR description.
- Keep diffs focused; one logical change per commit when possible.

-## 6) Quick Reference: Common Patterns
- Build: `npm run build` | Start: `npm run start` | Dev: `npm run dev` | Lint: `npm run lint:`
- Run a single test: see section 1.1 above once tests exist.
- Format: use `Prettier` or consistent formatting rules; run `format` script if desired.

## 7) Code Review Process
- Before merging, ensure the following:
  - Lint passes without errors or warnings.
  - Build completes without errors in both dev and production modes.
  - If tests exist, at least a basic test subset passes; ensure no flaky tests.
- Include a brief justification in the PR description: what changed and why it matters.
- Add or update minimal tests for new functionality where feasible.
- Reviewers should verify public API changes are backward compatible or clearly documented.

## 8) Environment & Tooling
- Node: Use a supported Node version per this repository's CI (documented in README or CI config).
- Package manager: Prefer `npm`; if using `pnpm` or `yarn`, note it in contribution guidelines.
- CI: Rely on `npm run lint` and `npm run build` as baseline checks in CI.
- Local setup: Run `npm ci` to install exact lockfile versions; run `npm run dev` for local development.

## 9) Working with CI / PR Checks
- PRs should trigger lint, type checks, and build steps in CI.
- When a failure occurs in CI, add a comment in the PR with context and a link to logs.
- Do not bypass checks in CI unless explicitly requested for a private branch and you understand the risk.

## 10) File Organization & Naming
- Public APIs: export from an `index.ts` barrel file when shared across modules.
- Components: place in `components/` following PascalCase naming.
- Styles: keep styling co-located with components or in a dedicated `styles/` dir; prefer CSS-in-JS or CSS Modules per project style.
- Tests: co-locate near the code under test or in a parallel `__tests__` folder following project conventions.

## 11) Accessibility & Internationalization
- Add ARIA attributes where applicable; ensure components are keyboard navigable.
- Avoid hard-coded text for UI; prepare for i18n if needed (extract strings, provide translation keys).

## 12) Miscellaneous Tips
- Use descriptive commit messages that answer: why this change was needed.
- Prefer small, focused commits; one change per commit when possible.
- Do not commit secrets or credentials; use mocks for tests.
- If you need guidance, reference the README for project-specific conventions.

## 13) Version Control Workflow
- Branch naming: use feature/short-desc or fix/short-desc; include issue or ticket id when available.
- PR descriptions: summarize the problem, the approach, and the justification (why this change).
- Before pushing, ensure local changes are organized; run lint and build locally.
- When syncing with main, rebase or merge carefully; avoid force-push on shared branches.

## 14) Example Commands
- Start a dev server: `npm run dev`.
- Create a production build: `npm run build`.
- Lint the codebase: `npm run lint`.
- Run a single test (when tests exist): `npm test -- -t "component renders" src/components/Button.test.ts`.
- Update snapshots (if using Jest): `npm test -u`.

<!-- END:agent-guidelines -->
 
## 15) Appendix: Config & Common Patterns
- ESLint: rely on `eslint` with Next.js config; avoid disabling rules globally.
- TypeScript: enable `strict` mode in tsconfig; prefer explicit types and `unknown` for uncertain data.
- Prettier: consider adding a `.prettierrc` and a `format` npm script; run `npx prettier --write .`.
- Documentation: keep inline code comments to a minimum; explain non-obvious decisions in code docs.

## 16) Additional Notes
- This repository uses Next.js 16.x semantics; consult the Next.js 16 docs for any breaking changes when upgrading.
- When introducing new UI patterns, aim for deliberate, purposeful design choices that align with the existing design language.
