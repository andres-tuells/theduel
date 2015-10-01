"use strict";

var logger = require("../../lib/logger");

var _connections = {};

module.exports = {
	addConnection: function addConnection(connection) {
		if (!connection.session.deviceId) throw new Error("Cannot add connection without deviceId");
		_connections[connection.userId] = connection;
		logger.info("+1 connections(%s)", _connections.length);
	},
	removeConnection: function removeConnection(connection) {
		if (!connection.session.deviceId) {
			return;
		}delete _connection[connection.session.deviceId];
		logger.info("-1 connections(%s)", _connections.length);
	},
	sendActionToDevice: function sendActionToDevice(deviceId, action, data) {
		var connection = _connections[deviceId];
		if (!connection) {
			return;
		}connection.sendAction(action, data);
	},
	sendActionToDevices: function sendActionToDevices(devicesIds, action, data) {
		var _this = this;

		return devicesIds.map(function (deviceId) {
			return _this.sendActionToDevice(deviceId, action, data);
		});
	}
};
//# sourceMappingURL=../../api/services/ConnectionService.js.map