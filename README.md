# Mitko X Website

A static company website for Mitko X, focused on sovereign and hybrid enterprise AI platforms — running AI inside your own trust boundary — governed AI coding workflows, industrial AI expertise, and regulated environments.

## Table of Contents
- [Project Overview](#project-overview)
- [Main Pages](#main-pages)
- [Directory Structure](#directory-structure)
- [Features](#features)
- [Compliance & Policies](#compliance--policies)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview
This website is designed to:
- Present Mitko X’s sovereign and hybrid enterprise AI positioning clearly
- Explain the hybrid model: sensitive workloads stay local, frontier models are reached only through a governed policy gateway
- Support public sharing with Open Graph and Twitter metadata
- Provide legal compliance pages for privacy, cookies, and terms
- Keep the frontend static, fast, and easy to audit

## Main Pages
- `index.html` — Home page with positioning, services, method, and contact
- `privacy-policy.html` — GDPR-compliant privacy policy
- `cookies-policy.html` — Cookies usage and compliance
- `terms-of-service.html` — Terms and conditions for users
- `404.html` — Custom not found page

## Directory Structure
- `css/styles.css` — Shared site styles
- `js/main.js` — Navigation, reveal animation, contact, and migration cleanup
- `img/` — Logo, favicons, and social sharing card
- `workers-site/` — (Optional) Cloudflare Worker files
- `robots.txt`, `sitemap.xml` — SEO and indexing helpers

## Features
- Responsive, light-only interface
- No framework or build step
- Deterministic social sharing preview
- Shared policy and error-page styling
- Minimal JavaScript with reduced-motion support

## Compliance & Policies
This site includes:
- Privacy Policy (`privacy-policy.html`)
- Cookies Policy (`cookies-policy.html`)
- Terms of Service (`terms-of-service.html`)

All policies are written for GDPR and EU compliance and are styled for clarity and accessibility.

## Local Development
To preview or develop locally, use any static HTTP server:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

## Deployment
### Static Hosting
1. Push this repo to GitHub
2. Connect to your static host
3. Set build output directory to `/` (root)
4. No build step is needed (static site)

## Customization
- Branding colors and fonts are in `css/styles.css`
- Logo, favicon, and social card assets are in `img/`
- Edit HTML files for content changes

## Contributing
Pull requests and suggestions are welcome! Please open an issue or PR for discussion.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Contact
For business inquiries, contact: `web@mitkox.com`

---

© Mitko X / Perla SV Ltd. All rights reserved.
