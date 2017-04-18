const passport = require('passport');
const expressSession = require('express-session');
const LocalStrategy = require('passport-local').Strategy;

app.use(expressSession({
    secret: 'FOBAR'
}));
app.use(parser.json())


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
    return done(null, {user: 'OZsome'});
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
           
            response.header('Content-Type', 'application/json');

            response.send({
                success: true,
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
