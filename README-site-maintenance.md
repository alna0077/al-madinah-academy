# Al-Madinah Academy Site Maintenance

This is a static HTML/CSS/JS site. It uses shared partials for the header and footer, loaded by `assets/js/main.js`.

## Create a New Page

1. Duplicate `page-template.html` and rename the copy, for example `tuition.html`.
2. Update the `<title>` and meta description in the `<head>`.
3. Update `<body data-page="new-page">`. If you add a matching `data-nav-page` item in the header, this value controls the active nav state.
4. Keep page-specific content inside `<main id="main-content" tabindex="-1">`.
5. Edit the page hero title, text, eyebrow, and optional `--page-image`.
6. Keep these shared pieces unchanged:
   - `<div id="site-header" data-include="partials/header.html"></div>`
   - `<div id="site-footer" data-include="partials/footer.html"></div>`
   - `<script src="assets/js/main.js"></script>`

Use the local preview server when testing partials and posts:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open `http://127.0.0.1:4173/index.html`.

## Update Shared Header and Footer

- Header markup: `partials/header.html`
- Footer markup: `partials/footer.html`
- Header/footer styling: `assets/css/style.css`

Do not paste full header/footer markup into individual pages. Update the partials once.

## Update Contact Details and Social Links

Edit `assets/js/main.js`:

- `SOCIAL_LINKS`
- `CONTACT_PHONE`
- `CONTACT_EMAIL`
- `CONTACT_FORM_ENDPOINT`
- `CONTACT_FORM_ENCODING`

The same settings are applied anywhere the site uses `data-social`, `data-phone-*`, or `data-email-*` attributes.

## Activate the Production Contact Form

The contact form already validates name, email, and message, shows loading/success/error states, and falls back to a prepared email when no endpoint is configured.

Recommended static-form setup:

1. Create a form endpoint with a service such as Formspree, Basin, or another static form provider.
2. Copy the endpoint URL.
3. In `assets/js/main.js`, set:

```js
const CONTACT_FORM_ENDPOINT = "https://your-form-provider-endpoint";
const CONTACT_FORM_ENCODING = "form-data";
```

For Netlify Forms, keep the form `name="enrollment-request"` and hidden `form-name` field. If you submit through JavaScript to Netlify, use:

```js
const CONTACT_FORM_ENDPOINT = "/";
const CONTACT_FORM_ENCODING = "urlencoded";
```

If `CONTACT_FORM_ENDPOINT` is blank, the site uses a `mailto:` fallback. This is useful for testing, but a real endpoint is preferred for production.

## Add News, Announcements, Events, or Articles

Posts are stored in `data/posts.json` and displayed by:

- Listing page: `news.html`
- Detail page: `post.html?slug=your-post-slug`
- Script: `assets/js/posts.js`

To add a new post:

1. Add any post image to `assets/images/`.
2. Add a new object to `data/posts.json`.
3. Use a unique `slug` with lowercase words and hyphens.
4. Fill in `title`, `date`, `category`, `excerpt`, `image`, `alt`, `content`, `featured`, and `tags`.
5. Open `news.html` on the local server and check the card.
6. Open `post.html?slug=your-post-slug` and check the detail page.

Example post object:

```json
{
  "title": "Sample Academy Announcement",
  "slug": "sample-academy-announcement",
  "date": "2026-06-10",
  "category": "Announcements",
  "excerpt": "Short summary for the news listing card.",
  "image": "assets/images/classroom-tv.webp",
  "alt": "Useful image description",
  "featured": false,
  "tags": ["Announcements"],
  "content": [
    "First paragraph of the post.",
    "Second paragraph of the post."
  ]
}
```

Clean URLs such as `/news/sample-academy-announcement/` require hosting/server configuration. This static version uses `post.html?slug=sample-academy-announcement`.
