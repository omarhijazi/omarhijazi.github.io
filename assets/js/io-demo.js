/**
 * Image Optimizer playground — tiny, no dependencies.
 * Keeps a small state object, rebuilds the query string on every
 * change, and points the preview <img> + a visible URL string at it.
 *
 * Note: on GitHub Pages / localhost the image itself won't actually
 * change (there's no IO service processing the query string here) --
 * that only happens once you view this same URL through your Fastly
 * domain with Image Optimizer turned on. This panel just builds the
 * correct URL for you to copy or click through on that domain.
 */

const ioState = {
  image: "hero.jpg",
  width: null,
  format: null,
  quality: null,
};

function ioSetImage(name) {
  ioState.image = name;
  ioRebuild();
}

function ioSetWidth(w) {
  ioState.width = w;
  ioRebuild();
}

function ioSetFormat(f) {
  ioState.format = f;
  ioRebuild();
}

function ioSetQuality(q) {
  ioState.quality = q;
  ioRebuild();
}

function ioReset() {
  ioState.width = null;
  ioState.format = null;
  ioState.quality = null;
  ioRebuild();
}

function ioBuildUrl() {
  const params = new URLSearchParams();
  if (ioState.width) params.set("width", ioState.width);
  if (ioState.format) params.set("format", ioState.format);
  if (ioState.quality) params.set("quality", ioState.quality);
  const qs = params.toString();
  return `images/${ioState.image}${qs ? "?" + qs : ""}`;
}

function ioRebuild() {
  const url = ioBuildUrl();
  const img = document.getElementById("io-preview");
  const out = document.getElementById("io-url");
  if (img) img.src = url;
  if (out) out.textContent = url;

  // highlight active buttons
  document.querySelectorAll("[data-io-image]").forEach((el) =>
    el.classList.toggle("active", el.getAttribute("data-io-image") === ioState.image)
  );
  document.querySelectorAll("[data-io-width]").forEach((el) =>
    el.classList.toggle("active", el.getAttribute("data-io-width") === String(ioState.width))
  );
  document.querySelectorAll("[data-io-format]").forEach((el) =>
    el.classList.toggle("active", el.getAttribute("data-io-format") === ioState.format)
  );
  document.querySelectorAll("[data-io-quality]").forEach((el) =>
    el.classList.toggle("active", el.getAttribute("data-io-quality") === String(ioState.quality))
  );
}

document.addEventListener("DOMContentLoaded", ioRebuild);
