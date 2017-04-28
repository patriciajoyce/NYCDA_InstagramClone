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
  // console.log('IN USERS');
  instaClone.getAllUsers(req, res)
    .then((data) => {
      res.header('Content-Type', 'application/json');
      res.send({
        users: data
      });
    })
    .catch((e) => {
      res.status(401);
    });
});

//get the feed of a specific user by their id
router.get('/user/:user_id', (req, res) => {
  const id = parseInt(req.params.user_id, 10);
  // console.log('IN USER/1');
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

// console.log('HERE_______')

router.post('/:user_id/feed', (req, res) => {
  const user_id = parseInt(req.params.user_id, 10);
  console.log('IN POST/1');
  instaClone.createNewPost(user_id,req.body)
    .then((data) => {
      res.header('Content-Type', 'application/json');
      res.send({
        post: data
      });
    })
    .catch((e) => {
      console.log(e)
      res.status(401);
    })
});
// router.post('/:user_id/feed', (req, res) => {
//     let args = {};
//     for (const prop in req.body) {
//         args['$' + prop] = req.body[prop];
//     }
//     req.body = args;
//     const user_id = parseInt(req.params.user_id, 10);
//     instaClone.createNewPost(user_id, req.body)
//         .then((data) => {
//             res.header('Content-Type', 'application/json');
//             res.send({
//                 post: data
//             });
//         })
//         .catch((e) => {
//             console.log(e)
//             res.status(401);
//         });
// });







module.exports = router;
