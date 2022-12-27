module.exports = {
  staticFileGlobs: [
    'css/**.css',
    '**.html',
    'img/**.*',
    'js/**.js',
    'manifest.json'
  ],
  stripPrefix: 'app/',
  runtimeCaching: [{
    urlPattern: /this\\.is\\.a\\.regex/,
    handler: 'networkFirst'
  }]
};