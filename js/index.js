//include express
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const parser = require('body-parser');
const app = express();




app.use(expressSession({
	secret: 'FOOBAR'
}));
app.use(parser.json())
app.use(passport.initialize());
app.use(passport.session());



passport.serializeUser((user, done) => {
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
        
    }

    console.log('ABOUT TO BE DONE');
    return done(null, {user: 'Joy'});
}));


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
          
            response.header('Content-Type', 'application/json');

            response.send({
                 "message": "Hello, Wrold!",
	   			 "success": true
            });
        });
    })(request, response, next);

});


app.get('/api/info', passport.authenticate('local'), (request, response) => {

	response.header('Content-Type', 'application/json');
	response.send({
	    "message": "Hello, Wrold!",
	    "success": true
	});

});


// static file server
// const serveStatic = require('serve-static');

// body parser middleware
// const parser = require('body-parser');

//parses requests with the content type of `application/json`
// app.use(parser.json());


//have the application listen on a specific port
app.listen(1133, () => {
    console.log('Example app listening on port 1133!');
});
