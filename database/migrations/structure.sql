DROP DATABASE IF EXISTS level_up;
CREATE DATABASE level_up;
USE level_up;

DROP TABLE IF EXISTS users_category;
CREATE TABLE users_category (
id INTEGER AUTO_INCREMENT,
name VARCHAR(50),
PRIMARY KEY (id)
); 

DROP TABLE IF EXISTS users;
CREATE TABLE users (
id INTEGER AUTO_INCREMENT,
user VARCHAR(50),
name VARCHAR(50),
email VARCHAR(50),
address VARCHAR(50),
password VARCHAR(60),
categoryId INTEGER,
avatar VARCHAR(50),
PRIMARY KEY (id),
FOREIGN KEY (categoryId) REFERENCES users_category(id)
); 

DROP TABLE IF EXISTS products_category;
CREATE TABLE products_category (
id INTEGER AUTO_INCREMENT,
name VARCHAR(50),
PRIMARY KEY (id)
); 

DROP TABLE IF EXISTS products;
CREATE TABLE products (
id INTEGER AUTO_INCREMENT,
name VARCHAR(50),
description VARCHAR(300),
price INTEGER,
discount INTEGER,
featured INTEGER,
image VARCHAR(50),
categoryId INTEGER,
PRIMARY KEY (id),
FOREIGN KEY (categoryId) REFERENCES products_category(id)
); 

DROP TABLE IF EXISTS sales;
CREATE TABLE sales (
id INTEGER AUTO_INCREMENT,
date DATE,
paymentMethod VARCHAR(50),
userId INTEGER,
PRIMARY KEY (id),
FOREIGN KEY (userId) REFERENCES users(id)
); 

DROP TABLE IF EXISTS products_sales;
CREATE TABLE products_sales (
id INTEGER AUTO_INCREMENT,
productId INTEGER,
saleId INTEGER,
quantity INTEGER,
amount INTEGER,
PRIMARY KEY (id),
FOREIGN KEY (productId) REFERENCES products(id),
FOREIGN KEY (saleId) REFERENCES sales(id)
); 

