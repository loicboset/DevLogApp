/* eslint-disable @typescript-eslint/no-require-imports */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  customWorkerDir: "worker",
  maximumFileSizeToCacheInBytes: 8000000,
  runtimeCaching,
  buildExcludes: [/app-build-manifest.json$/, /dynamic-css-manifest.json$/],
});

module.exports = withPWA({});
