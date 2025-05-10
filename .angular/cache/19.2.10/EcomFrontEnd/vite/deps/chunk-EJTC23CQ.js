import {
  InjectionToken
} from "./chunk-CPN5WQDT.js";

<<<<<<<< HEAD:.angular/cache/19.2.10/EcomFrontEnd/vite/deps/chunk-EJTC23CQ.js
// ../node_modules/@angular/common/fesm2022/dom_tokens-rA0ACyx7.mjs
var DOCUMENT = new InjectionToken(ngDevMode ? "DocumentToken" : "");

// ../node_modules/@angular/common/fesm2022/xhr-BfNfxNDv.mjs
========
// node_modules/@angular/common/fesm2022/xhr-BfNfxNDv.mjs
>>>>>>>> d5f71e534c8b10eab0be2ed04fe2ecd0561141d4:.angular/cache/19.2.10/EcomFrontEnd/vite/deps/chunk-B4AXUQYK.js
function parseCookieValue(cookieStr, name) {
  name = encodeURIComponent(name);
  for (const cookie of cookieStr.split(";")) {
    const eqIndex = cookie.indexOf("=");
    const [cookieName, cookieValue] = eqIndex == -1 ? [cookie, ""] : [cookie.slice(0, eqIndex), cookie.slice(eqIndex + 1)];
    if (cookieName.trim() === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}
var PLATFORM_BROWSER_ID = "browser";
var PLATFORM_SERVER_ID = "server";
function isPlatformBrowser(platformId) {
  return platformId === PLATFORM_BROWSER_ID;
}
function isPlatformServer(platformId) {
  return platformId === PLATFORM_SERVER_ID;
}
var XhrFactory = class {
};

// node_modules/@angular/common/fesm2022/dom_tokens-rA0ACyx7.mjs
var DOCUMENT = new InjectionToken(ngDevMode ? "DocumentToken" : "");

export {
  parseCookieValue,
  PLATFORM_BROWSER_ID,
  PLATFORM_SERVER_ID,
  isPlatformBrowser,
  isPlatformServer,
  XhrFactory,
  DOCUMENT
};
/*! Bundled license information:

@angular/common/fesm2022/xhr-BfNfxNDv.mjs:
  (**
   * @license Angular v19.2.9
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)

@angular/common/fesm2022/dom_tokens-rA0ACyx7.mjs:
  (**
   * @license Angular v19.2.9
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
<<<<<<<< HEAD:.angular/cache/19.2.10/EcomFrontEnd/vite/deps/chunk-EJTC23CQ.js
//# sourceMappingURL=chunk-EJTC23CQ.js.map
========
//# sourceMappingURL=chunk-B4AXUQYK.js.map
>>>>>>>> d5f71e534c8b10eab0be2ed04fe2ecd0561141d4:.angular/cache/19.2.10/EcomFrontEnd/vite/deps/chunk-B4AXUQYK.js
