
var logger  = require('../../lib/logger');

module.exports = {

	login: function(data){
		return new Promise(function(resolve,reject){
			console.log("UserService.login");
			console.log("User.create:" + User.create);
			User.create({username: 'data.username'}).then(function(r){
				console.log("User.create resolved " + JSON.stringify(r));
				resolve(r);
			}, function(e){
				console.log("User.create rejected " + e.message);
				reject(e);
			});
			console.log("end UserService.login");
		});
	},

	ranking: function(data){
		return [1,2,3];
	}
};