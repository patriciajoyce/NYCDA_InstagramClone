const express = require('express');
const passport = require('passport');
const app = express();
const Users = require('./instaClone')
const LocalStrategy = require('passport-local').Strategy;


const parser = require('body-parser');
const expressSession = require('express-session');



app.use(parser.json())
app.use(expressSession({
    secret: 'FOBOAR'
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



app.use((request, response, next) => {
    next()
})

app.post('/auth/signup', (request, response) => {
   
    const {body} = request;
    const {email, username, password} = body;


    const isCreated = Users.createNewUser(email, username, password);

    response.header('Content-Type', 'application/json');
   // if user successfully created, respond with success
    if (isCreated) {
        response.send({success: true})
    }
   // otherwise, send 400
    else {
        response.header('Content-Type', 'application/json');
        response.status(400)
        response.send({error: 'some fields not valid LOL'})
    }

});

// login route
app.post('/auth/login', (request, response) => {
   
    const body = request.body;
    const {email, password} = body;

    const loggedInState = Users.login(email.toLowerCase(), password);
console.log(loggedInState)
    if (loggedInState.error === true) {
        // user has not logged in
        if (typeof request.session.numAttempts === "undefined") {
            request.session.numAttempts = 0;
        }
        else {
            request.session.numAttempts++;
        }
        response.header('Content-Type', 'application/json');
        response.send(loggedInState)
        return;
    }


    response.header('Content-Type', 'application/json');
    response.send({error: 'foobar'})
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

module.exports = app;