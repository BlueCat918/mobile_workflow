const Proxy = require('http-proxy-middleware')

module.exports = [
  Proxy('/v1', { target: 'https://xiaoce-discount-storage-api-ms.juejin.im', changeOrigin: true })
]