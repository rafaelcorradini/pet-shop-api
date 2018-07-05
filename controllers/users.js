var bcrypt = require('bcrypt');
var jwt    = require('jsonwebtoken');
var config = require('../config');
const db = require('../db');

exports.create = (req, res) => {
    let user = req.body;
    let salt = bcrypt.genSaltSync(10);

    if (req.body.password == undefined || req.body.password == null)
        return res.status(400).json({message: "Missing password."});
    user.password = bcrypt.hashSync(req.body.password, salt);
    db.insert('users', user).then( ({data, status}) => {
        if (status != 201)
            return res.status(400).json({message: "DB error."});

		return res.status(201).json(data);
    });
}

exports.get = (req, res) => {
    let id = req.params.id;

    if (req.decoded.role == 'client')
        id = req.decoded.user_id;

    db.get('users', id).then( ({data, status}) => {
        if (status != 200)
            return res.status(400).json({message: "Resource not found."});

		return res.status(200).json(data);
    });
}

exports.getAll = (req, res) => {
    const query = {
        include_docs: true
    }
    db.get('users', '_all_docs', query).then( ({data, status}) => {
        if (status != 200)
            return res.status(400).json({message: "DB error."});
        let result = []
        data.rows.map((obj) => {
            result.push(obj.doc)
        });
		return res.status(200).json(result);
    });
}

exports.edit = async (req, res) => {
    let id = req.params.id;
    let password = req.body.password;

    let user = await db.get('users', id).then( ({data, status}) => {
        if (status != 200)
            return res.status(404).json({message: "Not found."});

        return data;
    });

    req.body._id = user._id
    req.body._rev = user._rev
    req.body.password = user.password

    if ((req.decoded.role == 'client' && bcrypt.compareSync(password, user.password)) ||
        req.decoded.role == 'admin') {
        db.update('users', req.body).then( ({data, status}) => {
            return res.status(status).json(req.body);
        });
    } else {
        return res.status(403).json({message: "Unauthorized"});
    }
}

exports.delete = async (req, res) => {
    let id = req.params.id;

    let user = await db.get('users', id).then( ({data, status}) => {
        if (status != 200)
            return res.status(404).json({message: "Not found."});

        return data;
    });

    db.del('users', user._id, user._rev).then( ({data, status}) => {
        return res.status(status).json(req.body);
    });
}

exports.login = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    const mangoQuery = {
        selector: {
            username: {
               $eq: username
            }
         }
    };

    if (username == null || username == undefined || password == null || password == undefined)
        return res.status(400).json({message: "Authentication failed."});

	db.mango('users', mangoQuery).then(({data, headers, status}) => {
        let user = data.docs[0];
		if (typeof user === 'undefined' || user.length == 0) {
            return res.status(400).json({message: "Authentication failed. Username doesn't exists."});
        } else {
            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(400).json({message: "Authentication failed. wrong password."});
            } else {
                let token = jwt.sign({user_id: user._id, role: user.role}, config.secret, {
                    expiresIn: 60*60*24 // expires in 24 hours
                });

                let result = {
                    token: token
                }

                return res.status(200).json(result);
            }
        }
	});
}