# CI/CD Student Fix Lab (GitHub Actions + DigitalOcean)

This lab teaches PR-based CI checks and merge-triggered CD with a controlled bug.

For instructor setup and presentation sequence, use `docs/instructor-runbook.md`.

## Important

- Work from issue: `#<ISSUE_NUMBER>`
- Submit your PR to base branch: `demo/failing-pass-rate`
- Do not submit your student PR to `main`

## Prerequisites

- Git
- Node.js + npm
- GitHub account
- Optional: GitHub CLI (`gh`)

## 1) Fork and clone

1. Fork this repository on GitHub.
2. Clone your fork locally.
3. Add the instructor repo as `upstream`.

```bash
git clone https://github.com/<your-username>/github-actions-ci-cd-demo.git
cd github-actions-ci-cd-demo
git remote add upstream https://github.com/HuaJin16/github-actions-ci-cd-demo.git
```

## 2) Run the app locally

```bash
npm ci
py -m http.server 4173
```

Open `http://localhost:4173` and confirm the Pass Rate Calculator interface loads.

## 3) Create your fix branch from the failing branch

```bash
git fetch upstream
git checkout -b fix/<your-name>-pass-rate upstream/demo/failing-pass-rate
```

## 4) Fix the bug

Edit `src/metrics.js` and ensure the formula is:

```js
return Math.round((passed / total) * 100);
```

## 5) Run local checks (same gates as CI)

```bash
npm run lint
npm run test
npm run build
npm run verify:dist
```

## 6) Commit and push

```bash
git add src/metrics.js
git commit -m "fix: correct pass-rate formula"
git push -u origin fix/<your-name>-pass-rate
```

## 7) Open pull request to instructor branch

Web UI target:
- Repository: `HuaJin16/github-actions-ci-cd-demo`
- Base branch: `demo/failing-pass-rate`
- Compare branch: `<your-username>:fix/<your-name>-pass-rate`

If you use GitHub CLI:

```bash
gh pr create \
  --repo HuaJin16/github-actions-ci-cd-demo \
  --base demo/failing-pass-rate \
  --head <your-username>:fix/<your-name>-pass-rate \
  --title "fix: correct pass-rate formula" \
  --body "Refs #<ISSUE_NUMBER>"
```

## 8) What happens next

- GitHub Actions CI runs automatically on your PR.
- If CI passes, instructor merges your PR into `demo/failing-pass-rate`.
- Instructor then merges `demo/failing-pass-rate` into `main`.
- CD deploy runs automatically from `main`.
