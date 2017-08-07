var Resource = require('resourcejs');
var jwt   = require("jsonwebtoken");
module.exports = function(app, route) {


	Resource(app, '', route, app.models.user).rest(	
);

	return function(req, res, next) {
		next();
	};
};