const express = require('express');
const db = require('sqlite');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const parser = require('body-parser');
const Users = require('./instaClone')
const expressSession = require('express-session');

const authApp = express();



authApp.use(parser.json())
authApp.use(expressSession({
  secret: 'SHHH!'
}));

/*
 * implement passport methods
 */
passport.serializeUser((user, done) => {
  console.log('in serializer');
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
  },
  (username, password, done) => {
    db.get(`SELECT users.id, users.username FROM users WHERE users.username = '${username}' AND users.password = '${password}'`)
      .then((valid) => {
        console.log("VALID: ",valid);
        if (!valid) return done(null, false);
        return done(null, valid);
      })
      .catch(err => console.error(err.stack))
  }
));

authApp.use(passport.initialize());
authApp.use(passport.session());

authApp.get('/logout', (request, response, next) => {
        console.log('in /loginAuth/logout ')
        request.logout();
        next();
    });


authApp.post('/login', (request, response, next) => {
  console.log("LOGIN req.body:  ",request.body);
  console.log('IN /loginAuth/login');

  passport.authenticate('local', (err, user, info) => {
    console.log('IN passport.authenticate')
    if (err || !user) {
      console.log('err, user, info :',err, user, info);
      next()
    };
    request.logIn(user, (err) => {
      console.log('LOGGED IN')
      if (err) return next(err);

      console.log('SESSION')
      // if we are here, user has logged in!
      response.header('Content-Type', 'application/json');
      response.send({
        success: true,
        id: user.id,
        username: user.username
      });
      next()
    });
  })(request, response, next);

});


authApp.use((request, response, next) => {
  console.log('in authRoutes')
  console.log('req.user :',request.user)
  console.log('req,isAuth :',request.isAuthenticated());

  if (request.isAuthenticated()) {
    console.log('is authenticated');
    next();
    return;
  }
    response.header('Content-Type', 'application/json');
    response.status(403)
    response.send({success: false})
    return;
});


module.exports = {authApp, passport};
