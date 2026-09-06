# Production-first redesign — September 2026

## Positioning

**Emerging AI. Into production.**

The core offer is production systems for enterprise, industry, and defense. The distinction is the combination of emerging-AI expertise and industrial/defense systems knowledge, as confirmed by the owner. The site makes this combination explicit without inventing a market ranking, client reference, certification, or production metric.

The homepage is reduced from five sections to four and from 432 to 209 main-content words (52% less, including the three sector descriptions and fallback labels). The previous service catalogue, tags, numbered labels, boundary diagram, and architecture controls are replaced by a single sector selector and a compact production path.

## Visual direction

Midnight blue `#080c14`, near-white `#f0f3f8`, electric blue `#8babff`, and a cool white expertise section `#eef1f5`. Blue connects the emerging technology message to precision engineering; the restrained palette avoids relying on tactical green or decorative neon to signal defense expertise. This is an art-direction judgment, not a conversion claim.

The header, footer, policy/error pages, favicon, wordmark asset, and existing social preview follow the same palette.

## Motion

A procedural particle field moves between a sphere and a structured lattice: emerging capability becoming an engineered system. It rotates gently and responds slightly to desktop pointer movement. It is an abstract illustration, not live system telemetry.

Additional motion includes short headline entrances, section reveals, sector-panel transitions, CTA feedback, and a signal traveling along the production path. There is no autoplaying sector text or forced scrolling.

The canvas uses no libraries or external assets, renders at up to 30 fps, caps pixel density, and stops when the hero is offscreen or the page is hidden. Pause and reduced-motion settings stop the animation loop. A static SVG remains available without JavaScript or canvas support.

## Contact

The large closing invitation and visible email address open a native message to `sales@mitkox.com`. Copying the address supports browser-email users and reports denied clipboard access clearly. No form backend, fake submission state, or placeholder booking link was added. No email was sent during testing.

## Git and hosting

The revised source lives directly in the existing repository and is released through the existing GitHub → Cloudflare integration on `main`. This revision does not change Cloudflare settings, Git remotes, or the domain, and does not require a ZIP upload.

The optional `scripts/build.py` helper remains for a configuration that already uses `dist`. The source files remain authoritative. Existing redesign work was preserved and backed up before review. Generated output and numbered duplicate build directories such as `dist 2/` are excluded from Git.

## Pre-publication review — 6 September 2026

- Increased the motion control, email-copy control, clipboard feedback, and footer links to 14px, with secondary mobile text at least 12px.
- Restored mouse text selection in the hero without changing its animation or pointer response.
- Aligned the error-page action with the Expertise navigation, refreshed the sitemap date, and corrected outdated policy references to analytics and user accounts.
- Built the 18-file public artifact and re-ran the browser checks below against that build. Additional checks covered every page at 320, 390, 768, and 1440 pixels without content overflow.
- Checked local asset and fragment references, metadata, source/build consistency, JavaScript syntax, and Git whitespace. Desktop, narrow-mobile, and error-page layouts were visually inspected.

The policy edits describe current website functionality; this review does not establish legal compliance. Git history records the release commit; successful publication must also be verified against the live domain.

## Verification

Local headless Chrome / Playwright checks cover:

- Layout widths of 320, 390, 480, 600, 760, 768, 1024, 1440, and 1920 pixels.
- Pixel changes during animation; stable pixels and no scheduled loop while paused or under reduced motion; loop cancellation with the hero fully offscreen.
- All three sectors, single-panel visibility, and keyboard Arrow/Home/End navigation.
- Clipboard success and denied-permission handling, plus correct native email links.
- Static graphics and all three sector descriptions without JavaScript.
- Homepage and supporting-page accessibility scans using axe-core 4.10.3, WCAG 2 A/AA, WCAG 2.1 A/AA, and best-practice rules.
- Local assets, fragment links, JavaScript syntax, and Git whitespace checks.
- Desktop/mobile screenshots and the updated social image.

Final result: all nine responsive widths and functional checks passed, with zero reported violations in the checked desktop/mobile accessibility scans. No runtime errors, failed local assets, or external frontend requests were observed.

Automated accessibility checks are not a full accessibility certification. Production Core Web Vitals, real-user conversion, actual email delivery, and physical Safari/Firefox devices are outside this local pass.

## References

The direction combines distinctive motion and short copy with established usability constraints:

- [2026 design trends: minimal copy, expressive typography, distinctive visual systems](https://webflow.com/blog/web-design-trends-2026)
- [Reduced-motion implementation guidance](https://web.dev/articles/prefers-reduced-motion)
- [Cloudflare Pages Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/)
