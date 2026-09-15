# KHIDevs — React / GitHub Pages Edition

Premium React/Vite agency website for KHIDevs.

## Local testing

Requirements: Node.js 20+ and npm.

```bash
npm install
npm start
```

Open:

```text
http://localhost:43127/
```

## Production build

```bash
npm ci
npm run build
```

`npm run build` now performs three steps:

1. Builds the React/Vite application.
2. Builds a small SSR renderer used only during the build.
3. Pre-renders every public page into static HTML with page-specific SEO metadata.

The final deployable website is created in `dist/`.

## GitHub Pages

The default production configuration targets:

```text
https://smhb0333.github.io/khidevs/
```

The repository includes `.github/workflows/deploy-pages.yml`. Push to `main` and GitHub Actions will install, build and deploy the `dist/` folder.

In GitHub go to **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.

## Responsive system

The final responsive layer is `src/styles/responsive-v9.css`. It hardens the full site across:

- 320–360px compact phones
- standard Android/iPhone widths
- large phones / small tablets
- tablets
- laptops
- desktop displays
- 1600px+ and 2000px+ large displays
- short landscape phone screens
- safe-area insets for notched devices

It also includes touch-device and reduced-motion refinements.

## SEO implementation

The build now includes:

- static pre-rendered HTML for the homepage, agency pages, legal pages and all 17 service pages
- unique titles and descriptions
- canonical URLs
- `hreflang="en"` and x-default
- Open Graph metadata
- Twitter/X share metadata
- a 1200×630 social share image
- Organization, WebSite, ProfessionalService and Service structured data
- breadcrumb structured data on service pages
- generated `sitemap.xml` with `lastmod`
- generated `robots.txt`
- indexable page content in the initial HTML rather than an empty SPA root
- dynamic runtime metadata for client-side navigation
- semantic H1/H2/H3 structure already used throughout the React pages

The current canonical URL is the live GitHub Pages deployment. This avoids pointing search engines at a domain that is not yet serving this build.

### Moving to www.khidevs.com later

Create a `.env` file before building:

```text
VITE_SITE_URL=https://www.khidevs.com
VITE_BASE_PATH=/
```

Then rebuild. The canonical URLs, structured data and generated sitemap will use the custom domain automatically.

## PWA / Android / iOS

The project includes:

- installable web manifest
- Android PWA icons
- Apple touch icon
- standalone iOS metadata
- service worker with GitHub Pages-safe scope
- offline app-shell fallback
- Services / Work / Contact app shortcuts

If an older installed app still opens the wrong URL, uninstall the old home-screen/PWA copy and install it again after deployment.

## Contact form

For local/offline testing, submissions are stored only in local browser storage.

For a production API, create `.env` and add:

```text
VITE_CONTACT_ENDPOINT=https://your-api.example/contact
```

## Important source folders

- `src/components/` — shared navigation, footer, meta and visual components
- `src/pages/` — route pages
- `src/data/siteData.json` — services, capabilities, lifecycle, projects and technologies
- `src/styles/` — core, React additions and final responsive layer
- `scripts/prerender.mjs` — static SEO page and sitemap generation
- `public/` — PWA, icons, social image, sitemap fallback and GitHub Pages fallback

## Portfolio

The Work page contains all supplied live projects, including Trendyz Tech as a Shopify e-commerce build. Project filters support All, Shopify, Website, Web App, E-commerce and Portfolio.
