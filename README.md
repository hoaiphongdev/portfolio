# Portfolio

Personal portfolio site — Next.js 14 App Router, bilingual (English / Vietnamese)
via `next-intl`, Tailwind, with project write-ups authored as markdown.

## Requirements

Toolchain versions are pinned in `mise.toml`:

- Node `20.19.6`
- pnpm `9.15.4`

With [mise](https://mise.jdx.dev) installed, `mise install` picks both up.

## Setup

```bash
pnpm install
cp .env.example .env.dev
```

`.env.dev` / `.env.prod` are gitignored (`.gitignore` ignores `.env*` and keeps
only `.env.example`).
The single variable is `NEXT_PUBLIC_ROOT_SITE_URL`, which drives canonical URLs,
`hreflang` alternates and the sitemap.

## Commands

Recipes live in the [`justfile`](./justfile):

| Command        | What it does                                                    |
| -------------- | --------------------------------------------------------------- |
| `just run`     | Clean `.next`, copy `.env.dev` → `.env`, dev server on **3008** |
| `just prod`    | Clean `.next`, copy `.env.prod` → `.env`, build and serve       |
| `just install` | Remove `node_modules` and reinstall                             |

Or use pnpm directly: `pnpm dev` (port 3008), `pnpm build`, `pnpm start`,
`pnpm lint`, `pnpm lint:fix`.

## Layout

```
content/projects/{en,vi}/*.md   Project write-ups; frontmatter is zod-validated
locales/{en,vi}.json            UI copy (key sets must stay in sync)
src/app/[locale]/               Routes; this layout owns <html>/<body>
src/i18n/routing.ts             Locales + localized pathnames (source of truth)
src/constants/routes.ts         TRANSLATED_URL: origin path -> per-locale path
```

### Adding a project

Drop a markdown file into **both** `content/projects/en/` and
`content/projects/vi/` using the same slug. Frontmatter is parsed by
`projectFrontmatterSchema` in `src/utils/projects.ts` — the build fails loudly on
a malformed entry. `ranking` sorts the listing (descending).

### Adding a route

Add the origin path to `STATIC_PAGE_ORIGIN_URL` (`src/constants/paths.ts`), then
its per-locale translations to `TRANSLATED_URL` (`src/constants/routes.ts`).
Those literal types flow into `next-intl`, so `Link` and `router.replace` will
reject an href that is not a known pathname template. Always link with the
template plus params — `href={{ pathname: '/projects/[slug]', params: { slug } }}` —
never a pre-substituted string, which bypasses localization.

## Checks

```bash
pnpm exec tsc -p tsconfig.json --noEmit
pnpm lint
pnpm build
```

CI runs all three on every pull request (`.github/workflows/ci.yml`).
