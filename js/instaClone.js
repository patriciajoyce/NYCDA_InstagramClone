const db = require('sqlite');
const DB_NAME = './database.sqlite';

const instaClone = {};

instaClone.get('/users', (req, res, next) => {
    db.all('SELECT * FROM users')
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({ users: data });
        })
        .catch((e) => {
            res.status(401);
        });
});
