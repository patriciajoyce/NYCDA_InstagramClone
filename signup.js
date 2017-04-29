const express = require('express');
const db = require('sqlite');
const DB_NAME = './database.sqlite';

const signUp = express();


// const socket = require('./sqliteui/websocket');
// const SocketInst = socket(DB_NAME, app);
// app = SocketInst.app;


const instaClone = require('./instaClone')
// parser session middleware
const parser = require('body-parser');
// pull in session middleware
const expressSession = require('express-session');

// use body parser
signUp.use(parser.json());

signUp.use(expressSession({
  secret: 'WorkDamnYou'
}));


signUp.post('/signup', (request, response) => {
  console.log("WE ARE IN BACKEND:  ",request.body);
  // const {body} = request;
  // const {username, email, password} = request.body;
  const newUserCreated = instaClone.createNewUser(request.body)
    .then((data) => {
      console.log(data)
      response.header('Content-Type', 'application/json');
      response.send({
        success: true
      })
    })
    .catch((e) => {
      console.log(e)
      response.status(401);
    });

});
//
// Promise.resolve()
//     .then(() => db.open(DB_NAME, { Promise }))
    // .then(() => db.migrate({ force: 'last' }))
    // .then(() => app.listen(PORT))
    // .then(() => {console.log(`Server started on port ${PORT}`)})
    // .catch(err => console.error(err.stack))

module.exports = signUp;
