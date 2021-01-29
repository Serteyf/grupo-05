CREATE DATABASE level_up;

CREATE TABLE users_category (
id INTEGER AUTO_INCREMENT,
name VARCHAR(50),
PRIMARY KEY (id)
); 

CREATE TABLE users (
id INTEGER AUTO_INCREMENT,
user VARCHAR(50),
name VARCHAR(50),
email VARCHAR(50),
address VARCHAR(50),
password VARCHAR(50),
category_id INTEGER,
avatar VARCHAR(50),
PRIMARY KEY (id),
FOREIGN KEY (category_id) REFERENCES users_category(id)
); 

CREATE TABLE products_category (
id INTEGER AUTO_INCREMENT,
name VARCHAR(50),
PRIMARY KEY (id)
); 

CREATE TABLE products (
id INTEGER AUTO_INCREMENT,
name VARCHAR(50),
description VARCHAR(50),
price INTEGER,
discount INTEGER,
featured INTEGER,
image VARCHAR(50),
category_id INTEGER,
PRIMARY KEY (id),
FOREIGN KEY (category_id) REFERENCES products_category(id)
); 

CREATE TABLE sales (
id INTEGER AUTO_INCREMENT,
date DATE,
payment_method VARCHAR(50),
quantity INTEGER,
total_amount INTEGER,
user_id INTEGER,
PRIMARY KEY (id),
FOREIGN KEY (user_id) REFERENCES users(id)
); 

CREATE TABLE products_sales (
id INTEGER AUTO_INCREMENT,
product_id INTEGER,
sale_id INTEGER,
PRIMARY KEY (id),
FOREIGN KEY (product_id) REFERENCES products(id),
FOREIGN KEY (sale_id) REFERENCES sales(id)
); 

