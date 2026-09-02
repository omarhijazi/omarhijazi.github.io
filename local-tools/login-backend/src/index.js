/// <reference types="@fastly/js-compute" />

// Deploy this as its own small Fastly Compute service (separate from
// your main VCL/GitHub Pages service). Route /api/login to this
// service's domain as a backend in your main service's Content
// settings (path-based host routing), so the Next-Gen WAF still
// inspects the request first, then forwards it here.

const CORRECT_PASSWORD = "demo1234";

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
  const req = event.request;

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const bodyText = await req.text();
  const params = new URLSearchParams(bodyText);
  const password = params.get("password") || "";

  // This is the real check. Whatever password actually arrives here
  // decides the outcome -- the real one from the client, or the
  // swapped garbage value Fastly's Deception rule substitutes in.
  if (password === CORRECT_PASSWORD) {
    return new Response(JSON.stringify({ result: "success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ result: "invalid" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}
