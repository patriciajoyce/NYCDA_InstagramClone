const db = require('sqlite');
const express = require('express')
let app = express();
const DB_NAME = './database.sqlite';
const port = 3000;
const instaClone = {};

const socket = require('./sqliteui/websocket');
const SocketInst = socket(DB_NAME, app);
app = SocketInst.app;


app.use('/', express.static('./sqliteui/public',{'index': ['index.html']}));

Promise.resolve()
    .then(() => db.open(DB_NAME, { Promise }))
    .then(() => db.migrate({ force: 'last' }))
    .then(() => app.listen(port))
    .then(() => {console.log(`Server started on port ${port}`)})
    .catch(err => console.error(err.stack))

// console.log('______HERE in instaClone',typeof(instaClone.createNewPost));

//get your followers activity
instaClone.getFollowers = (currUser_id) => {
 return db.all (`SELECT
  users.username AS Username,
  activities.image_url AS Image,
  activities.comments AS Comments,
  activities.created As Posted
  FROM users
  INNER JOIN follows ON follows.followed_id = id
  INNER JOIN activities ON activities.user_id = id
  WHERE follows.user_id = ${currUser_id}
  ORDER BY activities.created DESC`)
}

//Get a specific user by id
instaClone.getUser = (user_id) => {
     return db.all(`SELECT
                    users.username AS Username,
                    activities.image_url AS Image,
                    activities.comments AS Comments,
                    activities.created AS Posted
                FROM users
                    INNER JOIN activities ON activities.user_id = id
                WHERE id = ${user_id}
                ORDER BY activities.created DESC`)
}

//once signed up and logged in have your choice on who to follow
instaClone.getAllUsers = () => {
    return db.all(`SELECT * FROM users`)
};

//creates a new user to the app
instaClone.createNewUser = (request) => {
  const {username, email, password} = request;
  return db.run(`INSERT INTO users(username, email, password) VALUES (?,?,?)`, [username,email,password]).then(()=>{
    SocketInst.broadcast('LOAD_BUFFER')
  })
};

instaClone.createNewPost = (user_id,request) => {
  return db.run(`INSERT INTO activities (user_id, image_url, comments) values (${user_id}, ${image_url}, ${comments})` )
};

module.exports = instaClone;
