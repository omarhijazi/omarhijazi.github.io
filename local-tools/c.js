const puppeteer = require("puppeteer");

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const pages = await browser.pages();
  await pages[0].close(); // closes the default blank tab

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/120.0.0.0 Safari/537.36"
  );

  await page.goto("https://omar2026.global.ssl.fastly.net/login.html", { waitUntil: "networkidle0" });

  await wait(1000);
  await page.type("#email", "wronguser@example.com");

  await wait(1000);
  await page.type("#password", "wrongpassword");

  await wait(1000);
  await page.click('button[type="submit"]');

  await wait(1000);
  await browser.close();
})();

