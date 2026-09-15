# KHIDevs v9 — Responsive & SEO Audit

## Responsive fixes applied

- Reduced the homepage hero type scale on desktop so the title no longer collides with the right-side agency description.
- Added deterministic wrapping for `Automate.` and `Grow.` on narrow screens.
- Rebuilt the command-stage ecosystem into a readable grid on phones instead of relying on overlapping absolute nodes.
- Added fluid shell spacing and section spacing across 320px phones through ultrawide displays.
- Hardened all grids with `min-width: 0` to prevent hidden horizontal overflow.
- Reworked mobile portfolio filters into a visible responsive grid rather than a fragile horizontal strip.
- Improved responsive spacing for portfolio cards, service directory cards, forms, process rows, lifecycle sections and footer content.
- Added iOS form font sizing to prevent automatic zoom on focus.
- Added safe-area support for notched devices and installed PWAs.
- Improved the mobile menu for short landscape screens.
- Improved cookie-banner layout for narrow phones.
- Added touch-device performance simplification and reduced-motion support.
- Removed narrow-phone overlap risk in service capability signal rows.

## SEO upgrades applied

- Canonicals now point to the actual live GitHub Pages deployment by default.
- All important routes are statically pre-rendered during `npm run build`.
- Search engines receive meaningful page content in the initial HTML instead of only an empty React root.
- Unique page titles and meta descriptions are emitted into each generated HTML file.
- Open Graph and Twitter metadata are emitted per page.
- Added a 1200×630 KHIDevs social-sharing graphic.
- Added Organization, WebSite and ProfessionalService schema.
- Added Service and BreadcrumbList schema to each service page.
- Added author, Googlebot, canonical and language alternate metadata.
- Sitemap is generated automatically from the actual React route/service data with build-date `lastmod` values.
- Robots file is generated against the configured production URL.
- 404 is explicitly noindex.
- GitHub Pages direct route URLs receive real route-specific `index.html` files after build, improving both crawlability and direct-link reliability.

## Deployment behavior

The default build targets `/khidevs/` on `smhb0333.github.io`. Set `VITE_SITE_URL` and `VITE_BASE_PATH` when switching to a root custom domain.
