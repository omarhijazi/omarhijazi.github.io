/**
 * Local test tool -- NOT part of the deployed site.
 * Run this on your own machine to generate real headless-browser
 * traffic against your Fastly domain, then check whether Fastly's
 * Bot Management redirected it to /bot.html.
 *
 * This traffic is what Fastly's Bot Management client-side script
 * (included in login.html's <head>) fingerprints; the actual
 * detection decision and redirect happen on Fastly's side (an
 * NGWAF rule matching the bot signal, action = redirect to
 * /bot.html), not in any JS on this site.
 *
 * Setup (one time):
 *   npm install puppeteer
 *
 * Run:
 *   node puppeteer-headless-test.js https://swag.yourdomain.com/login.html
 *
 * What to look for:
 *   - "Final URL" ending in /bot.html means Fastly's Bot Management
 *     flagged the session and its redirect rule fired.
 *   - "Final URL" still showing /login.html means it was not flagged
 *     by the current rule/sensitivity -- worth checking the NGWAF
 *     dashboard for the request's signal even if it wasn't redirected.
 */

const puppeteer = require("puppeteer");

async function main() {
  const url = process.argv[2];
  if (!url) {
    console.error("Usage: node puppeteer-headless-test.js <url>");
    process.exit(1);
  }

  console.log("Launching headless Chrome...");
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  page.on("console", (msg) => console.log("  [page console]", msg.text()));

  console.log("Navigating to:", url);
  const response = await page.goto(url, { waitUntil: "networkidle2" });

  console.log("");
  console.log("HTTP status:     ", response ? response.status() : "(no response)");
  console.log("Final page URL:  ", page.url());
  console.log(
    "Redirected to /bot.html?", page.url().indexOf("/bot.html") !== -1 ? "YES -- detection worked" : "no"
  );

  await browser.close();
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
