const CACHE_NAME = 'naptick-assets-v1';
const ASSETS_TO_CACHE = [
  // Images
  '/background-theme.png',
  '/src/assets/images/hero-bg.png',
  '/src/assets/images/product-hero.png',
  '/src/assets/images/product-hero1.png',
  '/src/assets/images/product-hero2.png',
  '/src/assets/images/product-hero3.png',
  '/src/assets/images/brand-logo/logo.png',
  '/src/assets/images/brand-logo/logo1.png',
  '/src/assets/images/app-section/app-bg1.png',
  '/src/assets/images/app-section/app-bg11.png',
  '/src/assets/images/app-section/app-bg2.png',
  '/src/assets/images/app-section/app-bg3.png',
  '/src/assets/images/app-section/app-bg4.png',
  '/src/assets/images/app-section/app-bg5.png',
  '/src/assets/images/app-section/app-product1.png',
  '/src/assets/images/app-section/app-product11.png',
  '/src/assets/images/app-section/app-product2.png',
  '/src/assets/images/app-section/app-product3.png',
  '/src/assets/images/app-section/app-product4.png',
  '/src/assets/images/app-section/app-store.png',
  '/src/assets/images/app-section/app-store1.png',
  '/src/assets/images/ring-features/R1.png',
  '/src/assets/images/ring-features/R2.png',
  '/src/assets/images/ring-features/R3.png',
  '/src/assets/images/ring-features/R4.png',
  '/src/assets/images/ring-features/R5.png',
  '/src/assets/images/storytelling/story-1.jpg',
  '/src/assets/images/storytelling/story-2.jpg',
  '/src/assets/images/storytelling/story-3.jpg',
  '/src/assets/images/storytelling/story-4.jpg',
  // Videos
  '/intro-video1.mp4',
  '/inside-naphome.mp4',
  '/naptick-full.mp4',
  '/sleep-problems.mp4',
  '/src/assets/videos/intro-video.mp4'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching assets...');
        // Cache core assets immediately
        return cache.addAll([
          '/',
          '/static/js/bundle.js',
          '/static/css/main.css',
          '/manifest.json'
        ]);
      })
      .then(() => {
        // Cache large assets in background
        return caches.open(CACHE_NAME).then(cache => {
          return Promise.allSettled(
            ASSETS_TO_CACHE.map(url => 
              cache.add(url).catch(err => {
                console.log(`Failed to cache ${url}:`, err);
                return null;
              })
            )
          );
        });
      })
      .then(() => {
        console.log('Assets cached successfully');
        return self.skipWaiting();
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache when available
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip caching for API calls
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('viralloops') ||
      event.request.url.includes('analytics')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Serving from cache:', event.request.url);
          return cachedResponse;
        }

        // Otherwise fetch from network and cache
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Check if it's an asset we want to cache
            const url = event.request.url;
            const shouldCache = ASSETS_TO_CACHE.some(asset => url.includes(asset)) ||
                              url.includes('.png') || 
                              url.includes('.jpg') || 
                              url.includes('.jpeg') ||
                              url.includes('.mp4') ||
                              url.includes('.svg') ||
                              url.includes('.css') ||
                              url.includes('.js');

            if (shouldCache) {
              // Clone the response before caching
              const responseToCache = response.clone();
              
              caches.open(CACHE_NAME)
                .then((cache) => {
                  console.log('Caching new asset:', event.request.url);
                  cache.put(event.request, responseToCache);
                });
            }

            return response;
          })
          .catch((error) => {
            console.log('Fetch failed:', error);
            // Return a fallback for images if cache miss and network failure
            if (event.request.destination === 'image') {
              return new Response('', { status: 404, statusText: 'Image not found' });
            }
            throw error;
          });
      })
  );
});

// Handle message events for cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_CACHE_SIZE') {
    caches.open(CACHE_NAME).then(cache => {
      cache.keys().then(keys => {
        event.ports[0].postMessage({
          type: 'CACHE_SIZE',
          size: keys.length
        });
      });
    });
  }
});