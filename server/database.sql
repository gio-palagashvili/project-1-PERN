CREATE DATABASE first_db;

CREATE TABLE users_tbl (
    user_id serial PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE table packages_tbl (
    user_id int,
    code VARCHAR (255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    price int NOT NULL,
    name VARCHAR (255) NOT NULL,
    weight VARCHAR (255) NOT NULL,
    CONSTRAINT fk_users_tbl FOREIGN key (user_id) REFERENCES users_tbl (user_id) ON
    DELETE CASCADE,
    package_id serial PRIMARY KEY,
    CONSTRAINT fk_created FOREIGN KEY (createdBy) REFERENCES users_tbl(user_id) ON DELETE CASCADE,
);