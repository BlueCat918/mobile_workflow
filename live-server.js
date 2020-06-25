var liveServer = require("live-server");
const config = require('./build/config');
const Proxy = require('./build/proxy')
const { output } = config;

var params = {
  root: output,
  host: 'localhost',
  port: 3000,
  open: false,
  middleware: Proxy
}

liveServer.start(params)