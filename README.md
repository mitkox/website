# Mitko X

Emerging AI into production for enterprise, industry, and defense.

## GitHub → Cloudflare

Work directly with this repository. The website source is `index.html`, `css/styles.css`, `js/main.js`, the policy/error HTML pages, and `img/`.

Review the changes, then commit and push through your usual GitHub workflow. Your existing Cloudflare Git integration builds/deploys the configured branch. This redesign does not change the domain, hosting configuration, production branch, or Git remotes. No ZIP upload or new hosting service is required.

There is no frontend dependency installation or framework build. Keep the current Cloudflare build settings. `scripts/build.py` remains an optional helper for configurations that already publish a `dist/` directory; generated artifacts are not the source of truth.

## Local preview

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open [localhost:8765](http://localhost:8765).

## Editing

- **Positioning and copy:** `index.html`. All three sector descriptions exist in the HTML for indexing and no-JavaScript access.
- **Palette and layout:** the CSS variables and responsive rules in `css/styles.css`.
- **Motion:** a dependency-free canvas particle field, restrained text entrances, and an animated production path in `js/main.js` and the CSS.
- **Brand assets:** editable SVG sources in `img/`, with matching favicon/share PNGs.
- **Contact:** native links to `sales@mitkox.com`, plus an optional clipboard action. No form backend or calendar service is configured.
- **Headers:** `_headers` supplies Cloudflare Pages response headers. Existing legacy Worker configuration is retained.

## Accessibility and performance

The sector selector supports arrow keys, Home, End, and ordinary tab navigation. Content is available without JavaScript. Native email links do not rely on JavaScript.

Motion respects the OS preference and an explicit pause button. The canvas renders at up to 30 fps, caps device pixel ratio, and stops its loop when the hero is outside the viewport or the tab is hidden. Reduced motion uses a static scene; a static SVG provides a no-canvas fallback. The frontend makes no external font, library, or tracking requests.

See `REDESIGN.md` for the current design rationale and verification results.
