CREATE DATABASE rushed_db;

USE rushed_db;

CREATE TABLE users
(
	email varchar(320) NOT NULL,
	password varchar(255),
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (email)
);

CREATE TABLE favs
(
	fav_id int NOT NULL AUTO_INCREMENT,
	fav_name varchar(255) NOT NULL,
	fav_url varchar(320) NOT NULL DEFAULT 'https://www.google.com',
	fav_type varchar(255) NOT NULL,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (fav_id)
);

CREATE TABLE user_favs
(
	email int NOT NULL,
	fav_id int NOT NULL,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
);