'use strict';
var http = require('http'),
	path = require('path'),

	express = require('express'),

	logger = require('./logger'),
	mappings = require('./mappings');

var app = express();

app.use(logger("logger"));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.get('/',function(req, res) {
	// res.send("Helo World!");
	res.render('index', {
		mappings: mappings 
	})
});

app.get('/:alias',function (req, res) {
	mappings.get(req.params.alias,function(err, mapping) {
		if(err){
			res.sendStatus(404);
			return res.end();
		}
		res.redirect(mapping);
		res.end();
	});
});

http.createServer(app).listen(3000);