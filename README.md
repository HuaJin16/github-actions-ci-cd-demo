# GitHub Actions CI/CD Classroom Demo (DigitalOcean)

This repository is a classroom-friendly reference for teaching CI/CD with GitHub
Actions using a tiny JavaScript project.

## Learning goals

- Show what continuous integration (CI) does on pull requests.
- Show what continuous deployment (CD) does after merge.
- Show how students can interact with checks, logs, and fixes in a real repo.
- Demonstrate a safe fork-and-PR model where only the instructor deploys.

## CI vs CD in this repository

- CI workflow: `.github/workflows/ci.yml`
  - Trigger: `pull_request` to `main`
  - Runs: lint, test, build, and build verification
  - Purpose: block bad changes before merge
- CD workflow: `.github/workflows/deploy.yml`
  - Trigger: `push` to `main` (after merge)
  - Runs: lint, test, build, verification, then DigitalOcean deployment
  - Purpose: publish validated code automatically

## Repository structure

- `.github/workflows/ci.yml` - pull request quality gates
- `.github/workflows/deploy.yml` - post-merge deployment to DigitalOcean
- `.do/app.yaml` - optional App Platform spec for reproducibility
- `src/metrics.js` - pure function covered by test
- `tests/metrics.test.js` - deterministic unit test
- `scripts/build.mjs` - tiny build step that creates `dist/`
- `scripts/verify-dist.mjs` - verifies expected build artifacts
- `index.html` / `styles.css` / `src/app.js` - tiny frontend app
- `docs/student-lab.md` - in-class activity
- `docs/instructor-runbook.md` - end-to-end live presentation script
- `docs/security-model.md` - forks, secrets, and safe deployment model

## Local setup

```bash
npm ci
npm run lint
npm run test
npm run build
npm run verify:dist
```

## Intentional bug for classroom demo

The tested function is `getPassRate(passed, total)` in `src/metrics.js`.

- Correct line:

```js
return Math.round((passed / total) * 100);
```

- Intentional bug to introduce in a PR:

```js
return Math.round((total / passed) * 100);
```

With input `2` and `4`, CI test expects `50` but gets `200`, so the PR check
fails in a clear and explainable way.

## DigitalOcean setup (instructor only)

1. Create an App Platform static site app from this repository.
2. Set app to deploy from `main` with build command:
   - `npm ci && npm run build`
   - output directory: `dist`
3. Disable automatic deploy-on-push in DigitalOcean if you want GitHub Actions
   to be the only CD trigger.
4. Add repository secrets:
   - `DO_API_TOKEN`
   - `DO_APP_ID`
5. Add repository variables:
   - `CANONICAL_REPO` (example: `org-name/repo-name`)
   - `DO_APP_URL` (optional, used in workflow summary)

When these values are not present (such as in forks), deployment is skipped and
CI still works.

## Branch protection (recommended)

Protect `main` and require the CI status check job from
`.github/workflows/ci.yml` before merge.

This makes CI enforcement visible to students.

## Student activity

Use the guided exercise in `docs/student-lab.md`.

Students fork the repo, open pull requests to upstream, inspect failing checks,
fix the issue, and observe the merge-to-deploy flow without any deployment
credentials.

For the instructor live sequence, setup checklist, and fallback plan, use
`docs/instructor-runbook.md`.
