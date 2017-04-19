const express = require('express');
const db = require('sqlite');

let app = express();
const port = 1133;

const DB_NAME = '../database.sqlite';
const socket = require('./sqliteui/websocket');

app.use('/', express.static('./js/sqliteui/public', {
    'index': ['index.html']
}));

const SocketInst = socket(DB_NAME, app);
app = SocketInst.app;

// this is sqliteui stuff



// app.use('/api', );


Promise.resolve()
    .then(() => db.open(DB_NAME, { Promise }))
    .then(() => db.migrate({ force: 'last' }))
    .then(() => app.listen(port))
    .then(() => {console.log(`Server started on port ${port}`)})
    .catch(err => console.error(err.stack))
