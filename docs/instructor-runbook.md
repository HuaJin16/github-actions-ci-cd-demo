# Instructor Runbook: Live CI/CD Walkthrough

Use this sequence to run a reliable classroom demo that clearly separates CI
from CD while showing how they connect.

## Audience learning objectives

- Identify where CI starts and ends in GitHub Actions.
- Explain why failing checks should block merge.
- Identify where CD starts after merge.
- Understand why deployment credentials are never shared with contributors.

## Before class (one-time setup)

1. In DigitalOcean App Platform, create a static site using this repository.
2. Confirm app settings:
   - build command: `npm ci && npm run build`
   - output directory: `dist`
   - branch: `main`
   - `deploy_on_push`: disabled (prefer Actions-driven deploy)
3. In GitHub repository settings, add:
   - secret `DO_API_TOKEN`
   - secret `DO_APP_ID`
   - variable `CANONICAL_REPO` (for example `org/repo`)
   - variable `DO_APP_URL` (optional, used in workflow summary)
4. Protect `main` and require CI workflow status check to pass before merge.
5. Ensure default branch is `main`.

## Demo branches/tags to prepare

- `demo-start` - clean passing state
- `demo-fail` - branch with intentional bug commit prepared
- `demo-fix` - optional backup fix commit prepared

## Intentional failure details

- File: `src/metrics.js`
- Correct logic:

```js
return Math.round((passed / total) * 100);
```

- Bugged logic used to trigger CI failure:

```js
return Math.round((total / passed) * 100);
```

- Test that fails: `tests/metrics.test.js`
- Expected value in failing case: `50`
- Actual value when bugged: `200`

## In-class live sequence (25-35 minutes)

1. Open repo and show file map (`src/`, `tests/`, `.github/workflows/`).
2. Open `ci.yml` and identify PR trigger + quality checks.
3. Open `deploy.yml` and identify merge trigger + deployment step.
4. Create or open PR from `demo-fail` branch with the bug.
5. Watch CI fail and inspect test log.
6. Ask students to locate the formula bug in `src/metrics.js`.
7. Push fix commit and show CI re-run automatically.
8. Merge PR once CI is green.
9. Open Actions and watch CD deploy run on `main` push.
10. Open deployed app and verify update and commit stamp.

## Student participation pattern

- Students fork repo and open PRs to upstream.
- Students only need CI checks for their learning loop.
- Instructor merges one selected PR to trigger CD once.

## Fallback plan

- Keep screenshots ready for:
  - failing CI check
  - passing CI check
  - running CD deployment
  - final deployed site
- Keep a short recording of a full successful run.
- Use `workflow_dispatch` to manually trigger workflows if needed.

## Post-demo discussion prompts

- What failure did CI prevent from reaching production?
- Why is CD intentionally limited to trusted branch/repo context?
- What extra CI checks would your own project add next?
