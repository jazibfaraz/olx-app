// var dataCacheName = 'cointoss-v2';
var cacheName = 'olx-v1';

var filesToCache = [
    '/index.html',
    '/signin.html',
    '/signup.html',
    '/submit-form.html',
    '/categories/mobile.html',
    '/categories/animals.html',
    '/categories/bikes.html',
    '/categories/books-sports-hobbies.html',
    '/categories/business-industrial-agriculture-.html',
    '/categories/electronics-appliances.html',
    '/categories/fashion-beauty.html',
    '/categories/furniture-home-decor.html',
    '/categories/jobs.html',
    '/categories/kids.html',
    '/categories/property.html',
    '/categories/services.html',
    '/categories/vehicles.html',
    '/js/app.js',
    // '/js/manifest.json',
    // '/js/service-worker.js',
    '/css/main.css',
    '/images/image-banner1.jpg',
    '/images/img-banner.jpg',
    '/images/animal.jpg',
    '/images/animals.gif',
    '/images/beauty.gif',
    '/images/bike.gif',
    '/images/bikes.jpg',
    '/images/books.jpg',
    '/images/business-industrial.gif',
    '/images/exclusive.gif',
    '/images/fashion.jpg',
    '/images/football.gif',
    '/images/home-appliances.gif',
    '/images/home-decor.gif',
    '/images/home-decoration.jpg',
    '/images/industrial.jpg',
    '/images/jobs.gif',
    '/images/jobs.jpg',
    '/images/kids.gif',
    '/images/kids.jpg',
    '/images/main-banner.gif',
    '/images/mobile.gif',
    '/images/property.gif',
    '/images/property.jpg',
    '/images/services.gif',
    '/images/services.jpg',
    '/images/vehicles.gif',
    '/images/vehicles.jpg',
    // '/images/icon-32x32.png',

];


self.addEventListener('install', function (e) {
    console.log('ServiceWorker is Installed');
    self.skipWaiting();
    e.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                console.log('[ServiceWorker] Caching app shell', cacheName, cache);
                return cache.addAll(filesToCache);
            })
    );
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys()
        .then(function (keyList) {
            console.log(keyList, 'keys')
            return Promise.all(keyList.map(function (key) {
                console.log(key, keyList, '****')
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    
    // return self.clients.claim();
});




self.addEventListener('fetch', function (e) {
    console.log('[Service Worker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
    
});