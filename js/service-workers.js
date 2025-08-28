var CACHE_NAME = 'pickup-cache-v2.0.0-beta';
var urlsToCache = [
    '/',
    'js/service-workers.js?v=2.0.0-beta',
    'js/pickup.js?v=2.0.0-beta',
    'css/style.css?v=2.0.0-beta',
    'assets/pickup-logo-32x32.png',
    'assets/pickup-logo-192x192.png',
    'assets/pickup-logo-180x180.png'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
            .then(function() {
                return self.skipWaiting();
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
            .catch(function() {
                // Handle any errors from both match and fetch
                return new Response('Oops, something went wrong');
            })
    );
});

// TODO: add update strategy
