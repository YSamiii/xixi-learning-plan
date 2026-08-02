const CACHE='xixi-enlightenment-v6-fox-icon';
const ASSETS=['./','./index.html?v=6','./manifest.webmanifest','./fox-icon-v6-192.png','./fox-icon-v6-512.png','./fox-touch-icon-v6.png','./fox-app-icon.png','./top-avatar.png','./icon-lang.svg','./icon-math.svg','./icon-eng.svg','./icon-rhyme.svg','./icon-music.svg','./icon-lesson.svg','./icon-ext.svg','./icon-other.svg'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{event.respondWith(fetch(event.request,{cache:'no-store'}).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;}).catch(()=>caches.match(event.request)));});
