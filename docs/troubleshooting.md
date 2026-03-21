# Troubleshooting Guide

## CI fails on lint

- Run `npm run lint` locally and fix reported files.
- Common issue: typo or undefined variable in `src/app.js`.

## CI fails on test

- Run `npm run test` locally.
- Check `tests/metrics.test.js` expected value and compare with
  `src/metrics.js` formula.

## CI fails on build verification

- Run `npm run build` then `npm run verify:dist`.
- Confirm `dist/index.html` exists and no `__COMMIT_SHA__` placeholder remains.

## CD workflow says deployment skipped

- Check preflight summary in workflow output.
- Confirm repository variables and secrets are set in upstream repo:
  - `CANONICAL_REPO`
  - `DO_APP_ID`
  - `DO_API_TOKEN`

## CD deploy command fails

- Confirm `DO_APP_ID` is correct.
- Confirm token has permission for App Platform.
- Verify app exists and is accessible from your DigitalOcean account.
