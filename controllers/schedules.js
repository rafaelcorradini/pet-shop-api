const db = require('../db');


exports.create = (req, res) => {
    if (req.decoded.role == 'client')
        req.body.clientId = req.decoded.user_id;
    else {
        if (req.body.clientId == null || req.body.clientId == undefined)
            return res.status(400).json({message: "Missing clientId."});
    }
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
            return res.status(404).json({message: "Resource not found."});

        data.id = data._id
        if (req.decoded.role == 'client') {
            if(data.clientId == req.decoded.user_id)
                return res.status(200).json(data);
            else {
                return res.status(404).json({message: "Resource not found."});
            }
        } else {
            return res.status(200).json(data);
        }
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
            obj.doc.id = obj.doc._id
            if (obj.doc.date == req.query.date) {
                if (req.decoded.role == 'client') {
                    if(obj.doc.clientId == req.decoded.user_id)
                        result.push(obj.doc);
                } else {
                    result.push(obj.doc);
                }
            }
            
        });
		return res.status(200).json(result);
    });

}

exports.delete = async (req, res) => {
    let id = req.params.id;

    let doc = await db.get('schedules', id).then( ({data, status}) => {
        if (status != 200)
            return res.status(404).json({message: "Resource not found."});

        if (req.decoded.role == 'client') {
            if(data.clientId == req.decoded.user_id)
                return data;
            else {
                return res.status(404).json({message: "Resource not found."});
            }
        } else {
            return data;
        }
    });

    db.del('schedules', doc._id, doc._rev).then( ({data, status}) => {
        return res.status(status).json(req.body);
    });

}

exports.edit = async (req, res) => {
    let id = req.params.id;

    if (req.decoded.role == 'client')
        req.body.clientId = req.decoded.user_id;
    else {
        if (req.body.clientId == null || req.body.clientId == undefined)
            return res.status(400).json({message: "Missing clientId."});
    }

    let schedules = await db.get('schedules', id).then( ({data, status}) => {
        if (status != 200)
            return res.status(404).json({message: "Resource not found."});

        if (req.decoded.role == 'client') {
            if(data.clientId == req.decoded.user_id)
                return data;
            else {
                return res.status(404).json({message: "Resource not found."});
            }
        } else {
            return data;
        }
    });

    req.body._id = schedules._id;
    req.body._rev = schedules._rev;
    
    db.update('schedules', req.body).then( ({data, headers, status}) => {
        if (status == 201)
            return res.status(status).json(req.body);
        else
            return res.status(403).json({message: "Unauthorized"});
    });
    
}