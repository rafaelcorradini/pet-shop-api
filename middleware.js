const config = require('./config');
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
	// check header or url parameters or post parameters for token
	const authorization = req.headers['authorization'];
	let token = null;
	if (authorization != undefined)
  	token = authorization.split('Bearer ')[1];

	if (token) {
		jwt.verify(token, config.secret, function (err, decoded) {
			if (err) {
				return res.status(401).json({ message: 'Failed to authenticate token.' });
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(401).json({ message: 'No token provided.' });
	}
}

exports.permissions = (req, res, next) => {
	let path = req.originalUrl.split('/');
	let params = Object.keys(req.params).map(key => req.params[key]);
	let permissions = config.permissions[req.decoded.role][req.method.toLowerCase()];
	let allowed = false;

	// this will convert a route /users/1 to /users/:param
	for (let i = 0, len = path.length; i < len; i++) {
		for (let j = 0, len = params.length; j < len; j++) {
			if (path[i] == params[j]) path[i] = ':param';
		}
	}

	path = path.join('/');

	for (let i = 0, len = permissions.length; i < len; i++) {
		if (permissions[i] == path)
			allowed = true;
	}

	if (allowed) next();
	else return res.status(403).json({ message: "Unauthorized operation." });
}