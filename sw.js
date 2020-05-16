const cacheName = 'PWA Provinces Argentina Api'
const staticAssets = [
    './',
    './index.html',
    './css/style.css',
    './icon/github.svg',
    './js/index.js',
    './js/event.js',
    './manifest.webmanifest'
]

self.addEventListener('install', async () => {
    const cache = await caches.open(cacheName)
    await cache.addAll(staticAssets)
    return self.skipWaiting()
})

self.addEventListener('activate', () => {
    self.clients.claim()
})

self.addEventListener('fetch', async e => {
    const req = e.request
    const url = new URL(req.url)

    if (url.origin === location.origin) {
        e.respondWith(cacheFirst(req))
    } else {
        e.respondWith(networkAndCache(req))
    }
})

async function cacheFirst(req) {
    const cache = await caches.open(cacheName)
    const cached = await cache.match(req)
    return cached || fetch(req)
}

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