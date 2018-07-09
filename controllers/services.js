const db = require('../db');


exports.create = (req, res) => {
    db.insert('services', req.body).then( ({data, status}) => {
        if (status != 201)
            return res.status(400).json({message: "DB error."});

		return res.status(201).json(data);
    });

}

exports.get = (req, res) => {
    let id = req.params.id;

    db.get('services', id).then( ({data, status}) => {
        if (status != 200)
            return res.status(400).json({message: "Resource not found."});

        data.id = data._id
		return res.status(200).json(data);
    });

}

exports.getAll = (req, res) => {
    const query = {
        include_docs: true
    }
    db.get('services', '_all_docs', query).then( ({data, status}) => {
        if (status != 200)
            return res.status(400).json({message: "DB error."});
        let result = []
        data.rows.map((obj) => {
            obj.doc.id = obj.doc._id
            result.push(obj.doc)
        });
		return res.status(200).json(result);
    });

}

exports.delete = async (req, res) => {
    let id = req.params.id;

    let product = await db.get('services', id).then( ({data, status}) => {
        if (status != 200)
            return res.status(404).json({message: "Not found."});

        return data;
    });

    db.del('services', product._id, product._rev).then( ({data, status}) => {
        return res.status(status).json(req.body);
    });

}

exports.edit = async (req, res) => {
    let id = req.params.id;

    let services = await db.get('services', id).then( ({data, status}) => {
        if (status != 200)
            return res.status(404).json({message: "Not found."});

        return data;
    });

    req.body._id = services._id;
    req.body._rev = services._rev;
    
    db.update('services', req.body).then( ({data, headers, status}) => {
        if (status == 201)
            return res.status(status).json(req.body);
        else
            return res.status(403).json({message: "Unauthorized"});
    });
    
}