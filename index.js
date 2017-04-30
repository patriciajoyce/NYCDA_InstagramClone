const express = require('express');
const db = require('sqlite');
const API = require('./apiRoutes');
const signup = require('./signup')
const Auth = require('./authRoutes').authApp

const app = express();
const port = 1133;

const DB_NAME = './database.sqlite';

app.use('/', express.static('public'))

app.use('/auth', signup);

app.use('/loginAuth', Auth);

// locks down routes belows. requires authentication
app.use('/api', API);


Promise.resolve()
    .then(() => db.open(DB_NAME, { Promise }))
    .then(() => db.migrate({ force: 'last' }))
    .then(() => app.listen(port))
    .then(() => {console.log(`Server started on port ${port}`)})
    .catch(err => console.error(err.stack))
