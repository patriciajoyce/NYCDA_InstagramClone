const express = require('express');

const app = express();

const router = express.Router();

const instaClone = require('./instaClone')
const Auth = require('./authRoutes').passport

const db = require('sqlite');
const DB_NAME = './database.sqlite';


const parser = require('body-parser');
router.use(parser.json())

//get all users plus their feed eventually this will only show people who do not have a private feed
router.get('/users/feed', (req, res) => {
  instaClone.getAllUsers_n_Feeds()
    .then((data) => {
      console.log(data)
      res.header('Content-Type', 'application/json');
      res.send({
        users: data
      });
    })
    .catch((e) => {
      console.log(e)
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

//get all of your followers feed

router.get('/following'), Auth.authenticate('local',{failureRedirect:'/'}), (req, res) => {
  // const id = parseInt(req.params.user_id, 10);
  instaClone.getFollowers(id)
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
}

//get a particular post to comment on or to creep on the user

router.get('/activity/:feed_id'), (req, res) => {
  const post = parseInt(req.params.feed_id, 10);
  instaClone.getOnePost(post)
    .then((data) => {
      res.header('Content-Type', 'application/json');
      res.send({
        feed: data
      });
    })
    .catch((e) => {
      console.log(e)
      res.status(401);
    });
}





//get all of the users of the app no feed..this is for initial login after signup
router.get('/allUsers', (req, res) => {
  // console.log('IN USERS');
  instaClone.getUsersOnly(req, res)
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


//create a new post for currUser
router.post('/activity', Auth.authenticate('local',{failureRedirect:'/'}),(req, res) => {
  // const user_id = parseInt(req.params.user_id, 10);
  console.log('IN POST/1',user_id);
  instaClone.createNewPost(user_id, req.body)
    .then((data) => {
      console.log('this is the data in creatPost func:', data)
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

//edit a particular post
// router.put('/:user_id/update_post/:feed_id', (req, res) => {
//   const user_id = parseInt(req.params.user_id, 10);
//   const feed_id = parseInt(req.params.feed_id, 10);
//   const newTale = req.body.comments
//   console.log("____HERE", req.body.comments)
//   instaClone.editPost(newTale, feed_id, user_id)
//     .then((data) => {
//       console.log(data);
//       res.header('Content-Type', 'application/json');
//       res.send({
//         update_post: data,
//         soMuchActivities: data.length
//       });
//     })
//     .catch((e) => {
//       console.log(e)
//       res.status(401);
//     })
// })

router.put('/update_post/:feed_id',Auth.authenticate('local',{failureRedirect:'/'}),(req, res) => {
  // const user_id = parseInt(req.params.user_id, 10);
  const feed_id = parseInt(req.params.feed_id, 10);
    const comments = req.body.comments
    console.log('HERE',user_id, feed_id, comments)
    instaClone.editPost(user_id, feed_id, comments)
        .then((data) => {
          console.log(data);
            res.header('Content-Type', 'application/json');
            res.send({
                update: data,
                soMuchActivities: data.length
            });
        })
        .catch((e) => {
            console.log(e)
            res.status(401);
        });
});

// Delete a particular post
router.delete('/delete_post/:feed_id', Auth.authenticate('local',{failureRedirect:'/'}),(req, res) => {
    // const user_id = parseInt(req.params.user_id, 10);
    const feed_id = parseInt(req.params.feed_id, 10);
    instaClone.deletePost(user_id, feed_id)
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({
                followedUsers: data,
                soMuchActivities: data.length
            });
        })
        .catch((e) => {
            console.log(e)
            res.status(401);
        });
});




// Follow a user..how currUser will follow a particular user get their feed
router.post('/follows/:followed_id',Auth.authenticate('local',{failureRedirect:'/'}), (req, res) => {
  // const user_id = parseInt(req.params.user_id, 10);
  const followed_id = parseInt(req.params.followed_id, 10);
  instaClone.follow_A_User(user_id, followed_id, req.body)
    .then((data) => {
      console.log(data);
      res.header('Content-Type', 'application/json');
      res.send({
        followedUsers: data,
        soMuchActivities: data.length
      });
    })
    .catch((e) => {
      console.log(e)
      res.status(401);
    });
});

//Unfollow a certain user
router.delete('/unfollows/:followed_id', Auth.authenticate('local',{failureRedirect:'/'}),(req,res) => {
  // const user_id = parseInt(req.params.user_id, 10);
  const followed_id = parseInt(req.params.followed_id, 10);
  instaClone.unFollow_A_User(user_id, followed_id, req.body)
    .then((data) => {
      console.log(data);
      res.header('Content-Type', 'application/json');
      res.send({
        followedUsers: data,
        soMuchActivities: data.length
      });
    })
    .catch((e) => {
      console.log(e)
      res.status(401);
    });
  });



module.exports = router;
