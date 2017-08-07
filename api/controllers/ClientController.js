var Resource = require('resourcejs');
var jwt   = require("jsonwebtoken");
module.exports = function(app, route) {


  Resource(app, '', route, app.models.client).rest({
  before: function(req, res, next) {
     req.modelQuery = this.model.where().populate('product').populate('op_contact').populate('acc_contact').populate('tech_contact');
     var token = req.body.token || req.query.token || req.headers['x-access-token'];

			  if (token) {
			    jwt.verify(token, 'superSecret', function(err, decoded) {      
			    	if (err) {
			    		return res.json({ success: false, message: 'Failed to authenticate token.' });    
			    	} else {
				        req.decoded = decoded;    
				        next();
			  		}
				});

			} else {
			    return res.status(403).send({ 
			    	success: false, 
			    	message: 'No token provided.' 
			    });
			    
			}
	  }
  });

  return function(req, res, next) {
    next();
  };
};