const CACHE_NAME='khidevs-pwa-v3';

function basePath(){
  return new URL(self.registration.scope).pathname;
}

self.addEventListener('install',(event)=>{
  const base=basePath();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache)=>cache.addAll([
        base,
        `${base}site.webmanifest`,
        `${base}assets/img/favicon.svg`,
        `${base}assets/img/og-khidevs.png`,
        `${base}assets/icons/icon-192.png`,
        `${base}assets/icons/icon-512.png`,
        `${base}assets/icons/apple-touch-icon.png`
      ]))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',(event)=>{
  event.waitUntil(
    caches.keys()
      .then((keys)=>Promise.all(keys.filter((key)=>key!==CACHE_NAME).map((key)=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',(event)=>{
  const request=event.request;
  if(request.method!=='GET') return;

  const url=new URL(request.url);
  if(url.origin!==self.location.origin) return;

  if(request.mode==='navigate'){
    event.respondWith(
      fetch(request)
        .then((response)=>{
          if(response.ok){
            const copy=response.clone();
            caches.open(CACHE_NAME).then((cache)=>cache.put(request,copy));
          }
          return response;
        })
        .catch(async()=>{
          const cached=await caches.match(request);
          if(cached) return cached;
          return caches.match(basePath());
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached)=>{
      if(cached) return cached;
      return fetch(request).then((response)=>{
        if(response && response.ok){
          const copy=response.clone();
          caches.open(CACHE_NAME).then((cache)=>cache.put(request,copy));
        }
        return response;
      });
    })
  );
});
