const express = require('express');
// const db = require('sqlite');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const parser = require('body-parser');
const Users = require('./instaClone')
const expressSession = require('express-session');

let authApp = express();


authApp.use(parser.json())
authApp.use(expressSession({
	secret: 'SHHH!'
}));

/*
 * implement passport methods
 */
 passport.serializeUser((user, done) => {
     console.log('HERE');
     done(null, user)
 });
 passport.deserializeUser((user, done) => {
     done(null, user)
 });

 /*
  *	passport strategies, middleware
  */

  passport.use(new LocalStrategy(
    (username, password, done) => {
      db.get(`SELECT id, username FROM users WHERE username IS '${username}' AND password = '${password}'`)
        .then((row) => {
          if (!row) return done(null, false);
          return done(null, row);
        })
        .catch(err => console.error(err.stack))
    }
  ));




  authApp.use(passport.initialize());
  authApp.use(passport.session());


  authApp.post('/login', (request, response, next) => {
   	console.log('IN /login');

       passport.authenticate('local', (err, user, info) => {
       	console.log('IN passport.authenticate')
           if (err||!user){
           console.log(err)
              next()
           };
           request.logIn(user, (err) => {
           	console.log('LOGGED IN')
               if (err) return next(err);
               console.log('SESSION')
               console.log(request.session)
               // if we are here, user has logged in!
               response.header('Content-Type', 'application/json');
               response.send({ success: true, id : user.id});
               response.redirect('/feed.html')
                  next()
           });
       })(request, response, next);

   });


   authApp.use((request, response, next) => {
       console.log('in authRoutes')
       console.log(request.session, request.user)
       if (request.isAuthenticated()) {
           next();
       } else {
           response.status(403)
           response.send({ success: false })
       }
   })


authApp.post('/signup', (request, response) => {
 const body = request.body;
 const isCreated = Users.createNewUser(body)
        .then((data) => {
            response.header('Content-Type', 'application/json');
            response.send({
                success: true
            })
        })
        .catch((e) => {
            console.log(e)
            response.status(401);
        });});


module.exports = authApp;
