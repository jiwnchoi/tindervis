if(!self.define){let e,s={};const r=(r,i)=>(r=new URL(r+".js",i).href,s[r]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=s,document.head.appendChild(e)}else e=r,importScripts(r),s()})).then((()=>{let e=s[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(i,t)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let n={};const o=e=>r(e,a),d={module:{uri:a},exports:n,require:o};s[a]=Promise.all(i.map((e=>d[e]||o(e)))).then((e=>(t(...e),n)))}}define(["./workbox-e1498109"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"artifacts/console.html",revision:"730809097d08a156c49f9a75cde2add4"},{url:"artifacts/module_test.html",revision:"4fbbc34be294a3d5a6678ffc1a3e28a6"},{url:"artifacts/module_webworker_dev.js",revision:"47f448ff27475f98304b5cddcaff2060"},{url:"artifacts/pyodide.asm.js",revision:"0f0c5178d4575464c88230d18064c122"},{url:"artifacts/pyodide.asm.wasm",revision:"3b315e78ca4291f495d266dfa9312d4e"},{url:"artifacts/pyodide.js",revision:"73aa7ad9a864b13a9b1ae7b18d6e1b3f"},{url:"artifacts/test.html",revision:"c4d0515a38d9efcb79feffbbf85b6082"},{url:"artifacts/webworker_dev.js",revision:"36e0357f37475273a6d36a496f6d7920"},{url:"artifacts/webworker.js",revision:"36e0357f37475273a6d36a496f6d7920"},{url:"assets/__vite-browser-external-CIEyP2s7.js",revision:null},{url:"assets/index-B489Fav_.js",revision:null},{url:"assets/index-C_lwIa_2.js",revision:null},{url:"assets/index-DS72-RvD.css",revision:null},{url:"assets/pyodide-worker-C1b7KQyD.js",revision:null},{url:"index.html",revision:"a0690706533a6743c09f598488f1d2b8"},{url:"registerSW.js",revision:"956178ca7002772fcde2084da99b9044"},{url:"manifest.webmanifest",revision:"3d62a57386f90851095a4578c1bb8eb1"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
