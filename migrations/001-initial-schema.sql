--UP
CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
);
CREATE table followers(
    user_id INTEGER,
    followed_id INTEGER
);
CREATE table activities(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    descr CHAR(140)
);










-- DOWN
DROP TABLE users;
DROP TABLE followers;
DROP TABLE activities;
