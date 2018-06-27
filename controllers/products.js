import schemas from '../schemas';

let products = require('../couchdb').use('products');

// exports.create = schemas.validating('product', create);

// function create(product, cb) {  
//   products.insert(product, product.email, cb);
// }

exports.create = (req, res) => {
    products.insert(req.body, req.body.name, (err, results) => {
        if (err) return res.status(400).json({message: "Validation error.", error: err});

		return res.status(201).json(results);
    });
}