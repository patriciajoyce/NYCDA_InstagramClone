const express = require('express');

const app = express();

const router = express.Router();

const instaClone = require('./instaClone')

const db = require('sqlite');
const DB_NAME = './database.sqlite';


const parser = require('body-parser');
router.use(parser.json())


//get all of the users on the app
router.get('/users', (req, res) => {
	instaClone.getAllUsers(req, res)
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({ users: data });
        })
        .catch((e) => {
            res.status(401);
        });
});

//get the feed of a specific user by their id
router.get('/user/:user_id', (req, res) => {
    const id = parseInt(req.params.user_id, 10);
	  instaClone.getUser(id)
				.then((data) => {
						res.header('Content-Type', 'application/json');
            res.send({
                user: data,
                soMuchActivities: data.length
            });
        })
        .catch((e) => {
            console.log(e)
            res.status(401);
        });
});













module.exports = router;
