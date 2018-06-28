// import schemas from '../schemas';

const db = require('../db');

// exports.create = schemas.validating('product', create);

// function create(product, cb) {  
//   products.insert(product, product.email, cb);
// }

exports.create = (req, res) => {
    db.insert('products', req.body).then( ({data, status}) => {
        if (status != 201)
            return res.status(400).json({message: "Validation error.", error: err});

		return res.status(201).json(data);
    });
}

exports.getAll = (req, res) => {
    db.get('products').then( ({data, status}) => {
        if (status != 200)
            return res.status(400).json({message: "Validation error.", error: err});

		return res.status(200).json(data);
    });
}