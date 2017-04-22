const express = require('express');
const db = require('sqlite');
const API = require('./apiRoutes');
const AUTH = require('./authRoutes')

let app = express();
const port = 1133;

const DB_NAME = './database.sqlite';
const socket = require('./sqliteui/websocket');

app.use('/', express.static('./sqliteui/public', {
    'index': ['index.html']
}));

app.use('/', express.static('./public'));


const SocketInst = socket(DB_NAME, app);
app = SocketInst.app;

app.use('/api', API);
// app.use('/auth',Auth);

Promise.resolve()
    .then(() => db.open(DB_NAME, { Promise }))
    .then(() => db.migrate({ force: 'last' }))
    .then(() => app.listen(port))
    .then(() => {console.log(`Server started on port ${port}`)})
    .catch(err => console.error(err.stack))
