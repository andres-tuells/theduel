"use strict";

module.exports = {
	findOneById: function findOneById(id) {},
	create: function create(values) {
		values.created_at = new Date();
		values.updated_at = new Date();
		console.log("User.create");
		return db("users").returning("*").insert(values);
	}

};
//# sourceMappingURL=../../api/models/User.js.map