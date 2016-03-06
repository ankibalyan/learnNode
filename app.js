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
	mappings.list(function(err, mappingDocuments) {
		res.render('index', {
			mappings: mappingDocuments
		})
	});
});

app.get('/:alias',function (req, res) {
	mappings.get(req.params.alias,function(err, mapping) {
		if(err){
			return res.sendStatus(404);
		}
		return res.redirect(mapping);
	});
});

http.createServer(app).listen(3000);