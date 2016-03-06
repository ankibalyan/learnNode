'user strict';
var path = require('path'),
	
	Database = require('nedb');

// var data = {
// 	g: 'http://google.com'
// };

var db = {
	mappings: new Database({filename: path.join(__dirname,'mappings.db'),autoload: true})
}

var mappings = {
	get: function (alias,callback) {
		db.mappings.findOne({alias: alias},function(err, mapping) {
			// var alias = url.substring(1);
			if(err || !mapping){
				return callback(new Error("alias not found"));
			}
			return callback(null,mapping.url);
		})
	},
	create: function(alias, url, callback) {
		db.mappings.insert({'alias': alias, url: url},callback);
	},
	list:function(callback) {
		db.mappings.find({}).sort({alias:1}).exec(callback);
	}
}
module.exports = mappings;