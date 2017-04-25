
const express = require('express');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const expressSession = require('express-session');
const parser = require('body-parser');

const app = express();


app.use(parser.json())
app.use(expressSession({
	secret: 'FOBAR'
}));


 passport.serializeUser((user, done) => {
     console.log('HERE', Object.assign(user, {foo: 1}));
     done(null, user)
 });
 passport.deserializeUser((user, done) => {
     done(null, user)
 });


 passport.use(new LocalStrategy({
     usernameField: 'email',
     passwordField: 'password',
 }, (email, password, done) => {
     console.log('in localstrategy');
     console.log(email, password);
     if (!email || !password) {
         return done('f-ed up', {}, {});
         // done(err, user, info)
     }

     console.log('ABOUT TO BE DONE');
     return done(null, {user: 'Oz'});
 }));


	app.use(expressSession({
		secret: 'FOBAR'
	}));
 app.use(passport.initialize());
 app.use(passport.session());


 app.post('/auth/login', (request, response, next) => {
 	console.log('IN /auth/login');

     passport.authenticate('local', (err, user, info) => {
     	console.log('IN passport.authenticate')
         if (err) console.log(err);
         if (!user) console.log(user);

         request.logIn(user, (err) => {
         	console.log('LOGGED IN')
             if (err) return next(err);
             console.log('SESSION')
             console.log(request.session)
             // if we are here, user has logged in!
             response.header('Content-Type', 'application/json');

             response.send({
                 success: true,
             });
         });
     })(request, response, next);

 });



app.use('/', express.static('public'));


app.use((request, response, next) => {
	console.log(request.session, 'here')
	console.log(request.user);
	if (request.isAuthenticated()) {
		next()
	}
	else {
		response.status(401);
		response.send({
			success: false,
			message: "not logged in"
		})
	}
})

app.get('/api/info', (request, response) => {
	response.header('Content-Type', 'application/json');

		response.send({
			"message": "Hello, Wrold!",
			"success": true
		});


});