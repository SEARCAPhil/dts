/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "precache-manifest.001378f79d9dc0168353ae237019f43d.js"
);

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/http:\/\/localhost\/dts/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/http:\/\/localhost\/dts_api/, new workbox.strategies.NetworkFirst({ "cacheName":"my-api-cache","networkTimeoutSeconds":10, plugins: [new workbox.expiration.Plugin({ maxEntries: 5, maxAgeSeconds: 60, purgeOnQuotaError: false })] }), 'GET');
