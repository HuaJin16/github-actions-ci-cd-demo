# Security Model for Classroom Forks and PRs

This project is designed so students can fully learn CI/CD without access to
deployment credentials.

## Safe defaults

- Students fork the repo and submit PRs.
- CI runs on pull requests and requires no deployment secrets.
- CD runs on `main` in the canonical repository only.
- Deployment secrets stay in upstream repo settings only.

## Why this is safe

- GitHub does not expose upstream secrets to standard `pull_request` workflows
  from forks.
- The deploy workflow includes a preflight job that skips deployment when:
  - repository is not the canonical repo
  - required secrets are missing

## What not to do

- Do not share `DO_API_TOKEN` or app credentials with students.
- Do not run deploy on PR events.
- Do not use `pull_request_target` for untrusted fork code in this setup.
