const puppeteer = require("puppeteer");

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://omar2026.global.ssl.fastly.net/login.html", { waitUntil: "networkidle0" });

  await wait(1000);
  await page.type("#email", "wronguser@example.com");

  await wait(1000);
  await page.type("#password", "wrongpassword");

  await wait(1000);
  await page.click('button[type="submit"]');
})();

