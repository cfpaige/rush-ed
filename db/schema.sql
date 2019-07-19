CREATE DATABASE rushed_db;

USE rushed_db;

CREATE TABLE users
(
	user_id int NOT NULL,
	full_name varchar(255) NOT NULL,
	email varchar(320) NOT NULL,
	profile_img varchar(320),
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (user_id)
);

CREATE TABLE favs
(
	fav_id int NOT NULL,
	fav_name varchar(255) NOT NULL,
	fav_url varchar(320) NOT NULL,
	fav_type varchar(255) NOT NULL,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (fav_id)
);

CREATE TABLE user_favs
(
	user_id int NOT NULL,
	fav_id int NOT NULL,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
);