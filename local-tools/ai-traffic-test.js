/**
 * Local test tool -- NOT part of the deployed site.
 * Sends a request to a URL on your Fastly domain with a specific
 * User-Agent, so you can see how Fastly (AI Bot Management, if
 * enabled) classifies each one. Node can set any User-Agent it wants
 * -- this isn't possible from browser JS, which is why this has to
 * run locally instead of as a button on the site.
 *
 * Requires Node 18+ (for global fetch). Check with: node -v
 *
 * Run:
 *   node ai-traffic-test.js
 *   node ai-traffic-test.js https://hello.omarfoobar.com/blog/article-2.html
 */

const UAS = {
  chatgpt: "Mozilla/5.0 (compatible; GPTBot/1.1; +https://openai.com/gptbot)",
  claude: "Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",
  "plain-browser": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
};

async function testUA(label, ua, url) {
  const res = await fetch(url, { headers: { "User-Agent": ua } });
  const headersOfInterest = ["x-cache", "x-served-by", "cf-ray", "content-type"];
  console.log(`\n--- ${label} ---`);
  console.log("User-Agent sent: ", ua);
  console.log("Status:          ", res.status);
  headersOfInterest.forEach((h) => {
    const v = res.headers.get(h);
    if (v) console.log(`${h}:`.padEnd(18), v);
  });
}

async function main() {
  const url = process.argv[2] || "https://hello.omarfoobar.com/blog/article-1.html";
  console.log("Target URL:", url);

  for (const [label, ua] of Object.entries(UAS)) {
    await testUA(label, ua, url);
  }

  console.log(
    "\nNow check the Fastly UI (Security -> Bot Management -> Dashboard, or AI Bot" +
    "\nManagement if it's a separate section) for these three requests -- the GPTBot" +
    "\nand ClaudeBot ones should show up classified as verified AI crawlers, distinct" +
    "\nfrom the plain-browser one."
  );
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
