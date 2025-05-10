// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  customWorkerDir: 'worker',
  maximumFileSizeToCacheInBytes: 8000000,
})

module.exports = withPWA({
  // next.js config
})
