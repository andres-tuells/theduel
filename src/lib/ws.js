
var server = require("./server");
var WebSocketServer = require('websocket').server;
var logger  = require('./logger');
var EventEmitter = require('events').EventEmitter;

var redis = require('redis');
var client = redis.createClient();

 
var proximity = require('redis-proximity');
proximity.initialize(client, "connections-position");

var addCoordinate = asyncify(proximity.addCoordinate);
var removeCoordinate = asyncify(proximity.removeCoordinate);



function WS(server){
	var self = this;
	var emitter = new EventEmitter();
	var ws = new WebSocketServer({
    	httpServer: server,
    	autoAcceptConnections: false
	});

	ws.on('request', function(request) {
  		logger.debug("request started");
		var connection = request.accept(null, request.origin);
		connection.session = {};
		connection.sendAction = function(action, data){
			connection.send(JSON.stringify({action:action, data:data}));
			return self;
		};

		connection.sendError = function(message, code){
			connection.sendAction("Error", {message:message, code:code});
		};

		connection.addPosition = async function(lat, lon){
			console.log("add1");
			connection.session.deviceId=1;
			if(!connection.session.deviceId)throw new Error("Cannot add coordinates to connection without deviceId");
			console.log("add2");
			return await proximity.addCoordinate(lat, lon, connection.session.deviceId);
		};

		emitter.emit("start", connection);
	});

	this.request = function(f){
		emitter.on("start",f);
		return self;
	};


}

module.exports = new WS(server.server);