if(!self.define){let e,a={};const i=(i,n)=>(i=new URL(i+".js",n).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,s)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(a[r])return;let o={};const c=e=>i(e,r),d={module:{uri:r},exports:o,require:c};a[r]=Promise.all(n.map((e=>d[e]||c(e)))).then((e=>(s(...e),o)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"aae596bd584a73b77ba578eead543cc9"},{url:"/_next/static/QFail9OqMWXRLktJJnP3H/_buildManifest.js",revision:"59ff9af854e904233308f9cded2210df"},{url:"/_next/static/QFail9OqMWXRLktJJnP3H/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/01a6cf48-ec2e9ff593747f19.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/147-b7e88a5b3b9732d0.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/366.c9437401c12831c2.js",revision:"c9437401c12831c2"},{url:"/_next/static/chunks/3a91511d-534a65630cc68e0e.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/496.ff4988944bdb077d.js",revision:"ff4988944bdb077d"},{url:"/_next/static/chunks/4bd1b696-e3001826826aa2c7.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/517-e46bd460714934fe.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/553.671a8c66a2298dfd.js",revision:"671a8c66a2298dfd"},{url:"/_next/static/chunks/582-8b511216cdb8d1c4.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/604e8bb3-c4633a0cb973b191.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/673-96381109fba585f8.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/728.c826f1b243bd44a5.js",revision:"c826f1b243bd44a5"},{url:"/_next/static/chunks/746-96b61babe071fec6.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/839-4e7333645071353e.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/8aa3c1a2-7ac4391be54ba852.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/app/_not-found/page-ec1122eb5716f660.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/app/gaming/page-52afce7bc77f5478.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/app/layout-d4161b3818cc9e7f.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/app/page-1702c2d94227a751.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/app/token-list/page-c9a59a4c602e166c.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/app/waitingroom/page-ef5bfca85edf086b.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/f41587aa-11fb0a53e8d6f27f.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/framework-c76864a09627f16c.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/main-40be7645ef92ad3e.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/main-app-c152490442c6fef3.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/pages/_app-abffdcde9d309a0c.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/pages/_error-94b8133dd8229633.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-706c72bdd5728873.js",revision:"QFail9OqMWXRLktJJnP3H"},{url:"/_next/static/css/1901d8ea4657f3e8.css",revision:"1901d8ea4657f3e8"},{url:"/_next/static/media/1dcbec8dd4295ac2-s.p.ttf",revision:"70d65213731578cdde9a95a4a6cd237c"},{url:"/a28128d9ff7c49c9ad33ee2f626fda40.png",revision:"f11c88e011f136be21790184022b6526"},{url:"/android/android-launchericon-144-144.png",revision:"f2188185329fbeb952f58fbaa962842b"},{url:"/android/android-launchericon-192-192.png",revision:"c1382dbd47c27fe94c4eee15d9aec673"},{url:"/android/android-launchericon-48-48.png",revision:"440c2e7b796cb47d2403c82ca6240dcf"},{url:"/android/android-launchericon-512-512.png",revision:"01aed4fb649d9a8706c75a29c88738ce"},{url:"/android/android-launchericon-72-72.png",revision:"8955df84dcd1ef4ea78fa7f7a443119f"},{url:"/android/android-launchericon-96-96.png",revision:"1c5b598bdd52adf9368792c2b230f17c"},{url:"/diamond.png",revision:"cde5659f9c30b6f729299b620d3e5d22"},{url:"/favicon.ico",revision:"ffc80d0ec031fb03e72acf7e500e589c"},{url:"/file.png",revision:"320f7a1bdcfea195c97a269582dd4f48"},{url:"/home.png",revision:"4e90f979eba9e7be68d260a915b3adf9"},{url:"/icons.json",revision:"4b00c8d3f335ee495b2b5e1dc66d9bc3"},{url:"/insights.png",revision:"e1e6f0d9c56f66f9a670a6e6aa61cffb"},{url:"/ios/100.png",revision:"3d515acc531d89c729254ad3096e8c99"},{url:"/ios/1024.png",revision:"340b9ab63b765fffd867a0bf1beea113"},{url:"/ios/114.png",revision:"1c3a521746247a28387eea1e408cd9ad"},{url:"/ios/120.png",revision:"5604a96ec087baec6ebc7e5339a8292a"},{url:"/ios/128.png",revision:"46ed8db33224f5c1ff2d3abdcb887411"},{url:"/ios/144.png",revision:"f2188185329fbeb952f58fbaa962842b"},{url:"/ios/152.png",revision:"7c45fe271c80ac00af7a9e6b281eafa3"},{url:"/ios/16.png",revision:"4102162169359be48b641c10f94c8e57"},{url:"/ios/167.png",revision:"0ee2a779ebe663b09bf2eb3a9e5b0b1b"},{url:"/ios/180.png",revision:"6c246824b025b337dc4a719cf69442ee"},{url:"/ios/192.png",revision:"c1382dbd47c27fe94c4eee15d9aec673"},{url:"/ios/20.png",revision:"9cb406c42658f677eb9cc8973f3b78bc"},{url:"/ios/256.png",revision:"f86932b57e7ee86da687da99644beae4"},{url:"/ios/29.png",revision:"15c5e3c9092463922ed232e6feb6f2e4"},{url:"/ios/32.png",revision:"ade538b505b3b72e35aa73e15971f2c2"},{url:"/ios/40.png",revision:"f2f344989c0f2e41ba6cc396fba6fe78"},{url:"/ios/50.png",revision:"f0011686a6273afc9e9951cdbaf4b766"},{url:"/ios/512.png",revision:"01aed4fb649d9a8706c75a29c88738ce"},{url:"/ios/57.png",revision:"aeb9b33a95f77ac48eb4f70c7e413a29"},{url:"/ios/58.png",revision:"176f9fcd780f26a3ff3a4531c8c63524"},{url:"/ios/60.png",revision:"74090ab9674e209e84d238ff02ead33d"},{url:"/ios/64.png",revision:"26c753bf66ebc118002d0bc74268b684"},{url:"/ios/72.png",revision:"8955df84dcd1ef4ea78fa7f7a443119f"},{url:"/ios/76.png",revision:"aeb9e28f743039f74c23780fac0c1272"},{url:"/ios/80.png",revision:"8600b24d8211fecaa9130ceb6e560ea5"},{url:"/ios/87.png",revision:"96eb3909db17492812d8c59c90ef2e45"},{url:"/logo.jpg",revision:"e404b4e0569fe178810353cefda403ec"},{url:"/logo.png",revision:"304cf52780ecac72674926bfd0ece912"},{url:"/loser.png",revision:"77ea49356bcf1e910500a5c94134a730"},{url:"/loser.webp",revision:"05b079debc1bf7195cc6cf7a77bd4b40"},{url:"/manifest.json",revision:"5a5da92aa7aa6214b0357464cde841fb"},{url:"/memebattle.png",revision:"9a4a408fe309c172c5d62d799819afa0"},{url:"/windows11/LargeTile.scale-100.png",revision:"e743e6578734d74c9aee6fd964aa17a9"},{url:"/windows11/LargeTile.scale-125.png",revision:"b2261ad467f477f7e61cc67796437e7c"},{url:"/windows11/LargeTile.scale-150.png",revision:"f4121ce9592e522020d813780deaa2fd"},{url:"/windows11/LargeTile.scale-200.png",revision:"2174173132859178e75d9becab56c298"},{url:"/windows11/LargeTile.scale-400.png",revision:"4fd9d5232b0668c384064e22083f00aa"},{url:"/windows11/SmallTile.scale-100.png",revision:"7854cac7a77b97b1b8aed871acca4ba4"},{url:"/windows11/SmallTile.scale-125.png",revision:"8294203047666fc6a8cf8cf2bf995630"},{url:"/windows11/SmallTile.scale-150.png",revision:"e222627ea694ad9ea3b8fd238e602ea8"},{url:"/windows11/SmallTile.scale-200.png",revision:"b227d7121128c0098a04fc23a3d68941"},{url:"/windows11/SmallTile.scale-400.png",revision:"4be462bbe41d43fd4ae779ec0ad39298"},{url:"/windows11/SplashScreen.scale-100.png",revision:"460b1c8f330a0eb9e50587878729b71d"},{url:"/windows11/SplashScreen.scale-125.png",revision:"e8286fbd3cd6d5ec469d7ea605515a94"},{url:"/windows11/SplashScreen.scale-150.png",revision:"509db9797734f2aa1b055ee50965f62e"},{url:"/windows11/SplashScreen.scale-200.png",revision:"e66dfbb988b3efe5dd80dcac44b8cd7d"},{url:"/windows11/SplashScreen.scale-400.png",revision:"94f2a7f6fb547a4685db899e96f8b5c8"},{url:"/windows11/Square150x150Logo.scale-100.png",revision:"0aa6f72ae644e8829a2aff28ae9d32df"},{url:"/windows11/Square150x150Logo.scale-125.png",revision:"07071258c3fc2afeeaea4232b98da989"},{url:"/windows11/Square150x150Logo.scale-150.png",revision:"63d9f7e2f12fc75eeae30ed48404f494"},{url:"/windows11/Square150x150Logo.scale-200.png",revision:"53e9a39969b1a8dd4e46da3272fbcc59"},{url:"/windows11/Square150x150Logo.scale-400.png",revision:"72b9428a54ccd3140bdabd0128f35dae"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",revision:"c06827b76a8aaad099d8d1c4e521e13b"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",revision:"43b8ca46f65a99f5061c6cc41f2527df"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",revision:"fe778c106d411e4ef3477730d16079a0"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",revision:"2e7bac5df78d0e47bfa649fb952ba9f8"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",revision:"55bd4615a327a87e6a3196dbaabc9517"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",revision:"54ab1ae91cdee163352dd010181f8139"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",revision:"fea001ccff90025bffa214b705b4e097"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",revision:"ee6e8c60964bdf1249627fb6bc0cbbc7"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",revision:"022fd54630c5bebdee94622c9422e0ef"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",revision:"92c12d231c2e6888f25d30b16805d549"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",revision:"d8528667362fcbf877130a330c7a949a"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",revision:"c2e0bcaf70c55b21b3cd32eb7a397318"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",revision:"10d59c7bf547a04f6b8a34bd1e5fa97c"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",revision:"e5482c44f5affc306d484be522d3d787"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",revision:"d844d78be15d55735e199c08e8e07a26"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",revision:"c06827b76a8aaad099d8d1c4e521e13b"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",revision:"43b8ca46f65a99f5061c6cc41f2527df"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",revision:"fe778c106d411e4ef3477730d16079a0"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",revision:"2e7bac5df78d0e47bfa649fb952ba9f8"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",revision:"55bd4615a327a87e6a3196dbaabc9517"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",revision:"54ab1ae91cdee163352dd010181f8139"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",revision:"fea001ccff90025bffa214b705b4e097"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",revision:"ee6e8c60964bdf1249627fb6bc0cbbc7"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",revision:"022fd54630c5bebdee94622c9422e0ef"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",revision:"92c12d231c2e6888f25d30b16805d549"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",revision:"d8528667362fcbf877130a330c7a949a"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",revision:"c2e0bcaf70c55b21b3cd32eb7a397318"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",revision:"10d59c7bf547a04f6b8a34bd1e5fa97c"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",revision:"e5482c44f5affc306d484be522d3d787"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",revision:"d844d78be15d55735e199c08e8e07a26"},{url:"/windows11/Square44x44Logo.scale-100.png",revision:"022fd54630c5bebdee94622c9422e0ef"},{url:"/windows11/Square44x44Logo.scale-125.png",revision:"c964082c2de352366f81cd7348d5cb04"},{url:"/windows11/Square44x44Logo.scale-150.png",revision:"022eb21948321200085ed4f14ab8ff37"},{url:"/windows11/Square44x44Logo.scale-200.png",revision:"0acce0b9f99ababfb3d861a0d935e006"},{url:"/windows11/Square44x44Logo.scale-400.png",revision:"51417a325103149b94705d1ca6db543d"},{url:"/windows11/Square44x44Logo.targetsize-16.png",revision:"c06827b76a8aaad099d8d1c4e521e13b"},{url:"/windows11/Square44x44Logo.targetsize-20.png",revision:"43b8ca46f65a99f5061c6cc41f2527df"},{url:"/windows11/Square44x44Logo.targetsize-24.png",revision:"fe778c106d411e4ef3477730d16079a0"},{url:"/windows11/Square44x44Logo.targetsize-256.png",revision:"2e7bac5df78d0e47bfa649fb952ba9f8"},{url:"/windows11/Square44x44Logo.targetsize-30.png",revision:"55bd4615a327a87e6a3196dbaabc9517"},{url:"/windows11/Square44x44Logo.targetsize-32.png",revision:"54ab1ae91cdee163352dd010181f8139"},{url:"/windows11/Square44x44Logo.targetsize-36.png",revision:"fea001ccff90025bffa214b705b4e097"},{url:"/windows11/Square44x44Logo.targetsize-40.png",revision:"ee6e8c60964bdf1249627fb6bc0cbbc7"},{url:"/windows11/Square44x44Logo.targetsize-44.png",revision:"022fd54630c5bebdee94622c9422e0ef"},{url:"/windows11/Square44x44Logo.targetsize-48.png",revision:"92c12d231c2e6888f25d30b16805d549"},{url:"/windows11/Square44x44Logo.targetsize-60.png",revision:"d8528667362fcbf877130a330c7a949a"},{url:"/windows11/Square44x44Logo.targetsize-64.png",revision:"c2e0bcaf70c55b21b3cd32eb7a397318"},{url:"/windows11/Square44x44Logo.targetsize-72.png",revision:"10d59c7bf547a04f6b8a34bd1e5fa97c"},{url:"/windows11/Square44x44Logo.targetsize-80.png",revision:"e5482c44f5affc306d484be522d3d787"},{url:"/windows11/Square44x44Logo.targetsize-96.png",revision:"d844d78be15d55735e199c08e8e07a26"},{url:"/windows11/StoreLogo.scale-100.png",revision:"f0011686a6273afc9e9951cdbaf4b766"},{url:"/windows11/StoreLogo.scale-125.png",revision:"ede5fc370c3a04b61ccb662d90a9f8d1"},{url:"/windows11/StoreLogo.scale-150.png",revision:"b96ecdddb4d2849a9205217e7168d3f2"},{url:"/windows11/StoreLogo.scale-200.png",revision:"3d515acc531d89c729254ad3096e8c99"},{url:"/windows11/StoreLogo.scale-400.png",revision:"6f7581fec286720549d50083cb3111bb"},{url:"/windows11/Wide310x150Logo.scale-100.png",revision:"e4794f198dd867b771c9a28a03c41f4e"},{url:"/windows11/Wide310x150Logo.scale-125.png",revision:"f177896a1eb22f45b66f64246ef7975b"},{url:"/windows11/Wide310x150Logo.scale-150.png",revision:"bdcca3943604eb95af0102c031034feb"},{url:"/windows11/Wide310x150Logo.scale-200.png",revision:"460b1c8f330a0eb9e50587878729b71d"},{url:"/windows11/Wide310x150Logo.scale-400.png",revision:"e66dfbb988b3efe5dd80dcac44b8cd7d"},{url:"/winner.png",revision:"cd69eac8944ff88ecc0230c0231b0ef0"},{url:"/winner.webp",revision:"3f282f7f2a707a139bc78c581e137c44"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:i,state:n})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
