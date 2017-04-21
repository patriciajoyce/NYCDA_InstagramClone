const db = require('sqlite');
const DB_NAME = './database.sqlite';

const instaClone = {};


instaClone.createNewUser = (email, name, password) => {
	if (!email || !name || !password) {
		throw console.error('Invalid Input');
	}
  return db.run(`INSERT INTO users(username, email, password, age) VALUES`)
}
// instaClone.createNewAct = (user_id, req) => {
//     return db.run(`INSERT INTO activities (user_id, image_url, comment) values (${user_id}, $image_url, $comment)`, req)
// };
//

instaClone.getFollows = (currUser_id) => {
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
    return db.all(`SELECT
                    users.username AS Username,
                    activities.image_url AS Image,
                    activities.comment AS Comment,
                    activities.created AS Posted
                FROM users
                    INNER JOIN activities on user_id = id`)
};





module.exports = instaClone;
