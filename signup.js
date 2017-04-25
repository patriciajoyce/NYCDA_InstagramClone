const express = require('express');

const signUp = express();

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


signUp.post('/auth/signup', (request, response) => {
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

module.exports = signUp;
