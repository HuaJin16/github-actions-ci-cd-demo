# Student Lab: Learn CI/CD by Interacting with the Repo

## Overview

You will use this repository to practice the full CI/CD loop:

1. Make a change in a branch.
2. Open a pull request.
3. Watch CI checks run.
4. Diagnose a failing check.
5. Fix it and re-run checks.
6. Merge and observe CD deploy.

## Part A - Read the workflows

1. Open `.github/workflows/ci.yml` and identify:
   - trigger event
   - job name
   - checks that run
2. Open `.github/workflows/deploy.yml` and identify:
   - trigger event
   - why deployment runs only after merge
   - where secrets are used

## Part B - Create a controlled CI failure

1. Create a branch from `main`.
2. Edit `src/metrics.js` and intentionally break the formula:

```js
return Math.round((total / passed) * 100);
```

3. Commit and push your branch.
4. Open a pull request.
5. Go to the Actions/checks tab and inspect the failed test.

Questions to answer:

- Which check failed?
- What value did the test expect?
- What value did the code return?

## Part C - Fix and pass CI

1. Restore the correct formula:

```js
return Math.round((passed / total) * 100);
```

2. Push a new commit to the same PR.
3. Confirm all CI checks pass.

## Part D - Observe CD

1. Instructor merges the PR to `main`.
2. Watch `CD - Deploy to DigitalOcean` run automatically.
3. Verify the live app reflects the merged commit.

## Reflection prompts

- What part of this flow is CI, and what part is CD?
- Why are secrets not required for PR CI checks?
- Why should deployment be restricted to trusted branches?

## Suggested CLI commands

Use these commands if you are working locally from your fork:

```bash
# create and switch to a feature branch
git checkout -b demo-break-pass-rate

# run checks before opening PR
npm ci
npm run lint
npm run test

# commit your change
git add src/metrics.js
git commit -m "Introduce demo CI failure"
git push -u origin demo-break-pass-rate
```
