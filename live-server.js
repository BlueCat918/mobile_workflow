/*
 * @Author: BlueCat
 * @Date: 2020-02-18 16:23:07
 * @LastEditTime: 2020-06-26 20:44:52
 * @LastEditors: BlueCat
 * @Description: 
 */
var liveServer = require("live-server");
var proxy = require('http-proxy-middleware');

var params = {
  host:'localhost',
  port: 3000,
  root: './src/view',
  watch: ['src'],
  ignorePattern: /.less/,
  open: false,
  wait: 1000,
	middleware: [
    proxy('/v1', { target: 'https://xiaoce-discount-storage-api-ms.juejin.im', changeOrigin: true })
  ]
}

liveServer.start(params)
