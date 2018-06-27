var bcrypt = require('bcrypt');
var jwt    = require('jsonwebtoken'); 
var config = require('../config');

exports.create = function(req, res) {
    let user = req.body;
    let salt = bcrypt.genSaltSync(10);
    
    user.password = bcrypt.hashSync(req.body.password, salt);
	req.models.user.create(user, function(err, results) {
		if (err) return res.status(400).json({message: "Validation error.", error: err});

		return res.status(201).json(results);
	});
}

exports.get = function(req, res) {
    let user = {};
    let id = req.params.id;

    if (id == null) {
        req.models.user.find({}, function(err, results) {
            if (err) return res.status(400).json({message: "0 records.", error: err});

            return res.status(200).json(results);
        });
    } else {        
        req.models.user.get(id, function(err, results) {
            if (err) return res.status(400).json({message: "0 records.", error: err});

            return res.status(200).json(results);
        });
    }    
}

exports.edit = function(req, res) {
    let id = req.params.id;
    let password = req.body.password;

	req.models.user.get(id, function(err, user) {
		if (err) return res.status(400).json({message: "User not found.", error: err});

        if (bcrypt.compareSync(password, user.password)) {
            user.name = user.name;
            user.save(function(err) {
                if (err) return res.status(400).json({message: "Something went wrong.", error: err});
                
                return res.status(200).json({message: "User updated."});
            });	
        } else {
            return res.status(400).json({message: "Authentication failed. wrong password.", error: err});
        }    
	});
}

exports.delete = function(req, res) {
    let id = req.params.id;

	req.models.user.get(id, function(err, user) {
		if (err) return res.status(400).json({message: "User not found.", error: err});

        if (bcrypt.compareSync(password, user.password)) {
            user.remove(function(err) {
                if (err) return res.status(400).json({message: "Something went wrong.", error: err});
                
                return res.status(200).json({message: "User removed."});
            });	
        } else {
            return res.status(400).json({message: "Authentication failed. wrong password.", error: err});
        }        
	});
}

exports.login = function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let permissions;

	req.models.user.find({username: username}, function(err, user) {
		if (typeof user === 'undefined' || user.length == 0) {
            return res.status(400).json({message: "Authentication failed. Username doesn't exists.", error: err});
        } else {
            if (!bcrypt.compareSync(password, user[0].password)) {
                return res.status(400).json({message: "Authentication failed. wrong password.", error: err});
            } else {
                if (user[0].role == 'patient' || user[0].role == 'receptionist') {
                    if (user[0].patient.permissions == null) {
                        permissions = config.permissions[user[0].role];
                    } else {
                        permissions = user[0].patient.permissions;
                    }    
                } else {
                    permissions = config.permissions[user[0].role];
                }
                var token = jwt.sign({user_id: user[0].id, permissions: permissions, role: user[0].role}, config.secret, {
                    expiresIn: 60*60*24 // expires in 24 hours
                });

                user[0].token = token;
                user[0].permissions = permissions;

                return res.status(200).json(user[0]); 
            }
        }
	});
}