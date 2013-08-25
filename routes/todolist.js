var db = require('../db.js'); // use db.getConnection() for access to database
var ObjectID = require('mongodb').ObjectID; // used to create ObjectID when looking for the record

// Refactor the actions into controller

// Home Page -----------------------------------------------------------
exports.home = function(req, res) {
	console.log("home page");
	res.render('todolist', {title: "CheckBox"});
};

// Post new "To Do Item" -----------------------------------------------
exports.item_post_handler = function(req, res) {
	console.log("-create 'To Do item'");
	console.log(req.body.item);

	if(req.body.item != '' && typeof req.body.item != "undefined") {
		console.log("no errors in 'To Do' creation");
		// create record in database
		var newRecord = {
			item: req.body.item, 
			completed: false,
			created_at: new Date().getTime(),
			updated_at: new Date().getTime()
		}

		db.getConnection().insert(
			newRecord, 
		function(err, docs) {

		});
	}
	else {
		console.log("VALIDATION ERROR");
		res.json({error: "please enter message"});
	}



	res.json(newRecord);
};

// Get all "To Do Items -----------------------------------------------
exports.items = function(req, res) {
	console.log("-get 'To Do items'");

	var items = db.getConnection().find({completed: false }).toArray(function(err, items) {
		console.log(items);

		// returns the results in json format
		res.json(items);
	});
	// console.log(items);

	// res.render('todolist', {items: 'TEST'});
	// res.json(items);
	// collection.close();
};

// Get all completed "To Do Items -----------------------------------------------
exports.completedItems = function(req, res) {
	console.log("-get 'To Do items'");

	db.getConnection().find({completed: true }).toArray(function(err, items) {
		console.log(items);
		var completedItems = items;
		// returns the results in json format
		res.json(completedItems);
	});
};


// Toggle "To Do Items" -----------------------------------------------
exports.toggleToDo = function(req, res) {
	console.log("-toogle 'To Do item' completed status");

	console.log(req.body.completed);
	console.log(req.body._id);

	db.getConnection().update({
			_id: new ObjectID(req.body._id)
		}, 
		{
			$set: { 
				completed: req.body.completed,
				updated_at: new Date().getTime()
			} 
		},
		function(err) {
			if(err) console.warn("Could not write to DB");
			else console.log("Item successfully updated!");
		}
	);

	res.end('end toggleToDo');
};

// delete "To Do" item --------------------------------------------------
exports.deleteItem = function(req, res) {
	db.getConnection().remove({
			_id: new ObjectID(req.body._id)
		},
		function(err) {
			if(err) console.warn("Could not remove item");
			else console.log("Item successfully removed");
		}
	);

	res.end('end deleteItem');
};