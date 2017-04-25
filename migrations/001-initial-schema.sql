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
CREATE TABLE activities(
    feed_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    comment CHAR(180),
    created DATETIME TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
);



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
