import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import products from './routes/products';
import couch from './db';
// import auth from './routes/auth';
// import users from './routes/users';
// import db from './db';
// import models from './models/';

let app = express();

const port = process.env.PORT || 3000;

couch.db.create('petshop', function(err) {  
    if (err && err.statusCode != 412) {
      console.error(err);
    }
    else {
      console.log('database petshop exists');
    }
});

// Helmet helps to secure the app by setting various HTTP headers
app.use(helmet());

// configure app to use bodyParser()
// this will let us get the data from a POSTperm
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// db connections and models
// app.use(function (req, res, next) {
//     let object = {
//         mysql: db.mysql(),
//         mongodbacl: db.mongodb()
//     };
      
//     req.db = object;
//     req.models = models(req.db);

//     next();
// });

app.listen(port);


// router config
let router = express.Router();       

app.get('/', function(req, res) {
    res.send('welcome');   
});

// all of our routes will be prefixed with /api
// app.use('/api', auth);
// app.use('/api/users', users);
app.use('/api/users', products)