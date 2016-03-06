'use strict';
var http = require('http'),

	express = require('express'),

	logger = require('./logger'),
	mappings = require('./mappings');

var app = express();

app.use(logger("logger"));

app.get('/:alias',function (req, res) {
	mappings.get(req.params.alias,function(err, mapping) {
		if(err){
			res.writeHead(404);
			res.write("404 error")
			return res.end();
		}
		// res.writeHead(302,{
		// 	location: mappings[alias]
		// });
		res.writeHead(302,{
			'content-type': 'text/html',
			'location': mapping
		});
		res.end();
	});
});

http.createServer(app).listen(3000);