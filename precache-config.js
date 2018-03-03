var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [/^(?!\/__)/], // <-- necessary for Firebase OAuth
  stripPrefix: 'public/dist',
  root: 'public/dist/',
  plugins: [
    new SWPrecacheWebpackPlugin({
      cacheId: 'moviesdirectory',
      filename: 'service-worker.js',
      staticFileGlobs: [
        'public/dist/index.html',
        'public/dist/**.js',
        'public/dist/**.css'
      ],
      stripPrefix: 'public/dist/assets/',
      mergeStaticsConfig: true // if you don't set this to true, you won't see any webpack-emitted assets in your serviceworker config
    }),
  ]
};
