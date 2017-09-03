const webpackConfig = require('./webpack.config')

module.exports = config => {
  config.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha', 'chai'],
    reporters: ['mocha'],
    files: ['./test/index.js'],
    preprocessors: {
      './test/index.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  })
}
