import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import products from './routes/products';
import schedules from './routes/schedules';
import services from './routes/services';
import users from './routes/users';
import auth from './routes/auth';
import animals from './routes/animals';
import couch from './db';

let app = express();

const port = process.env.PORT || 3000;

const databases = [
  'products', 'users', 'animals', 'services', 'schedules'
]

databases.map((db) => {
  couch.createDatabase(db).then(() => {
    console.log('database '+db+' created');
  }, err => {
    console.log('database '+db+' exists')
  });
});
// Helmet helps to secure the app by setting various HTTP headers
app.use(helmet());

// configure app to use bodyParser()
// this will let us get the data from a POSTperm
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port);


app.get('/', function(req, res) {
    res.send('welcome');
});

// all of our routes will be prefixed with /api
app.use('/api', auth);
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/animals', animals);
app.use('/api/services', services);
app.use('/api/schedules', schedules);