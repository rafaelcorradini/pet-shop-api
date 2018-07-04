const db = require('../db');


exports.create = (req, res) => {
    db.insert('products', req.body).then( ({data, status}) => {
        if (status != 201)
            return res.status(400).json({message: "DB error."});

		return res.status(201).json(data);
    });
}

exports.get = (req, res) => {
    let id = req.params.id;

    db.get('products', id).then( ({data, status}) => {
        if (status != 200)
            return res.status(400).json({message: "Resource not found."});

		return res.status(200).json(data);
    });
}

exports.getAll = (req, res) => {
    const query = {
        include_docs: true
    }
    db.get('products', '_all_docs', query).then( ({data, status}) => {
        if (status != 200)
            return res.status(400).json({message: "DB error."});
        let result = []
        data.rows.map((obj) => {
            result.push(obj.doc)
        });
		return res.status(200).json(result);
    });
}