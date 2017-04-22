const express = require('express');

let app = express();

const router = express.Router();

const instaClone = require('./instaClone')

const db = require('sqlite');
const DB_NAME = './database.sqlite';


const parser = require('body-parser');
router.use(parser.json())

router.get('/users', (req, res, next) => {
	instaClone.getAllUsers(req, res)
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({ users: data });
        })
        .catch((e) => {
            res.status(401);
        });
});
















module.exports = router;
