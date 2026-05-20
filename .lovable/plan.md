## Goal
Add a GitHub Pages deploy step to `.github/workflows/build.yml` so every push to the default branch publishes the built site.

## Changes

**`.github/workflows/build.yml`** — extend the existing workflow:

1. Add `permissions` block (`contents: read`, `pages: write`, `id-token: write`) — required by the official Pages actions.
2. Add a `concurrency` group (`pages`) so overlapping deploys don't race.
3. In the existing `build` job:
   - Add `actions/configure-pages@v5` before the build.
   - Replace the generic `upload-artifact` step with `actions/upload-pages-artifact@v3`, pointing at the TanStack Start static output directory (`.output/public`).
4. Add a second job `deploy` that:
   - `needs: build`
   - Runs only on pushes to the default branch (not PRs).
   - Uses `environment: github-pages` and `actions/deploy-pages@v4`.

## Caveats to flag to the user

- **SSR won't run on GitHub Pages** — it's static hosting only. The site renders as a SPA from prerendered HTML. The Supabase contact form still works because it calls Supabase directly from the browser using the publishable key.
- **Repo Pages setting**: user must go to **Repo → Settings → Pages → Build and deployment → Source: GitHub Actions** once. I'll mention this in the reply.
- **Base path**: if the repo is deployed at `username.github.io/repo-name/` (not a custom domain or `username.github.io` root), Vite needs a `base` config. I won't change `vite.config.ts` preemptively — I'll call this out and offer to add it if needed.
- **Build output path**: assumes TanStack Start emits `.output/public`. If the build produces a different folder, we adjust the `path:` in the upload step.

## Technical details

```yaml
permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

# build job: add before "Build" step
- uses: actions/configure-pages@v5

# build job: replace upload-artifact with
- uses: actions/upload-pages-artifact@v3
  with:
    path: .output/public

# new deploy job
deploy:
  needs: build
  if: github.event_name == 'push' && github.ref == format('refs/heads/{0}', github.event.repository.default_branch)
  runs-on: ubuntu-latest
  environment:
    name: github-pages
    url: ${{ steps.deployment.outputs.page_url }}
  steps:
    - id: deployment
      uses: actions/deploy-pages@v4
```
