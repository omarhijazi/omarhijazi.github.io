# local-tools/

Everything in this folder is meant to be run on your own machine, not
deployed to GitHub Pages. You can delete this folder from your repo's
published branch, or just leave it -- GitHub Pages serving it doesn't
cause any harm, it's just inert JS that nothing on the site links to.

## puppeteer-headless-test.js

Generates real headless-browser traffic against a URL you give it, and
reports whether Fastly's Bot Management redirected it to `/bot.html`.
The detection and redirect both happen on Fastly's side (via the Bot
Management client-side script tag in `login.html` plus an NGWAF rule
that redirects flagged sessions) -- this script just observes the
outcome.

Setup:
```
npm install puppeteer
```

Run:
```
node puppeteer-headless-test.js https://swag.yourdomain.com/login.html
```
