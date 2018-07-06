const db = require('../db');


exports.create = (req, res) => {
    db.insert('schedules', req.body).then( ({data, status}) => {
        if (status != 201)
            return res.status(400).json({message: "DB error."});

		return res.status(201).json(data);
    });
}

exports.get = (req, res) => {
    let id = req.params.id;

    db.get('schedules', id).then( ({data, status}) => {
        if (status != 200)
            return res.status(400).json({message: "Resource not found."});

		return res.status(200).json(data);
    });
}

exports.getAll = (req, res) => {
    const query = {
        include_docs: true
    }
    db.get('schedules', '_all_docs', query).then( ({data, status}) => {
        if (status != 200)
            return res.status(400).json({message: "DB error."});
        let result = []
        data.rows.map((obj) => {
            result.push(obj.doc)
        });
		return res.status(200).json(result);
    });
}

exports.delete = async (req, res) => {
    let id = req.params.id;

    let product = await db.get('schedules', id).then( ({data, status}) => {
        if (status != 200)
            return res.status(404).json({message: "Not found."});

        return data;
    });

    db.del('schedules', product._id, product._rev).then( ({data, status}) => {
        return res.status(status).json(req.body);
    });
}

exports.edit = async (req, res) => {
    let id = req.params.id;

    let schedules = await db.get('schedules', id).then( ({data, status}) => {
        if (status != 200)
            return res.status(404).json({message: "Not found."});

        return data;
    });

    console.log(req.body)
    req.body._id = schedules._id
    req.body._rev = schedules._rev
    
    console.log(req.body)
    db.update('schedules', req.body).then( ({data, headers, status}) => {
        if (status == 201)
            return res.status(status).json(req.body);
        else
            return res.status(403).json({message: "Unauthorized"});
    });
    
    
}