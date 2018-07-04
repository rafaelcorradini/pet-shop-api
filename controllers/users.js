var bcrypt = require('bcrypt');
var jwt    = require('jsonwebtoken');
var config = require('../config');
const db = require('../db');

exports.create = (req, res) => {
    let user = req.body;
    let salt = bcrypt.genSaltSync(10);

    user.password = bcrypt.hashSync(req.body.password, salt);
    db.insert('users', user).then( ({data, status}) => {
        if (status != 201)
            return res.status(400).json({message: "DB error."});

		return res.status(201).json(data);
    });
}

exports.get = (req, res) => {
    let id = req.params.id;

    db.get('users', id).then( ({data, status}) => {
        if (status != 200)
            return res.status(400).json({message: "Resource not found."});

		return res.status(200).json(data);
    });
}

exports.edit = function(req, res) {
    let id = req.params.id;
    let password = req.body.password;

	req.models.user.get(id, function(err, user) {
		if (err) return res.status(400).json({message: "User not found."});

        if (bcrypt.compareSync(password, user.password)) {
            user.name = user.name;
            user.save(function(err) {
                if (err) return res.status(400).json({message: "Something went wrong."});

                return res.status(200).json({message: "User updated."});
            });
        } else {
            return res.status(400).json({message: "Authentication failed. wrong password."});
        }
	});
}

exports.delete = function(req, res) {
    let id = req.params.id;

	req.models.user.get(id, function(err, user) {
		if (err) return res.status(400).json({message: "User not found."});

        if (bcrypt.compareSync(password, user.password)) {
            user.remove(function(err) {
                if (err) return res.status(400).json({message: "Something went wrong."});

                return res.status(200).json({message: "User removed."});
            });
        } else {
            return res.status(400).json({message: "Authentication failed. wrong password."});
        }
	});
}

exports.login = function(req, res) {
    let username = req.body.username;ogin
    let password = req.body.password;
    let permissions;

    const mangoQuery = {
        selector: {
            username: {
               $eq: username
            }
         }
    };

	db.mango('users', mangoQuery).then(({data, headers, status}) => {
        let user = data.docs[0];
		if (typeof user === 'undefined' || user.length == 0) {
            return res.status(400).json({message: "Authentication failed. Username doesn't exists."});
        } else {
            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(400).json({message: "Authentication failed. wrong password."});
            } else {
                permissions = config.permissions[user.role];
                let token = jwt.sign({user_id: user.id, permissions: permissions, role: user.role}, config.secret, {
                    expiresIn: 60*60*24 // expires in 24 hours
                });

                let result = {
                    token: token,
                    permissions: permissions
                }

                return res.status(200).json(result);
            }
        }
	});
}