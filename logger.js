'use strict';

var setup = function(appName) {
	return function(req, res, next) {
		if(next.hasBeenLogged){
			return next();
		}
		console.log(appName + " : " + req.method + " " + req.url);
		next.hasBeenLogged = true;
		next();
	}
}

module.exports = setup;