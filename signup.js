const express = require('express');
const db = require('sqlite');
const DB_NAME = './database.sqlite';
const signUp = express();
const instaClone = require('./instaClone')
const parser = require('body-parser');
const expressSession = require('express-session');

// use body parser
signUp.use(parser.json());
// pull in session middleware
signUp.use(expressSession({
  secret: 'WorkDamnYou'
}));

signUp.post('/signup', (request, response) => {
  console.log("WE ARE IN BACKEND:  ",request.body);
  const {body} = request;
  const {username, email, password} = body;
  const newUserCreated = instaClone.createNewUser(username, email, password)
      response.header('Content-Type', 'application/json');
      if (newUserCreated) {
        response.send({
          success: true })
      }
      else {
      response.header('Content-Type', 'application/json');
      response.status(400)
      response.send({error: 'some invalid fields'})
      }
});



// signUp.post('/signup', (request, response) => {
//   console.log("WE ARE IN BACKEND:  ",request.body);
//   // const {body} = request;
//   // const {username, email, password} = request.body;
//   const newUserCreated = instaClone.createNewUser(request.body)
//     .then((data) => {
//       console.log(data)
//       response.header('Content-Type', 'application/json');
//       response.send({
//         success: true
//       })
//     })
//     .catch((e) => {
//       console.log(e)
//       response.status(401);
//     });
//
// });
//

module.exports = signUp;
