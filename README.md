# Al-Madinah Quran and Sunnah Academy — Five-Page Static Site

This package is now a focused five-page website:

1. `index.html` — Home
2. `about.html` — Academy, mission, method, and teachers
3. `programs.html` — Arabic, Quran recitation, kids, Islamic Studies, and private support
4. `student-life.html` — Gallery, class rhythm, and family experience
5. `contact.html` — Contact and enrollment request

## Shared header and footer
The page header and footer live in `partials/header.html` and `partials/footer.html`. Update those files for shared navigation labels, logo markup, CTA text, footer columns, and shared social icon markup.

Each page keeps only its unique body content inside `<main id="main-content">`. The shared partials are loaded by `assets/js/main.js`, so preview the site through the local server instead of opening the HTML files directly from `file://`.

## Social, phone, and email links
Edit `assets/js/main.js` to update `SOCIAL_LINKS`, `CONTACT_PHONE`, and `CONTACT_EMAIL`. Those values are applied automatically anywhere the shared partials or page content use the matching `data-social`, `data-phone-*`, or `data-email-*` attributes.

## Contact form
The contact form validates required fields on the front end. By default it uses a static `mailto:` fallback so the visitor's email app opens with the request prepared.

For production, set `CONTACT_FORM_ENDPOINT` in `assets/js/main.js` to a Formspree endpoint, Netlify Function URL, or another form endpoint that accepts `POST` form data. When that endpoint is configured, the same form submits with `fetch()` and shows success/error states on the page.

## Uploading
Upload all files and folders together to your hosting folder, usually `public_html`.
