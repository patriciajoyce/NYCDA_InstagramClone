--UP
CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    profile_pic TEXT
);
CREATE TABLE follows(
    user_id INTEGER NOT NULL,
    followed_id INTEGER
);
CREATE TABLE posts(
    feed_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    comments CHAR(180),
    created DATETIME TEXT DEFAULT CURRENT_TIMESTAMP
);

-- INSERT into users (username, email, password, profile_pic) VALUES ('Oz', 'ozz@email.com', 'password', 'https://upload.wikimedia.org/wikipedia/en/1/17/Batman-BenAffleck.jpg');
-- INSERT into users (username, email, password, profile_pic) VALUES ('Dani', 'dani@email.com', 'passsssword2', 'https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Wonder_Woman.jpg/250px-Wonder_Woman.jpg');
-- INSERT into users (username, email, password, profile_pic) VALUES ('Ju', 'dani@email.com', 'passsssword2', 'http://www.scifiwright.com/wp-content/uploads/2015/07/bruce-timm-batgirl.jpg');
--
-- INSERT into follows (user_id, followed_id) VALUES (1,2);
-- INSERT into follows (user_id, followed_id) VALUES (2,1);
--
--
-- INSERT into posts (user_id, image_url, comments) VALUES (1, 'http://thecookful.com/wp-content/uploads/2016/01/beer-pairings-feature-680-337x262.jpg', 'Wings are the bestest');
-- INSERT into posts (user_id, image_url, comments) VALUES (1, 'http://thecookful.com/wp-content/uploads/2016/01/beer-pairings-feature-680-337x262.jpg', 'So many wings');
-- INSERT into posts (user_id, image_url, comments) VALUES (1, 'http://thecookful.com/wp-content/uploads/2016/01/beer-pairings-feature-680-337x262.jpg', 'Breakfast');
-- INSERT into posts (user_id, image_url, comments) VALUES (1, 'http://thecookful.com/wp-content/uploads/2016/01/beer-pairings-feature-680-337x262.jpg', 'Second breakfast');
--
-- INSERT into posts (user_id, image_url, comments) VALUES (2, 'https://www.budgetbytes.com/wp-content/uploads/2016/04/Skillet-Cheeseburger-Pasta-H-280x280.jpg', 'mmmm ... pasta');
-- INSERT into posts (user_id, image_url, comments) VALUES (2, 'https://www.budgetbytes.com/wp-content/uploads/2016/04/Skillet-Cheeseburger-Pasta-H-280x280.jpg', 'Leftovers!');
-- INSERT into posts (user_id, image_url, comments) VALUES (2, 'https://www.budgetbytes.com/wp-content/uploads/2016/04/Skillet-Cheeseburger-Pasta-H-280x280.jpg', 'So simple and good');
-- INSERT into posts (user_id, image_url, comments) VALUES (2, 'https://www.budgetbytes.com/wp-content/uploads/2016/04/Skillet-Cheeseburger-Pasta-H-280x280.jpg', 'Ok, getting kind of sick of pasta');

-- DOWN
DROP TABLE users;
DROP TABLE follows;
DROP TABLE posts;

-- SELECT followed_id as follows
--         activities.image_url as image
--     from follows
--     inner join activities on activities.user_id = id
--     inner join users
--     on follows.user_id = id
--     where users.id = 1



-- SELECT followed_id
--     from follows inner join users
--     on follows.user_id = users.id
--     where users.id = 1
