if (!self.define) {
  let e,
    a = {};
  const i = (i, n) => (
    (i = new URL(i + ".js", n).href),
    a[i] ||
      new Promise((a) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = i), (e.onload = a), document.head.appendChild(e);
        } else (e = i), importScripts(i), a();
      }).then(() => {
        let e = a[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, s) => {
    const o =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (a[o]) return;
    let r = {};
    const d = (e) => i(e, o),
      c = { module: { uri: o }, exports: r, require: d };
    a[o] = Promise.all(n.map((e) => c[e] || d(e))).then((e) => (s(...e), r));
  };
}
define(["./workbox-e9849328"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "24ba72da56129ac7b960419f98895676",
        },
        {
          url: "/_next/static/JMdNH8Op2252dJXh-WWrh/_buildManifest.js",
          revision: "9a6b5e090b3c3eb5e51eb864504ee154",
        },
        {
          url: "/_next/static/JMdNH8Op2252dJXh-WWrh/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/486-f32afcb333cc76f4.js",
          revision: "JMdNH8Op2252dJXh-WWrh",
        },
        {
          url: "/_next/static/chunks/77-c0671d101f467b6e.js",
          revision: "JMdNH8Op2252dJXh-WWrh",
        },
        {
          url: "/_next/static/chunks/8eb6f11a-b3fcd86453552aaf.js",
          revision: "JMdNH8Op2252dJXh-WWrh",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-872530f45fbd0e21.js",
          revision: "JMdNH8Op2252dJXh-WWrh",
        },
        {
          url: "/_next/static/chunks/app/layout-35fd913eb764815d.js",
          revision: "JMdNH8Op2252dJXh-WWrh",
        },
        {
          url: "/_next/static/chunks/app/page-7d4ff59355523851.js",
          revision: "JMdNH8Op2252dJXh-WWrh",
        },
        {
          url: "/_next/static/chunks/framework-49eb87332e63c800.js",
          revision: "JMdNH8Op2252dJXh-WWrh",
        },
        {
          url: "/_next/static/chunks/main-9d88d977be32d22f.js",
          revision: "JMdNH8Op2252dJXh-WWrh",
        },
        {
          url: "/_next/static/chunks/main-app-a720c8b9edd7fe78.js",
          revision: "JMdNH8Op2252dJXh-WWrh",
        },
        {
          url: "/_next/static/chunks/pages/_app-c92f4a4f65378a1b.js",
          revision: "JMdNH8Op2252dJXh-WWrh",
        },
        {
          url: "/_next/static/chunks/pages/_error-9703bacb1b6c266d.js",
          revision: "JMdNH8Op2252dJXh-WWrh",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-859f3c6838f1cbea.js",
          revision: "JMdNH8Op2252dJXh-WWrh",
        },
        {
          url: "/_next/static/css/80e6897492cf7ff8.css",
          revision: "80e6897492cf7ff8",
        },
        {
          url: "/_next/static/media/4473ecc91f70f139-s.p.woff",
          revision: "78e6fc13ea317b55ab0bd6dc4849c110",
        },
        {
          url: "/_next/static/media/463dafcda517f24f-s.p.woff",
          revision: "cbeb6d2d96eaa268b4b5beb0b46d9632",
        },
        {
          url: "/android/android-launchericon-144-144.png",
          revision: "f6baeb30a1fe4a0d1a112b0ccca3076a",
        },
        {
          url: "/android/android-launchericon-192-192.png",
          revision: "51fde512352871e924a2e3b58899e49a",
        },
        {
          url: "/android/android-launchericon-48-48.png",
          revision: "262b9592f777caec48d51748a456c1d9",
        },
        {
          url: "/android/android-launchericon-512-512.png",
          revision: "8ae52aa8e22208b2fb7b3967a819d521",
        },
        {
          url: "/android/android-launchericon-72-72.png",
          revision: "1793c19cbe85909482bd59ffec6c1aa9",
        },
        {
          url: "/android/android-launchericon-96-96.png",
          revision: "2d810b5576d1ca89a6dbb7cb4c517bdf",
        },
        { url: "/icons.json", revision: "5dbbc3fe59816e65ba28e355a58ea45c" },
        { url: "/ios/100.png", revision: "b5974b2fd2c916664a8aed7d13ddbd79" },
        { url: "/ios/1024.png", revision: "69d37af2326e8a2e339b1f60fa7a3eab" },
        { url: "/ios/114.png", revision: "9e9074bb7d1e404cbe1b7279cd127d21" },
        { url: "/ios/120.png", revision: "7b0f26a803b4743e0373acddae182fe4" },
        { url: "/ios/128.png", revision: "99c98f6531510e137531f96c895bd6ae" },
        { url: "/ios/144.png", revision: "f6baeb30a1fe4a0d1a112b0ccca3076a" },
        { url: "/ios/152.png", revision: "9d21a03fa69cd286c608619f310cec11" },
        { url: "/ios/16.png", revision: "d2fd5bd0ebe71c33fdd87701a4243bef" },
        { url: "/ios/167.png", revision: "507a4fc5f052b474dfe05768be7e449a" },
        { url: "/ios/180.png", revision: "5d828dc493dcd98a25c8fd11af8cd2e5" },
        { url: "/ios/192.png", revision: "51fde512352871e924a2e3b58899e49a" },
        { url: "/ios/20.png", revision: "228a138758bd08e18766aba147d52a25" },
        { url: "/ios/256.png", revision: "99e440fdd5620b1a6d138964cc68aeb3" },
        { url: "/ios/29.png", revision: "b958d7b82a7344dcdbe8554bd2c1d974" },
        { url: "/ios/32.png", revision: "dc22839c18fddfd75395f7bf0404c3af" },
        { url: "/ios/40.png", revision: "b5cdd590a2457b1cff98b816c7f02968" },
        { url: "/ios/50.png", revision: "b6dc2026d7d27dab0634ecb8109fd4ce" },
        { url: "/ios/512.png", revision: "8ae52aa8e22208b2fb7b3967a819d521" },
        { url: "/ios/57.png", revision: "121dd07fefa9764e20860adfbfe9086e" },
        { url: "/ios/58.png", revision: "a74d512e5d9651cfb819cb5bf0378226" },
        { url: "/ios/60.png", revision: "912742c6218d8320f33a8915e6b3c266" },
        { url: "/ios/64.png", revision: "9751e4e67227a5a07a9f6a3481084fef" },
        { url: "/ios/72.png", revision: "1793c19cbe85909482bd59ffec6c1aa9" },
        { url: "/ios/76.png", revision: "ba594964214f5d418ff6d5a2bb170ecd" },
        { url: "/ios/80.png", revision: "50773722006fc0e8d74f23ea9fb6e567" },
        { url: "/ios/87.png", revision: "250e2f3afe2c3e967f2eed5924d77a7c" },
        { url: "/manifest.json", revision: "a2dd1ffceb01fcd4fa8e5740bfc518ea" },
        { url: "/next.svg", revision: "8e061864f388b47f33a1c3780831193e" },
        {
          url: "/windows11/LargeTile.scale-100.png",
          revision: "9eb364cca9b9c7cb4763d0286a87b550",
        },
        {
          url: "/windows11/LargeTile.scale-125.png",
          revision: "b7fd1c0ae257a430cc47dd0711a7405a",
        },
        {
          url: "/windows11/LargeTile.scale-150.png",
          revision: "ee7885d4903773bce6b30056bdfd422f",
        },
        {
          url: "/windows11/LargeTile.scale-200.png",
          revision: "5a8900c467028571b936101dafaf694f",
        },
        {
          url: "/windows11/LargeTile.scale-400.png",
          revision: "574ca3517985205ea57d2b1aba266b9a",
        },
        {
          url: "/windows11/SmallTile.scale-100.png",
          revision: "f0b9575a8d9d08c19fa6a8b77d6861ee",
        },
        {
          url: "/windows11/SmallTile.scale-125.png",
          revision: "2e653f99491661b22e81ca5878ba13dc",
        },
        {
          url: "/windows11/SmallTile.scale-150.png",
          revision: "f591b8c19f268cea40f65fb057293794",
        },
        {
          url: "/windows11/SmallTile.scale-200.png",
          revision: "60533c8f5450ef16002626141b7b32c2",
        },
        {
          url: "/windows11/SmallTile.scale-400.png",
          revision: "9bf4b844e9f0d33fb43c6c18e7cd3996",
        },
        {
          url: "/windows11/SplashScreen.scale-100.png",
          revision: "958e5d840820be9fcf2c1a66a98600fe",
        },
        {
          url: "/windows11/SplashScreen.scale-125.png",
          revision: "ab60c490b82e62c87898fda31472a1d7",
        },
        {
          url: "/windows11/SplashScreen.scale-150.png",
          revision: "0830793583755c1281f1c516665e00fb",
        },
        {
          url: "/windows11/SplashScreen.scale-200.png",
          revision: "e2b1c27be5f6bd49ee1445c240bbe8ac",
        },
        {
          url: "/windows11/SplashScreen.scale-400.png",
          revision: "c09de70476ac36ca28effb4200426dc9",
        },
        {
          url: "/windows11/Square150x150Logo.scale-100.png",
          revision: "73d27581cc0dae8cb7f91832e8019a9a",
        },
        {
          url: "/windows11/Square150x150Logo.scale-125.png",
          revision: "66a2422b7a0dc9bc6fd75c0ccf2f0acd",
        },
        {
          url: "/windows11/Square150x150Logo.scale-150.png",
          revision: "6e0ae694afddc8ef327c2c7b37461864",
        },
        {
          url: "/windows11/Square150x150Logo.scale-200.png",
          revision: "0d64ceac258b2f9d6706945551c78b05",
        },
        {
          url: "/windows11/Square150x150Logo.scale-400.png",
          revision: "f9d8da3707b6b5aa62a3256483337329",
        },
        {
          url: "/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",
          revision: "02fa69887120b7f721266884e2ce78b0",
        },
        {
          url: "/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",
          revision: "7dc9f65e090359402a160bc469062bf6",
        },
        {
          url: "/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",
          revision: "7e3733afbd5055dec81606e28e099218",
        },
        {
          url: "/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",
          revision: "06db72e1c1558897ff04b1affbbc8c45",
        },
        {
          url: "/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",
          revision: "cf316c31178a2050213c18a2e3b2de3b",
        },
        {
          url: "/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",
          revision: "7eeed508f3f6acad2f7c79acd52f8c6b",
        },
        {
          url: "/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",
          revision: "a4ee3e518f0aa9be54f394c56c2a0dec",
        },
        {
          url: "/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",
          revision: "03670a37ca8e6682dc925f6ab2c45565",
        },
        {
          url: "/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",
          revision: "61be1249f35da55e497c83141c0e4708",
        },
        {
          url: "/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",
          revision: "0295894d7b7c8a421d35eff1f4bc9fb3",
        },
        {
          url: "/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",
          revision: "eb1043650321a65d6ea5e2d6e802525e",
        },
        {
          url: "/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",
          revision: "449b7d2aad2e12861558350063455edd",
        },
        {
          url: "/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",
          revision: "69169c6fd7ccf0c6120dce8c09d70bdf",
        },
        {
          url: "/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",
          revision: "b910c33d0dc94a5b4f6e4ee623f7f1a5",
        },
        {
          url: "/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",
          revision: "8802f75fe63852b2d73d93c40cf74df9",
        },
        {
          url: "/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",
          revision: "02fa69887120b7f721266884e2ce78b0",
        },
        {
          url: "/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",
          revision: "7dc9f65e090359402a160bc469062bf6",
        },
        {
          url: "/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",
          revision: "7e3733afbd5055dec81606e28e099218",
        },
        {
          url: "/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",
          revision: "06db72e1c1558897ff04b1affbbc8c45",
        },
        {
          url: "/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",
          revision: "cf316c31178a2050213c18a2e3b2de3b",
        },
        {
          url: "/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",
          revision: "7eeed508f3f6acad2f7c79acd52f8c6b",
        },
        {
          url: "/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",
          revision: "a4ee3e518f0aa9be54f394c56c2a0dec",
        },
        {
          url: "/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",
          revision: "03670a37ca8e6682dc925f6ab2c45565",
        },
        {
          url: "/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",
          revision: "61be1249f35da55e497c83141c0e4708",
        },
        {
          url: "/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",
          revision: "0295894d7b7c8a421d35eff1f4bc9fb3",
        },
        {
          url: "/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",
          revision: "eb1043650321a65d6ea5e2d6e802525e",
        },
        {
          url: "/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",
          revision: "449b7d2aad2e12861558350063455edd",
        },
        {
          url: "/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",
          revision: "69169c6fd7ccf0c6120dce8c09d70bdf",
        },
        {
          url: "/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",
          revision: "b910c33d0dc94a5b4f6e4ee623f7f1a5",
        },
        {
          url: "/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",
          revision: "8802f75fe63852b2d73d93c40cf74df9",
        },
        {
          url: "/windows11/Square44x44Logo.scale-100.png",
          revision: "61be1249f35da55e497c83141c0e4708",
        },
        {
          url: "/windows11/Square44x44Logo.scale-125.png",
          revision: "75eeaf9aab8e02ce201cd8d973841d90",
        },
        {
          url: "/windows11/Square44x44Logo.scale-150.png",
          revision: "fd24f1c56a1a603a6154730738146abd",
        },
        {
          url: "/windows11/Square44x44Logo.scale-200.png",
          revision: "b4ff376857f4cc66c5507e2d0f1dee6f",
        },
        {
          url: "/windows11/Square44x44Logo.scale-400.png",
          revision: "bd0d25e834cac973936b0889cc9d56fb",
        },
        {
          url: "/windows11/Square44x44Logo.targetsize-16.png",
          revision: "02fa69887120b7f721266884e2ce78b0",
        },
        {
          url: "/windows11/Square44x44Logo.targetsize-20.png",
          revision: "7dc9f65e090359402a160bc469062bf6",
        },
        {
          url: "/windows11/Square44x44Logo.targetsize-24.png",
          revision: "7e3733afbd5055dec81606e28e099218",
        },
        {
          url: "/windows11/Square44x44Logo.targetsize-256.png",
          revision: "06db72e1c1558897ff04b1affbbc8c45",
        },
        {
          url: "/windows11/Square44x44Logo.targetsize-30.png",
          revision: "cf316c31178a2050213c18a2e3b2de3b",
        },
        {
          url: "/windows11/Square44x44Logo.targetsize-32.png",
          revision: "7eeed508f3f6acad2f7c79acd52f8c6b",
        },
        {
          url: "/windows11/Square44x44Logo.targetsize-36.png",
          revision: "a4ee3e518f0aa9be54f394c56c2a0dec",
        },
        {
          url: "/windows11/Square44x44Logo.targetsize-40.png",
          revision: "03670a37ca8e6682dc925f6ab2c45565",
        },
        {
          url: "/windows11/Square44x44Logo.targetsize-44.png",
          revision: "61be1249f35da55e497c83141c0e4708",
        },
        {
          url: "/windows11/Square44x44Logo.targetsize-48.png",
          revision: "0295894d7b7c8a421d35eff1f4bc9fb3",
        },
        {
          url: "/windows11/Square44x44Logo.targetsize-60.png",
          revision: "eb1043650321a65d6ea5e2d6e802525e",
        },
        {
          url: "/windows11/Square44x44Logo.targetsize-64.png",
          revision: "449b7d2aad2e12861558350063455edd",
        },
        {
          url: "/windows11/Square44x44Logo.targetsize-72.png",
          revision: "69169c6fd7ccf0c6120dce8c09d70bdf",
        },
        {
          url: "/windows11/Square44x44Logo.targetsize-80.png",
          revision: "b910c33d0dc94a5b4f6e4ee623f7f1a5",
        },
        {
          url: "/windows11/Square44x44Logo.targetsize-96.png",
          revision: "8802f75fe63852b2d73d93c40cf74df9",
        },
        {
          url: "/windows11/StoreLogo.scale-100.png",
          revision: "b6dc2026d7d27dab0634ecb8109fd4ce",
        },
        {
          url: "/windows11/StoreLogo.scale-125.png",
          revision: "78cae026274aa8c34661817f19b887b3",
        },
        {
          url: "/windows11/StoreLogo.scale-150.png",
          revision: "8415a6e3c609b83d3ca5f509c92f884d",
        },
        {
          url: "/windows11/StoreLogo.scale-200.png",
          revision: "b5974b2fd2c916664a8aed7d13ddbd79",
        },
        {
          url: "/windows11/StoreLogo.scale-400.png",
          revision: "7644a15e612340f657914b1181dd5556",
        },
        {
          url: "/windows11/Wide310x150Logo.scale-100.png",
          revision: "dcff72690c28bc5cf403a28a9e064543",
        },
        {
          url: "/windows11/Wide310x150Logo.scale-125.png",
          revision: "ae0ce3d20f29577708e317926c1657d3",
        },
        {
          url: "/windows11/Wide310x150Logo.scale-150.png",
          revision: "558800d83cefb9600f333bdd3d70f167",
        },
        {
          url: "/windows11/Wide310x150Logo.scale-200.png",
          revision: "958e5d840820be9fcf2c1a66a98600fe",
        },
        {
          url: "/windows11/Wide310x150Logo.scale-400.png",
          revision: "e2b1c27be5f6bd49ee1445c240bbe8ac",
        },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: a,
              event: i,
              state: n,
            }) =>
              a && "opaqueredirect" === a.type
                ? new Response(a.body, {
                    status: 200,
                    statusText: "OK",
                    headers: a.headers,
                  })
                : a,
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const a = e.pathname;
        return !a.startsWith("/api/auth/") && !!a.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET",
    );
});
