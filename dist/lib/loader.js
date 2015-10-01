"use strict";

var requireAll = require("require-all");
var fs = require("fs");

module.exports = {

	loadToGlobals: function loadToGlobals(path, filter) {
		if (!fs.existsSync(path)) {
			return;
		}var dir = requireAll({
			dirname: path,
			filter: filter,
			excludeDirs: /^\.(git|svn)$/
		});

		_.keysIn(dir).forEach(function (key) {
			key = key.replace(".js", "");
			console.log("Adding %s to globals", key);
			global[key] = dir[key];
		});
	},

	loadConfigToGlobals: function loadConfigToGlobals() {
		var path = "../config";
		if (!fs.existsSync(path)) {
			return;
		}var config = requireAll({ dirname: path, excludeDirs: /^\.(git|svn)$/ });
		global.config = config;
	}

};
//# sourceMappingURL=../lib/loader.js.map