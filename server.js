// require our dependencies
var express        = require('express');
var expressLayouts = require('express-ejs-layouts');
var leboncoin      = require('./leboncoin');
var meilleuragents = require('./meilleursagents');
var app            = express();
var port           = 8081;

// route our app
var router = require('./app/route');
app.use('/', router);

//use express & ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);
// set css & images
app.use(express.static(__dirname + '/public'));

// start the server
app.listen(port, function() {
	console.log('app started');
});

