--UP
CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);
CREATE TABLE follows(
    user_id INTEGER NOT NULL,
    followed_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
CREATE TABLE posts(
    feed_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    comments CHAR(180),
    created DATETIME TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

INSERT into users (username, email, password) VALUES ('Oz', 'ozz@email.com', 'passsssword');
INSERT into users (username, email, password) VALUES ('Dani', 'dani@email.com', 'passsssword2');

INSERT into follows (user_id, followed_id) VALUES (1,2);
INSERT into follows (user_id, followed_id) VALUES (2,1);

INSERT into posts (user_id, image_url, comments) VALUES (1, 'https://photos.photos.com/photos/101569/pexels-image-101569.jpeg', 'Hard ass code');
INSERT into posts (user_id, image_url, comments) VALUES (2, 'https://photos.photos.com/photos/299345/pexels-image-299345.jpeg', 'sleep for the weak');

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
