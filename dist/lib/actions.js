"use strict";

var ws = require("./ws");
var logger = require("./logger");
var EventEmitter = require("events").EventEmitter;

function Actions(connection) {
	var self = this;
	var emitter = new EventEmitter();

	process.nextTick(function () {
		return emitter.emit("start", connection);
	});

	connection.on("message", function (message) {
		if (message.type !== "utf8") {
			connection.sendError("Server does not accept websockets message of type " + message.type);
			return;
		}
		var json = null;
		try {
			json = JSON.parse(message.utf8Data);
		} catch (error) {
			connection.sendError("Cannot parse to json " + message.utf8Data);
			return;
		}
		var action = json.action;
		var data = json.data;

		if (!action) {
			connection.sendError("No action defined in json " + message.utf8Data);
			return;
		}

		if (!emitter.listeners("on" + action).length > 0) {
			connection.sendError("No action defined in the server for " + action);
			return;
		}
		emitter.emit("on" + action, data);
	});
	connection.on("close", function (reasonCode, description) {
		emitter.emit("close", { reasonCode: reasonCode, description: description });
	});

	this.start = function (f) {
		emitter.on("start", f);
		return self;
	};
	this.on = function (name, f) {

		emitter.on("on" + name, function callee$2$0(data) {
			var g, r;
			return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
				while (1) switch (context$3$0.prev = context$3$0.next) {
					case 0:
						g = function g() {
							return f(data);
						};

						try {
							r = g();
						} catch (error) {
							console.log("Error captured in action try-catch " + error.message);
							logger.info(error);
							connection.sendError(error.message);
						}

					case 2:
					case "end":
						return context$3$0.stop();
				}
			}, null, this);
		});
		return self;
	};
	this.close = function (f) {
		emitter.on("close", f);
		return self;
	};
};

module.exports = function (connection) {
	return new Actions(connection);
};
//# sourceMappingURL=../lib/actions.js.map