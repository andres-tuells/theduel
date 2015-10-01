
module.exports = {
	findOneById: function(id){

	},
	create: function(values){
		values["created_at"] = new Date();
		values["updated_at"] = new Date();
		console.log("User.create");
		return db('users').returning('*').insert(values);

	}

};