module.exports = function (f){
	return async function(){
		var args = arguments;
		return new Promise((resolve, reject) => {
			f(...args,function(err, value){
				console.log("asyncify_>" + JSON.stringify(value));
				if(err)reject(err);
				else resolve(value);
			});
		});
	}
} 