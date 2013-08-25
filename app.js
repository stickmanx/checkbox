
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var todolist = require('./routes/todolist');
require("./db.js").createConnection(); // connect to database


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view cache', true); // for debugging
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser()); // use inconjunction with post request
app.use(express.methodOverride()); // allows 'put' and 'delete' request from the browser
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// the splash page
app.get('/', routes.index);

// the main 'To Do List' page
app.get('/todolist', todolist.home);

// used for posting new items to list
app.post('/todolist/create', todolist.item_post_handler);
app.post('/todolist/toggle_to_do', todolist.toggleToDo);
app.get('/todolist/items', todolist.items);
app.get('/todolist/completed_items', todolist.completedItems);
app.post('/todolist/delete', todolist.deleteItem);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
