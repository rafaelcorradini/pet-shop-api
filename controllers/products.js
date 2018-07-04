import schemas from '../schemas';
const db = require('../db');


exports.create = schemas.validating('product', req.body, create);

create = (req, res) => {
    if (!validate)
        return res.status(400).json({message: "Validation error.", error: err});

    return db.insert('products', req.body).then( ({data, status}) => {
        if (status != 201)
            return res.status(400).json({message: "DB error.", error: err});

		return res.status(201).json(data);
    });
}

exports.getAll = (req, res) => {
    const query = {
        include_docs: true
    }
    return db.get('products', '_all_docs', query).then( ({data, status}) => {
        if (status != 200)
            return res.status(400).json({message: "DB error.", error: err});

		return res.status(200).json(data.rows);
    });
}