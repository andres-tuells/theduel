
var logger  = require('../../lib/logger');

var _connections = {};

module.exports = {
	addConnection: function(connection){
		if(!connection.session.deviceId)throw new Error("Cannot add connection without deviceId");
		_connections[connection.userId] = connection;
		logger.info("+1 connections(%s)", _connections.length);
	},
	removeConnection: function(connection){
		if(!connection.session.deviceId)return;
		delete _connection[connection.session.deviceId];
		logger.info("-1 connections(%s)", _connections.length);
	},
	sendActionToDevice: function(deviceId, action, data){
		var connection = _connections[deviceId];
		if(!connection)return;
		connection.sendAction(action, data);
	},
	sendActionToDevices: function(devicesIds, action, data){
		return devicesIds.map((deviceId)=>this.sendActionToDevice(deviceId, action, data));
	}
};