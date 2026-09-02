const puppeteer = require("puppeteer");

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  try {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({ headless: true });

    console.log("Opening new page...");
    const page = await browser.newPage();

    console.log("Navigating to login page...");
    const response = await page.goto("https://omar2026.global.ssl.fastly.net/login.html", {
      waitUntil: "domcontentloaded",
    });
    console.log("Navigation status:", response.status());

    await wait(1000);
    console.log("Typing email...");
    await page.type("#email", "wronguser@example.com");

    await wait(1000);
    console.log("Typing password...");
    await page.type("#password", "wrongpassword");

    await wait(1000);
    console.log("Clicking submit...");
    await page.click('button[type="submit"]');

    await wait(1000);
    await browser.close();
    console.log("Done.");
  } catch (err) {
    console.error("Something went wrong:", err);
  }
})();
