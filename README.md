# mitko x Corporate Website

A modern, professional static website for mitko x, focused on enterprise technology and AI solutions. This site includes all required legal and compliance policies, a modern responsive design, and is ready for deployment on any static hosting platform.

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
- Present mitko x’s enterprise technology and AI offerings
- Provide clear legal compliance (privacy, cookies, and terms)
- Offer a modern, mobile-first user experience

## Main Pages
- `index.html` — Home page with hero, services, and contact
- `privacy-policy.html` — GDPR-compliant privacy policy
- `cookies-policy.html` — Cookies usage and compliance
- `terms-of-service.html` — Terms and conditions for users
- `404.html` — Custom not found page

## Directory Structure
- `css/` — All CSS styles (mainly `styles.css`)
- `js/` — JavaScript for interactivity
- `img/` — Logos and image assets
- `workers-site/` — (Optional) Cloudflare Worker files
- `robots.txt`, `sitemap.xml` — SEO and indexing helpers

## Features
- Fully responsive and mobile-friendly
- Modern UI with gradients and soft cards
- Sectioned policies for easy reading
- Interactive navigation and contact form
- Custom 404 page

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
### Cloudflare Pages
1. Push this repo to GitHub
2. Connect to Cloudflare Pages
3. Set build output directory to `/` (root)
4. No build step is needed (static site)

### Other Static Hosts
You can deploy to Netlify, Vercel, GitHub Pages, or any static host with no changes required.

## Customization
- Branding colors and fonts are in `css/styles.css`
- Logos/images are in `img/`
- Edit HTML files for content changes

## Contributing
Pull requests and suggestions are welcome! Please open an issue or PR for discussion.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Contact
For business inquiries, contact: `web@mitkox.com`

---

© mitko x / Perla SV Ltd. All rights reserved.
