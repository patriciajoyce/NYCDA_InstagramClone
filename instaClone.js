const db = require('sqlite');
const DB_NAME = './database.sqlite';

const instaClone = {};


instaClone.createNewUser = (request) => {
  const {username, email, password} = request;
  return db.run(`INSERT INTO users(username, email, password) VALUES (?,?,?)`, [username,email,password])
};


// instaClone.





instaClone.getFollowers = (currUser_id) => {
 return db.all (`SELECT
  users.username AS Username,
  activities.image_url AS Image,
  activities.comment AS Comment,
  activities.created As Posted
  FROM users
  INNER JOIN follows ON follows.followed_id = id
  INNER JOIN activities ON activities.user_id = id
  WHERE follows.user_id = ${currUser_id}
  ORDER BY activities.created DESC`)
}


instaClone.getUser = (user_id) => {
     return db.all(`SELECT
                    users.username AS Username,
                    activities.image_url AS Image,
                    activities.comment AS Comment,
                    activities.created AS Posted
                FROM users
                    INNER JOIN activities ON activities.user_id = id
                WHERE id = ${user_id}
                ORDER BY activities.created DESC`)
}


instaClone.getAllUsers = () => {
    return db.all(`SELECT * FROM users`)
};


instaClone.loginUser = (username, password) => {
    return db.get(`SELECT id, username FROM users WHERE username = '${username}' AND password = '${password}'`)
}



module.exports = instaClone;
