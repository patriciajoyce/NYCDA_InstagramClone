const express = require('express');
const db = require('sqlite');
const API = require('./apiRoutes');
const signup = require('./signup')
const Auth = require('./authRoutes')

const app = express();
const port = 1133;

const DB_NAME = './database.sqlite';
// const socket = require('./sqliteui/websocket');

// app.use('/', express.static('./sqliteui/public', {
//       'index': ['index.html'],
//       'login': ['login.html'],
//       'signup': ['signup.html']
//  }));



app.use('/', express.static('public'))


// app.use('/', express.static('public', {
//     'feed': ['feed.html']
//     'login': ['login.html'],
//     'signup': ['signup.html'],
//     'profile': ['profile.html']
// }));


app.listen(port, () => {
  console.log("App now running on PORT:", port);
})


// const SocketInst = socket(DB_NAME, app);
// app = SocketInst.app;

app.use('/api', API);
app.use('/auth', signup);

// app.use(signup);
app.use('/loginAuth',Auth);
// app.use(Auth);
//
//
// Promise.resolve()
//     .then(() => db.open(DB_NAME, { Promise }))
//     .then(() => db.migrate({ force: 'last' }))
//     .then(() => app.listen(port))
//     .then(() => {console.log(`Server started on port ${port}`)})
//     .catch(err => console.error(err.stack))
