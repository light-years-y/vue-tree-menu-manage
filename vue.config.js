
// const port = process.env.port || process.env.npm_config_port || 9529
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  pages: {
    index: {
      entry: '/src/index.js'
    }
  },
  publicPath: '/',
  outputDir: 'lib',
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    output: {
      filename: `index.js`
    }
  },
  css: {
    requireModuleExtension: false,
    extract: false
  }
}