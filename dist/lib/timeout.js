"use strict";

module.exports = function () {
    var duration = arguments[0] === undefined ? 0 : arguments[0];

    return new Promise(function (resolve, reject) {
        setTimeout(resolve, duration);
    });
};
//# sourceMappingURL=../lib/timeout.js.map