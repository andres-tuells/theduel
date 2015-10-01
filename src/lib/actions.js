
var ws = require("./ws");
var logger  = require('./logger');
var EventEmitter = require('events').EventEmitter;

function Actions(connection){
	var self = this;
	var emitter = new EventEmitter();

	process.nextTick(()=>emitter.emit("start",connection));

	connection.on("message", function (message) {
		if(message.type !== "utf8"){
			connection.sendError("Server does not accept websockets message of type " + message.type);
			return;
		}
		var json = null;
		try{
			json = JSON.parse(message.utf8Data);
		}catch(error){
			connection.sendError("Cannot parse to json " + message.utf8Data);
			return;
		}
		var action = json.action;
		var data = json.data;

		if(!action){
			connection.sendError("No action defined in json " + message.utf8Data);
			return;
		}

		if(!emitter.listeners("on" + action).length>0){
			connection.sendError("No action defined in the server for " + action);
			return;
		}
		emitter.emit("on" + action, data);
    });
    connection.on("close", function (reasonCode, description) {
    	emitter.emit("close", {reasonCode:reasonCode, description:description});
    });

	

	this.start = function(f){
		emitter.on("start",f);
		return self;
	};
	this.on = function(name, f){

		emitter.on("on" + name,async function(data){
			function async g(){
				return f(data);
			}
			try{
				var r = await g();
			}catch(error){
				console.log("Error captured in action try-catch " + error.message);
				logger.info(error);
				connection.sendError(error.message);
			}
		});
		return self;
	};
	this.close = function(f){
		emitter.on("close",f);
		return self;
	};
};

module.exports = function(connection){
	return new Actions(connection);
};