var MongoClient = require('mongodb').MongoClient; 
var collection;

module.exports = {
	getConnection: function () {
		console.log("Return collection");
		return collection;
	},
	createConnection: function() {
		// Connect to Database ------------------------------------------------
		MongoClient.connect('mongodb://'+process.env.User+':'+process.env.Password+'@paulo.mongohq.com:10059/app17687270', function(err, db){
			if(err) throw err;
			console.log('\033[96m + \033[39m connected to mongodb');

			db.createCollection('to_do_list', function(err, collection) {

			});			

			collection = db.collection('to_do_list');
			}
		);

	}
}