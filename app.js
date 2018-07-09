import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import products from './routes/products';
import schedules from './routes/schedules';
import services from './routes/services';
import users from './routes/users';
import auth from './routes/auth';
import animals from './routes/animals';
import orders from './routes/orders';
import couch from './db';
import cors from 'cors';
import bcrypt from 'bcrypt';

let app = express();

const port = process.env.PORT || 3004;

const databases = [
    'products', 'users', 'animals', 'services', 'schedules', 'orders'
]

app.use(cors({
    origin:['http://localhost:3000']
}));

databases.map((db) => {
    couch.createDatabase(db).then(() => {
        console.log('database ' + db + ' created');
    }, err => {
        console.log('database ' + db + ' exists')
    }).finally(() => {
        // create admin and client user
        if (db == 'users') {
            let salt = bcrypt.genSaltSync(10);

            let mangoQuery = {
                selector: {
                    username: {
                        $eq: 'admin'
                    }
                }
            };

            couch.mango('users', mangoQuery).then(({ data, headers, status }) => {
                if (data.docs.length == 0) {
                    let user = {
                        username: 'admin',
                        password: 'admin',
                        name: 'admin teste',
                        email: 'admin@gmail',
                        role: 'admin'
                    }
                    user.password = bcrypt.hashSync(user.password, salt);
                    couch.insert('users', user).then(({ data, status }) => {
                        console.log('created a user with username: admin, password: admin, role: admin');
                    });
                }
            });

            mangoQuery.selector.username.$eq = 'client'

            couch.mango('users', mangoQuery).then(({ data, headers, status }) => {
                if (data.docs.length == 0) {
                    let user = {
                        username: 'client',
                        password: 'client',
                        name: 'client teste',
                        email: 'client@gmail',
                        role: 'client'
                    }
                    user.password = bcrypt.hashSync(user.password, salt);
                    couch.insert('users', user).then(({ data, status }) => {
                        console.log('created a user with username: client, password: client, role: client');
                    });
                }
            });
        }
    });
});
// Helmet helps to secure the app by setting various HTTP headers
app.use(helmet());

// configure app to use bodyParser()
// this will let us get the data from a POSTperm
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port);


app.get('/', function (req, res) {
    res.send('welcome');
});

// all of our routes will be prefixed with /api
app.use('/api', auth);
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/animals', animals);
app.use('/api/services', services);
app.use('/api/schedules', schedules);
app.use('/api/orders', orders);