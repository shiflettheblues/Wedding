# Deploying to Vercel — KayalMoreno.com

This is a plain static site (no build step). Vercel just serves the files in
this repo. `vercel.json` is already set up with clean URLs, caching, and basic
security headers, so there's nothing to configure on the build side.

## 1. Import the project

1. Go to <https://vercel.com/new> and sign in with GitHub.
2. **Import** the repository `shiflettheblues/wedding`.
3. When prompted for settings:
   - **Framework Preset:** `Other`
   - **Build Command:** leave empty
   - **Output Directory:** leave empty (Vercel serves the repo root)
   - **Root Directory:** `./`
4. Click **Deploy**. You'll get a live `*.vercel.app` URL in ~20 seconds.

## 2. Point Vercel at the right branch

The site currently lives on the branch **`claude/wedding-registry-site-Mgv5Q`**.
By default Vercel treats your repo's *default* branch as Production. Two options:

- **Easiest:** In Vercel → **Settings → Git → Production Branch**, set it to
  `claude/wedding-registry-site-Mgv5Q`. Redeploy.
- **Or** merge this branch into `main` (open a PR — just ask me) and let Vercel
  deploy `main` as Production.

## 3. Add the domain KayalMoreno.com

1. In Vercel → your project → **Settings → Domains**.
2. Add **`kayalmoreno.com`** and **`www.kayalmoreno.com`**.
   - Vercel will suggest a redirect — `www → apex` (or apex → www) is fine.
3. Vercel will show you the exact DNS records to add. They're typically:

   | Type  | Name | Value                     |
   | ----- | ---- | ------------------------- |
   | A     | `@`  | `76.76.21.21`             |
   | CNAME | `www`| `cname.vercel-dns.com`    |

   > Use the values **Vercel shows you** if they differ — those are authoritative.

   **Alternative (let Vercel manage DNS):** point your registrar's
   **nameservers** to the ones Vercel lists (e.g. `ns1.vercel-dns.com` /
   `ns2.vercel-dns.com`). This is simplest if you don't have other DNS records.

## 4. Wait for DNS + SSL

- DNS changes can take from a few minutes up to ~24 hours to propagate.
- Once verified, Vercel issues a free SSL certificate automatically — the site
  will be live at **https://kayalmoreno.com**. 🎉

## 5. Future updates

Every push to the Production branch auto-deploys. Pushes to other branches get
their own preview URL. So once it's set up, you (or I) just push and it's live.

---

### Things to finish before sharing the link
- [ ] Add `assets/save-the-date.png` (your illustration for the hero)
- [ ] Paste real registry / honeymoon-fund links (3 `href="#"` in `index.html`)
- [ ] Add your Formspree form ID to switch on RSVP
- [ ] Swap the placeholder gallery photos for your own
