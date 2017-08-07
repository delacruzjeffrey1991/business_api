var Resource = require('resourcejs');
var jwt   = require("jsonwebtoken");
module.exports = function(app, route) {


	app.post('/authenticate',function(req,res){
			  app.models.user.findOne({
			  	username: req.body.username,
			  	password: req.body.password
			  }, function(err, user) {

			  	if (err) throw err;

			  	if (!user) {
			  		res.json({ success: false, message: 'Authentication failed. User not found.' });
			  	} else if (user) {

				      if (user.password != req.body.password) {
				      	res.json({ success: false, message: 'Authentication failed. Wrong password.' });
				      } else {
				        var token = jwt.sign(user, 'superSecret', {
				          expiresIn: "2 days" // expires in 24 hours
				      });
				        res.json({
				        	success: true,
				        	message: 'Enjoy your token!',
				        	token: token
				        });
			   		 }   

				}
			});

	});	


	return function(req, res, next) {
		next();
	};
};