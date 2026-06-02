# Alex & Jordan — Wedding Website

A fast, elegant, single-page wedding website inspired by [Joy (withjoy.com)](https://withjoy.com).
Pure HTML/CSS/JS — no build step, free to host.

## Sections
- **Hero** with a live countdown to the big day
- **Schedule** of events timeline
- **Venue** with map + directions
- **Travel & Hotels**
- **Registry** links
- **Gallery** with a click-to-expand lightbox
- **FAQ**
- **RSVP** form (submits via Formspree — no backend to run)

## Quick start (preview locally)

From this folder, start any static server:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Customize it

| What to change | Where |
| --- | --- |
| Names, date, location, all copy | `index.html` |
| Countdown date | `js/config.js` → `weddingDate` |
| Colors / fonts | `css/styles.css` → `:root` variables at the top |
| Photos | Replace the `picsum.photos` URLs in the Hero (CSS `.hero`) and Gallery (`index.html`) with your own images in an `assets/` folder |
| Venue map | Update the `<iframe>` `src` in the Venue section with your venue's [Google Maps embed link](https://support.google.com/maps/answer/144361) |
| Registry links | Update the three `<a href>` links in the Registry section |

## Connect the RSVP form

The RSVP form posts to [Formspree](https://formspree.io) (free tier works great):

1. Sign up at <https://formspree.io> and create a new form.
2. Copy your form ID (looks like `xyzabcd`).
3. In `index.html`, find `action="https://formspree.io/f/YOUR_FORM_ID"` and replace `YOUR_FORM_ID`.

Responses land in your Formspree dashboard and your email. Submissions are handled
without a page reload and show a thank-you message inline.

> Prefer **Netlify Forms**? Add `netlify` and a `name` attribute to the `<form>` tag,
> deploy on Netlify, and responses appear in your Netlify dashboard — no Formspree needed.

## Deploy (free)

**GitHub Pages**
1. Push this repo to GitHub.
2. Settings → Pages → Source: deploy from branch → `main` (or your branch), root.
3. Your site goes live at `https://<username>.github.io/<repo>/`.

**Netlify / Vercel**
- Drag-and-drop this folder onto <https://app.netlify.com/drop>, or connect the repo.
- No build command needed; publish directory is the project root.

---

Made with love. 💍
