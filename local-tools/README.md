# local-tools/

Everything in this folder runs on your own machine -- it's not part of
the deployed site. You can delete this folder from your published
GitHub Pages branch, or leave it (it's inert, nothing on the site
links to it).

## ai-traffic-test.js

Sends requests to a URL on your site with the GPTBot, ClaudeBot, and a
plain-browser User-Agent, one after another, so you can compare how
Fastly treats each. Node can set any User-Agent it wants (unlike
browser JS, which is blocked from doing this) -- that's why this has
to run locally instead of as a button on the site.

Requires Node 18+ (for built-in `fetch`). Check with `node -v`.

Run:
```
node ai-traffic-test.js
node ai-traffic-test.js https://hello.omarfoobar.com/blog/article-2.html
```

Then check the Fastly UI (Security -> Bot Management / AI Bot
Management dashboard) for the three requests and compare how each was
classified.

## puppeteer-login-test.js

Launches headless Chrome, loads the login page, waits for Fastly's Bot
Management client-side script to fingerprint the session, then
actually types into the email/password fields and clicks **Sign in**
-- a real automated form submission.

Setup (one time):
```
npm install puppeteer
```

Run with defaults (correct demo credentials, single attempt):
```
node puppeteer-login-test.js
```

Run against a specific URL / credentials:
```
node puppeteer-login-test.js https://hello.omarfoobar.com/login.html demo@fastlyswag.com demo1234
```

Run several attempts back to back (credential-stuffing style, useful
for testing Bot Management or Edge Rate Limiting):
```
node puppeteer-login-test.js https://hello.omarfoobar.com/login.html demo@fastlyswag.com wrongpass 5
```

The script prints, per attempt, whether it ended up on:
- `/bot.html` -- Fastly's Bot Management flagged the session
- `/account.html` -- login succeeded, not flagged
- still on `/login.html` -- prints the inline error text if the
  credentials were simply wrong
