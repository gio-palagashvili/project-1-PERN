CREATE DATABASE first_db;
CREATE TABLE todo
(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE users_tbl
(
    user_id serial PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE table packages_tbl
(
    package_id serial
        PRIMARY KEY,
    user_id int,
    code VARCHAR
(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    name VARCHAR
    (255) NOT NULL,
    weight VARCHAR
    (255) NOT NULL,
    CONSTRAINT fk_users_tbl FOREign key
    (user_id) REFERENCES users_tbl
    (user_id) ON
    DELETE CASCADE
);