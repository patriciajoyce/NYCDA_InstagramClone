const express = require('express');
const db = require('sqlite');
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

  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
}, (username, password, done) => {

    if (!username || !password) {
        return done('Not Valid', {}, {});
    }
    return done(null, { success: true });
}));



  authApp.use(passport.initialize());
  authApp.use(passport.session());


  authApp.post('/login', (request, response, next) => {
   	console.log('IN /login');

       passport.authenticate('local', (err, user, info) => {
       	console.log('IN passport.authenticate')
           if (err||!user){
           console.log(err, user, info);
              next()
           };
           request.logIn(user, (err) => {
           	console.log('LOGGED IN')
               if (err) return next(err);
               console.log('SESSION')
               console.log(request.session)
               // if we are here, user has logged in!
               response.header('Content-Type', 'application/json');
               response.redirect('/feed.html')
               response.send({ success: true});
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
