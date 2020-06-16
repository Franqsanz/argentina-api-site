const cacheName = 'PWA Provinces Argentina Api'
const staticAssets = [
    './',
    './index.html',
    './css/style.css',
    './css/font.css',
    './icon/github.svg',
    './icon/favicon.ico',
    './icon/logo192.png',
    './icon/logo512.png',
    './icon/plus.svg',
    './js/index.js',
    './js/event.js',
    './font/operator/OperatorMono-Book.otf',
    './font/operator/OperatorMono-BookItalic.otf',
    './font/operator/OperatorMono-Light.otf',
    './font/operator/OperatorMono-Medium.otf',
    './manifest.json'
]

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(cacheName)
        .then(cache => cache.addAll(staticAssets))
        .then(() => self.skipWaiting())
    )
})

self.addEventListener('activate', (event) => {
    const newCache = [];
    newCache.push(cacheName);

    event.waitUntil(
        caches.keys().then((cacheName) => {
            Promise.all(
                cacheName.map((cacheName) => {
                    if (!newCache.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
});

self.addEventListener('fetch', event => {
    const req = event.request
    const url = new URL(req.url)

    if (url.origin === location.origin) {
        event.respondWith(
            caches.open(cacheName)
                .then(cache => cache.match(req, { ignoreSearch: true }))
                .then(res => (req.cache !== 'only-if-cached' || req.mode === 'same-origin') ? (res || fetch(req)) : res
                ));
    } else {
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