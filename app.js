'use strict';
var http = require('http'),

	connect = require('connect'),

	logger = require('./logger'),
	mappings = require('./mappings');

var app = connect();

app.use(logger("logger"));
app.use(logger("logger"));
app.use(function (req, res) {
	mappings.get(req.url,function(err, mapping) {
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