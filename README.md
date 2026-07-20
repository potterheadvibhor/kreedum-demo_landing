# KreedumSports

A landing page for Kreedum International Private Limited, built with React, Vite, and Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

Output goes to the `dist/` folder — upload its contents to any static host
(Netlify, Vercel, GitHub Pages, cPanel, etc.).

## Project structure

```
kreedum-sports/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx                  # React entry point
    ├── App.jsx                   # Renders the landing page
    ├── index.css                 # Tailwind directives
    └── KreedumSportsLanding.jsx   # The actual landing page component
```

## Notes / things to finish

- **Second store location**: the Locations section has placeholder text
  for the second store's address, phone, and hours — search
  `KreedumSportsLanding.jsx` for "to confirm" and fill in the real details.
- **Contact form**: the form UI works (validation, submit state) but does
  not send email anywhere yet. To wire it up:
  - Sign up for a free [EmailJS](https://www.emailjs.com/) or
    [Formspree](https://formspree.io/) account.
  - Replace the `handleSubmit` function inside the `ContactForm` component
    in `KreedumSportsLanding.jsx` with a call to that service's API.
- **Photos**: currently uses free Unsplash stock photos as placeholders.
  Swap in real photos of the stores/products by replacing the URLs in the
  `PHOTOS` object near the top of `KreedumSportsLanding.jsx`.
