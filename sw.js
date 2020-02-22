importScripts("helpers/sw-polyfill.js");
importScripts("helpers/thirdparty.js");

var CACHED = [
  "/",
  "index.html",
  "assets/favicon.png",
  "styles.css",
  "helpers/sw-helper.js",
  "helpers/sw-polyfill.js",
  "helpers/thirdparty.js",
  "index.js"
]
  .concat(THIRDPARTY_URLS.dependencies)
  .concat(THIRDPARTY_URLS.gifs);

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open("valen10").then(function(cache) {
      return cache.addAll(CACHED);
    })
  );
});

self.addEventListener("fetch", function(event) {
  console.log(event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.response);
    })
  );
});
