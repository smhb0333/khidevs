# KHIDevs — Custom Agency Portfolio Website

A mobile-first, single-page business portfolio built with HTML5, CSS3, JavaScript and Bootstrap 5, with GSAP, ScrollTrigger, Lenis and Lucide icons loaded from CDNs.

## Run locally

You can open `index.html` directly, but a local web server is recommended:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Files

- `index.html` — semantic page structure and content
- `assets/css/style.css` — complete visual system, responsive layouts and mobile hardening
- `assets/js/main.js` — animations, filtering, modal case studies, navigation, form logic
- `assets/img/favicon.svg` — site favicon

## Before production launch

1. Replace the concept portfolio cards with verified KHIDevs project work and real outcomes.
2. Confirm the contact email. The static form currently opens a pre-filled email to `hello@khidevs.com`.
3. If you want server-side form delivery, replace the mailto handler in `assets/js/main.js` with your API/Formspree/Netlify endpoint.
4. Add your real social links, legal pages, analytics and SEO verification tags.
5. If you need strict offline operation, download and self-host the external CDN libraries/fonts.

## Responsive targets

The CSS includes dedicated behavior for:
- Small phones (~320–430px)
- Standard phones / tablets (<768px)
- Tablets / smaller laptops (<992px)
- Laptops / desktops
- Large / ultrawide screens (1800px+)
- `prefers-reduced-motion`

The page deliberately uses `overflow-x:hidden`, fluid type (`clamp()`), flexible grids, min-width guards and mobile-specific recomposition to prevent unwanted horizontal scrolling or clipped layouts.
