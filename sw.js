const CACHE_NAME = 'focacciafriday-v3';
const ASSETS = [
  '/FocacciaFriday/',
  '/FocacciaFriday/index.html',
  '/FocacciaFriday/manifest.json',
  '/FocacciaFriday/icons/icon-192.png',
  '/FocacciaFriday/icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetched = fetch(e.request).then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return response;
      }).catch(() => cached);
      return cached || fetched;
    })
  );
});

/* Timer scheduling from the page */
let timerTimeout = null;
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE_TIMER') {
    if (timerTimeout) clearTimeout(timerTimeout);
    const delay = e.data.endTime - Date.now();
    if (delay <= 0) {
      showTimerNotification(e.data.title || 'Timer done!');
      return;
    }
    // Keep SW alive with waitUntil + setTimeout
    e.waitUntil(new Promise(resolve => {
      timerTimeout = setTimeout(() => {
        showTimerNotification(e.data.title || 'Timer done!');
        resolve();
      }, delay);
    }));
  }
  if (e.data && e.data.type === 'CANCEL_TIMER') {
    if (timerTimeout) { clearTimeout(timerTimeout); timerTimeout = null; }
  }
});

function showTimerNotification(body) {
  self.registration.showNotification('FocacciaFriday', {
    body: body,
    icon: 'icons/icon-192.png',
    tag: 'ff-timer',
    renotify: true,
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    requireInteraction: true
  });
}

/* Notification click — focus or open the app */
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({type: 'window', includeUncontrolled: true}).then(list => {
      for (const c of list) {
        if (c.url.includes('FocacciaFriday') && 'focus' in c) return c.focus();
      }
      return clients.openWindow('/FocacciaFriday/');
    })
  );
});
