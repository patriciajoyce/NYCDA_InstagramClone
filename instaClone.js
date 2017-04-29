const db = require('sqlite');
const DB_NAME = './database.sqlite';


const instaClone = {};

//get all users plus their feed eventually this will only show people who do not have a private feed

instaClone.getAllUsers_n_Feeds = () => {
  return db.run(`SELECT users.id AS id,
    users.username AS Username,
    posts.feed_id AS Series_ID,
    posts.image_url AS Image,
    posts.comments AS Chronicle,
    posts.created AS Posted
    FROM users
    INNER JOIN posts ON posts.user_id = users.id
    GROUP BY feed_id
    ORDER BY id ASC`)
  }

//_______________________________________

//get the feed of a specific user by their id

instaClone.getUser = (user_id) => {
  return db.all(`SELECT
    users.username AS Username,
    posts.feed_id AS Series,
    posts.image_url AS Image,
    posts.comments AS Chronicle,
    posts.created AS Posted
    FROM users
    INNER JOIN posts ON posts.user_id = users.id
    WHERE id = ${user_id}
    ORDER BY posts.created DESC`)
  }

  //_______________________________________

//get all of your followers feed

instaClone.getFollowers = (currUser_id) => {
 return db.all (`SELECT
  users.username AS Username,
  posts.image_url AS Image,
  posts.comments AS Chronicle,
  posts.created As Posted
  FROM users
  INNER JOIN follows ON follows.followed_id = id
  INNER JOIN posts ON posts.user_id = users.id
  WHERE follows.user_id = ${currUser_id}
  ORDER BY posts.created DESC`)
}

//_______________________________________

//get a particular post to comment on or to creep on the user

instaClone.getOnePost = (feed_id) => {
    return db.all(`SELECT
                    users.username AS Username,
                    posts.image_url AS Image,
                    posts.comments AS Chronicle,
                    posts.created
                FROM posts
                    INNER JOIN users ON posts.user_id = users.id
                WHERE posts.feed_id = ${feed_id}`)
};


//_______________________________________

//


// Follow a user..how currUser will follow a particular user
instaClone.follow_A_User = (user_id,req) => {
    return db.run(`INSERT INTO follows (user_id, followed_id) VALUES (?,?)`, [user_id,req.followed_id])
};
//_______________________________________

//once signed up and logged in have your choice on who to follow
instaClone.getUsersOnly = () => {
    return db.all(`SELECT * FROM users`)
};
//_______________________________________

//creates a new user to the app
instaClone.createNewUser = (request) => {
  const {username, email, password} = request;
  return db.run(`INSERT INTO users(username, email, password) VALUES (?,?,?)`, [username, email, password])
};
//_______________________________________

//creates a new post for currUser

instaClone.createNewPost = (user_id,req) => {
  return db.run(`INSERT INTO posts(user_id, image_url, comments) VALUES (?,?,?)`, [user_id, req.image_url,req.comments])
};
//_______________________________________

//edit a particular post

instaClone.editPost = (user_id, feed_id, comments) => {
  console.log('IN INSTACLONE',typeof user_id,typeof feed_id);
    return db.run(`UPDATE posts SET comments = '${comments}' WHERE feed_id = ${feed_id} and user_id = ${user_id}`)
};

// instaClone.editPost = (newTale,feed_id,user_id) => {
//   return db.run(`UPDATE posts SET comments = "${newTale}" WHERE feed_id = ${feed_id} and user_id = ${user_id}`)
//   return db.run(`UPDATE posts SET comments = "${newTale}" WHERE feed_id = ${feed_id} and user_id = ${user_id}`)
// }

// Delete a particular post
instaClone.deletePost = (user_id, feed_id) => {
    return db.run(`DELETE FROM posts WHERE feed_id = ${feed_id} and user_id = ${user_id}`)
};

//Unfollow a certain user
instaClone.unFollow_A_User = (user_id,followed_id) => {
  return db.run(`DELETE FROM follows WHERE user_id = ${user_id} AND followed_id = ${followed_id}`)
};

module.exports = instaClone;
