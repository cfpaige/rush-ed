DROP DATABASE IF EXISTS rushed_db;
CREATE DATABASE rushed_db;

USE rushed_db;

CREATE TABLE User
(
    googleId INT NOT NULL,
	email VARCHAR (320) NOT NULL, 
	username VARCHAR (255) NOT NULL,
    profileImage VARCHAR (320),
    accessToken VARCHAR (320),
    refreshToken VARCHAR (320),
	PRIMARY KEY (googleId)
);