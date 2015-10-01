"use strict";

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

module.exports = function (f) {
	return function callee$1$0() {
		var _arguments = arguments;
		var args;
		return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					args = _arguments;
					return context$2$0.abrupt("return", new Promise(function (resolve, reject) {
						f.apply(undefined, _toConsumableArray(args).concat([function (err, value) {
							console.log("asyncify_>" + JSON.stringify(value));
							if (err) reject(err);else resolve(value);
						}]));
					}));

				case 2:
				case "end":
					return context$2$0.stop();
			}
		}, null, this);
	};
};
//# sourceMappingURL=../lib/asyncify.js.map