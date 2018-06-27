var config = require('./config');
var jwt = require('jsonwebtoken');

exports.auth = function(req, res, next) {
	// test
	next();

    // check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) {
		jwt.verify(token, config.secret, function(err, decoded) {      
			if (err) {
				return res.status(400).json({ message: 'Failed to authenticate token.' });    
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;    
				next();
			}
		});
	} else {
		return res.status(403).json({ message: 'No token provided.' });
	}
}
 
exports.permissions = function(req, res, next) { 
	// test
	next();

	let path = req.originalUrl.split('/');
	let params = Object.keys(req.params).map(key => req.params[key]);
	let permissions = req.decoded.permissions[req.method.toLowerCase()];
	let allowed = false;
	
	// this will convert a route /users/1 to /users/:param
	for (let i = 0, len = path.length; i < len; i++) {
		for (let j = 0, len = params.length; j < len; j++) {
			if(path[i] == params[j]) path[i] = ':param';
		}		
	}

	path = path.join('/');
	console.log(permissions, path);

	for (let i = 0, len = permissions.length; i < len; i++) {
		if(permissions[i] == path)
			allowed = true;
	}

	if (allowed) next();
	else return res.status(403).json({ message: "User doesn't have permission to access." });
}