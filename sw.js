const CACHE_NAME = 'xixi-fox-yellow-v12';
const APP_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './fox-app-icon.png',
  './top-avatar.png',
  './fox-splash.png',
  './icon-lang.svg',
  './icon-math.svg',
  './icon-eng.svg',
  './icon-rhyme.svg',
  './icon-music.svg',
  './icon-lesson.svg',
  './icon-ext.svg',
  './icon-other.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  const isFreshMetadata = requestUrl.pathname.endsWith('/manifest.webmanifest') ||
    requestUrl.pathname.endsWith('/index.html') ||
    requestUrl.pathname.endsWith('/icon-192.png') ||
    requestUrl.pathname.endsWith('/icon-512.png') ||
    requestUrl.pathname.endsWith('/apple-touch-icon.png');

  if (isFreshMetadata) {
    event.respondWith(
      fetch(event.request, { cache: 'reload' })
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
