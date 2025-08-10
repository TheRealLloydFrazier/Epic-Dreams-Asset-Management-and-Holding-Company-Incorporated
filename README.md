Epic Dreams Asset Management and Holding Company, Incorporated — website
=======================================================================

Static, accessible site for the parent company and subsidiaries.

Quick start
-----------

- Open `index.html` in a browser.
- Save your logo image as `assets/logo.png` (PNG ~800–1200px wide). The page hides the image gracefully if missing.

Deployment
----------

- GitHub Pages via Actions is configured in `.github/workflows/deploy.yml`.
- In GitHub Settings → Pages, select “GitHub Actions” and deploy.

Editing content
---------------

- Update content in `index.html` sections: `#about`, `#subsidiaries`, `#leadership`, `#governance`, `#contact`.
- Contact emails are in the Contact section.
- `sitemap.xml` contains a placeholder domain; update after you attach a domain.

Assets
------

- `assets/styles.css` — site styles
- `assets/script.js` — small enhancement (current year)
- `assets/favicon.svg` — favicon
- `assets/logo.png` — add the logo file here

SEO
---

- Includes Schema.org `Corporation` structured data (no personally identifying owner details) and Open Graph/Twitter metadata.

DNS (Google Domains / Workspace)
--------------------------------

Canonical domain: `epicdreamsassetmanagement.com`

Records to create/update:

- Apex `@` — A records (four):
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
- `www` — CNAME: `TheRealLloydFrazier.github.io`

Notes:
- Keep existing MX records for Google Workspace email.
- Remove any conflicting A/AAAA/CNAME records for `@` or `www` before adding the above.
- In the repo Settings → Pages, ensure HTTPS is enforced. The `CNAME` file in the repo sets the custom domain.
