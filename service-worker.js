var cacheName = "webstore-v1";
var cacheFiles = [
    "new.html",
    "subjects.js",
    "webstore.webmanifest",
    "arabic logo.png",
    "chemistry logo.png",
    "english logo.png",
    "history logo.png",
    "ict logo.png",
    "law logo.png",
    "math logo.png",
    "pe logo.png",
    "physics logo.png",
    "robotics logo.png"
];

self.addEventListener('install', (e) => {
console.log('[Service Worker] Install');
e.waitUntil(    caches.open(cacheName).then((cache) => {
console.log('[Service Worker] Caching all the files');
return cache.addAll(cacheFiles);
}) 
);
});


/* self.addEventListener('fetch', function (e) {
    e.respondWith(
    caches.match(e.request).then(function (r) {
    console.log('[Service Worker] Fetching resource: ' + e.request.url);
        return r 
        }) 
        );
     }); */


     self.addEventListener('fetch', function (e) {
      e.respondWith(
    caches.match(e.request).then(function (r) {
         return r || fetch(e.request).then(function (response) {
             return caches.open(cacheName).then(function (cache) { 
             cache.put(e.request, response.clone());
             return response; 
             });
             });  
              })
                );
            });