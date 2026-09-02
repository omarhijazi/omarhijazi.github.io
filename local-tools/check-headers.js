const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  page.on("request", (req) => {
    if (req.url().includes("login.html")) {
      console.log("\n--- Request ---");
      console.log(req.method(), req.url());
      console.log(req.headers());
    }
  });

  await page.goto("https://omar2026.global.ssl.fastly.net/login.html", { waitUntil: "networkidle0" });

  console.log("Browser is open. Log in manually with the form and watch this terminal for headers.");
})();
