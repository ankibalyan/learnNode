'user strict';

var data = {
	g: 'http://google.com'
};

var mappings = {
	get: function (alias,callback) {
		// var alias = url.substring(1);
		if(!data[alias]){
			return callback(new Error("Url not found"));
		}
		return callback(null,data[alias]);
	}
}
module.exports = mappings;