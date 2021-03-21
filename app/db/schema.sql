DROP DATABASE IF EXISTS style_me_db; 

CREATE DATABASE style_me_db; 

USE style_me_db; 

CREATE TABLE User (
  id INT AUTO_INCREMENT NOT NULL,
  full_name VARCHAR(50)NOT NULL,
  first_name VARCHAR(25) NOT NULL,
  last_name VARCHAR(25) NOT NULL,
  email VARCHAR(50) NOT NULL,
  pass VARCHAR(255) NOT NULL,
  age INT,
  gender VARCHAR(15), 
  PRIMARY KEY(id)
);

CREATE TABLE Catalog (
  id INT AUTO_INCREMENT NOT NULL,
  catalog_name VARCHAR(255) NOT NULL, 
  PRIMARY KEY(id)
);

CREATE TABLE Item_categories (
  id INT AUTO_INCREMENT NOT NULL,
  category_name VARCHAR(255), 
  PRIMARY KEY(id) 
);

CREATE TABLE Outfit (
  id INT AUTO_INCREMENT NOT NULL,
  outfit_name VARCHAR(255),
  PRIMARY KEY(id) 
);

CREATE TABLE Item (
  id INT AUTO_INCREMENT NOT NULL,
  user_id INT NOT NULL,
  catalog_id INT NOT NULL,
  category_id INT NOT NULL,
  item_name VARCHAR(50) NOT NULL,
  product_link VARCHAR(255), 
  PRIMARY KEY(id), 
  FOREIGN KEY(user_id) REFERENCES User(id),
  FOREIGN KEY(catalog_id) REFERENCES Catalog(id),
  FOREIGN KEY(category_id) REFERENCES Item_categories(id)
);

CREATE TABLE Tags (
  id INT AUTO_INCREMENT NOT NULL, 
  item_id INT NOT NULL, 
  tag VARCHAR(20) NOT NULL, 
  PRIMARY KEY(id), 
  FOREIGN KEY(item_id) REFERENCES Item(id)
);

CREATE TABLE outfit_item(
  id INT AUTO_INCREMENT NOT NULL,
  outfit_id INT NOT NULL,
  item_id INT NOT NULL, 
  PRIMARY KEY(id),
  FOREIGN KEY(outfit_id) REFERENCES Outfit(id),
  FOREIGN KEY(item_id) REFERENCES Item(id)
);
