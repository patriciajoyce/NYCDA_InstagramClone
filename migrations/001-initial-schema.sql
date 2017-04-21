--UP
CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR(15) NOT NULL,
    age INTEGER CHECK (age >= 18)
);
CREATE TABLE follows(
    user_id INTEGER NOT NULL,
    followed_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
CREATE TABLE activities(
    feed_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    comment VARCHAR(180),
    created DATETIME TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
);


INSERT into users (username, email, password, age) VALUES ('Oz', 'p@email.com', 'ppassword',32);
INSERT into users (username, email, password, age) VALUES ('Dani', 'h@email.com', 'epassword',32);
INSERT into users (username, email, password, age) VALUES ('Mar', 'o@email.com', 'opassword',32);
INSERT into users (username, email, password, age) VALUES ('Kat','sb@email.come', 'bpassword',32);


INSERT into follows (user_id, followed_id) VALUES (1,2);
INSERT into follows (user_id, followed_id) VALUES (2,3);
INSERT into follows (user_id, followed_id) VALUES (3,4);
INSERT into follows (user_id, followed_id) VALUES (4,2);

INSERT into activities (user_id, image_url, comment) VALUES (1, 'https://static.pexels.com/photos/101569/pexels-photo-101569.jpeg', 'My new backyard');
INSERT into activities (user_id, image_url, comment) VALUES (1, 'https://static.pexels.com/photos/197756/pexels-photo-197756.jpeg', 'My new frontyard');
INSERT into activities (user_id, image_url, comment) VALUES (2, 'https://static.pexels.com/photos/101569/pexels-photo-101569.jpeg', 'My new backyard');
INSERT into activities (user_id, image_url, comment) VALUES (3, 'https://static.pexels.com/photos/197756/pexels-photo-197756.jpeg', 'My new frontyard');
INSERT into activities (user_id, image_url, comment) VALUES (4, 'https://static.pexels.com/photos/197756/pexels-photo-197756.jpeg', 'My new frontyard');
INSERT into activities (user_id, image_url, comment) VALUES (4, 'https://static.pexels.com/photos/197756/pexels-photo-197756.jpeg', 'My new frontyard');




-- DOWN
DROP TABLE users;
DROP TABLE follows;
DROP TABLE activities;



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
