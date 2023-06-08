const sCacheName = "hello-pwa";
const aFilesToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./images/hello-pwa.png",
];

self.addEventListener("install", (e) => {
  console.log("서비스 워커 설치");
  e.waitUntil(
    caches.open(sCacheName).then((pCache) => {
      console.log("캐시 파일 저장");
      return pCache.addAll(aFilesToCache);
    })
  );
});
self.addEventListener("activate", (e) => {
  console.log("서비스워커 실행 중");
});
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches
      .match(e.request)
      .then((response) => {
        if (!response) {
          console.log("네트워크 데이터 요청", e.request);
          return fetch(e.request);
        }
        console.log("캐시에서 데이터 요청", e.request);
        return response;
      })
      .catch((err) => {
        console.log(err);
      })
  );
});
