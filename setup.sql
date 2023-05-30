CREATE DATABASE chat_appy;
USE chat_appy;

CREATE TABLE chat_rooms(
    id int(100) NOT NULL AUTO_INCREMENT,
    roomName varchar(100) DEFAULT 'chat room',
    PRIMARY KEY (id)
);

INSERT INTO chat_rooms (roomName) VALUES ('Room 1'), ('Room 2'), ('Room 3');

CREATE TABLE users(
    id int(200) NOT NULL AUTO_INCREMENT,
    userName varchar(100),
    roomId int(100),
    PRIMARY KEY (id),
    FOREIGN KEY (roomId) REFERENCES chat_rooms(id)
);

CREATE TABLE messages(
    id int(200) NOT NULL AUTO_INCREMENT,
    messageText varchar(255),
    userId int(200),
    roomId int(100),
    ts DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (roomId) REFERENCES chat_rooms(id)
);