const CACHE_NAME = 'naptick-assets-v5';
const PUBLIC_VIDEOS = [
  '/intro-video1.mp4',
  '/sleep-problems.mp4',
  '/inside-naphome.mp4',
  '/naptick-full.mp4'
];

// Install event - lightweight install, no video preloading
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing... (no preloading)');
  event.waitUntil(
    Promise.resolve().then(() => {
      console.log('✅ Service Worker ready - videos will cache after first load');
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
  // Skip ALL caching in development mode
  if (event.request.url.includes('localhost')) {
    console.log('🚫 Development mode - no caching:', event.request.url);
    return;
  }
  
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
          console.log('✅ Serving from cache:', event.request.url);
          return cachedResponse;
        }

        // Otherwise fetch from network and cache
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cache ALL static assets (images, videos, CSS, JS)
            const url = event.request.url;
            const isVideo = url.includes('.mp4');
            const isImage = url.includes('.png') || url.includes('.jpg') || url.includes('.jpeg') || url.includes('.svg');
            const isStatic = url.includes('/static/') || url.includes('.css') || url.includes('.js');
            
            const shouldCache = isVideo || isImage || isStatic;

            if (shouldCache) {
              // Clone the response before caching
              const responseToCache = response.clone();
              
              caches.open(CACHE_NAME)
                .then((cache) => {
                  const assetType = isVideo ? '🎥 VIDEO' : isImage ? '🖼️ IMAGE' : '📄 STATIC';
                  console.log(`💾 ${assetType} Caching:`, event.request.url);
                  cache.put(event.request, responseToCache);
                });
            } else {
              console.log('⏭️ Not caching:', event.request.url);
            }

            return response;
          })
          .catch((error) => {
            console.log('❌ Fetch failed:', error);
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