self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Fluidity";
  const options = {
    body: data.body || "Time to drink water!",
    icon: '/vite.svg',
    badge: '/vite.svg',
    vibrate: [100, 50, 100],
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// A background sync event is sometimes fired by the browser.
// This is the closest we can get to background without push servers on web.
self.addEventListener('sync', (event) => {
  if (event.tag === 'water-reminder-sync') {
    event.waitUntil(
      self.registration.showNotification("Fluidity", {
         body: "Su içme vakti geldi! (Time to drink water!)",
         icon: '/vite.svg'
      })
    );
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'TEST_NOTIFICATION') {
    self.registration.showNotification(event.data.title, {
      body: event.data.body,
      icon: '/vite.svg'
    });
  }
});
