
var express = require('express');
var WebSocketServer = require('websocket').server;
var logger  = require('./logger');

var app = express();

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  logger.info('Example app listening at http://%s:%s', host, port)

});

module.exports = {server: server, app:app};