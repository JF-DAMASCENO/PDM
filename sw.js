const CACHE_NAME = "meu-pwa-cache-v1";
const urlsToCache = [
  "/PDM/",
  "/PDM/index.html",
  "/PDM/style.css",
  "/PDM/sobre.html",
  "/PDM/servicos.html",
  "/PDM/contato.html",
  "/PDM/app.js"
];

// Instalação: Armazenar arquivos no cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Cache aberto");
      return cache.addAll(urlsToCache);
    })
  );
});

// Busca: Responde com o cache ou faz requisição
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Retorna do cache
      }
      return fetch(event.request)
        .then((networkResponse) => {
          // Apenas armazena se for resposta válida
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== "basic"
          ) {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          // Aqui você pode colocar um fallback offline
          // return caches.match('/PDM/offline.html');
        });
    })
  );
});

// Ativação: Limpa caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[Service Worker] Cache antigo deletado:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
