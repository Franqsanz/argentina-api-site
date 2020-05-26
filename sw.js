const cacheName = 'PWA Provinces Argentina Api'
const staticAssets = [
    './',
    './index.html',
    './css/style.css',
    './icon/github.svg',
    './icon/favicon.ico',
    // './favicon.svg',
    './js/index.js',
    './js/event.js',
    './manifest.json'
]

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(cacheName)
        .then(cache => cache.addAll(staticAssets))
        .then(() => self.skipWaiting())
    )
})

self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))

self.addEventListener('fetch', event => {
    // event.respondWith(caches.open(cacheName)
    //     .then(cache => cache.match(event.request, { ignoreSearch: true }))
    //     .then(res => (event.request.cache !== 'only-if-cached' || event.request.mode === 'same-origin') ? (res || fetch(event.request)) : res))

    const req = event.request
    const url = new URL(req.url)

    if (url.origin === location.origin) {
        // event.respondWith(cacheFirst(req))
        event.respondWith(
            caches.open(cacheName)
                .then(cache => cache.match(req, { ignoreSearch: true }))
                .then(res => (req.cache !== 'only-if-cached' || req.mode === 'same-origin') ? (res || fetch(req)) : res
                ));
    } else {
        // event.waitUntil(networkAndCache(req)
        //     .then(refresh));
        event.respondWith(networkAndCache(req))
    }
})

// async function cacheFirst(req) {
//     const cache = await caches.open(cacheName)
//     const cached = await cache.match(req)
//     return cached || fetch(req)
// }

async function networkAndCache(req) {
    const cache = await caches.open(cacheName)
    try {
        const fresh = await fetch(req)
        await cache.put(req, fresh.clone())
        return fresh
    } catch (error) {
        const cached = await cache.match(req)
        return cached
    }
}

function refresh(res) {
    return self.clients.matchAll()
        .then((clients) => {
            clients.forEach((client) => {
                let message = {
                    type: 'refresh',
                    url: res,
                    eTag: res.headers.get('ETag')
                };

                client.postMessage(JSON.stringify(message));
            });
        });
}