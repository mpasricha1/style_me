USE style_me_db; 

CREATE TABLE User (
  id INT AUTO_INCREMENT NOT NULL,
  full_name VARCHAR(50)NOT NULL,
  first_name VARCHAR(25) NOT NULL,
  last_name VARCHAR(25) NOT NULL,
  email VARCHAR(50) NOT NULL,
  pass VARCHAR(255) NOT NULL,
  google_id VARCHAR(50), 
  age INT,
  gender VARCHAR(15), 
  PRIMARY KEY(id)
);

CREATE TABLE Catalog (
  id INT AUTO_INCREMENT NOT NULL,
  catalog_name VARCHAR(50) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE Category (
  id INT AUTO_INCREMENT NOT NULL,
  category_name VARCHAR(50), 
  PRIMARY KEY(id) 
);

CREATE TABLE Outfit (
  id INT AUTO_INCREMENT NOT NULL,
  outfit_name VARCHAR(50),
  PRIMARY KEY(id) 
);

CREATE TABLE Item (
  id INT AUTO_INCREMENT NOT NULL,
  user_id INT NOT NULL,
  category_id INT NOT NULL,
  item_name VARCHAR(50) NOT NULL,
  product_link VARCHAR(255), 
  image_link VARCHAR(255), 
  image_thumbnail VARCHAR(255),
  PRIMARY KEY(id), 
  FOREIGN KEY(user_id) REFERENCES User(id),
  FOREIGN KEY(catalog_id) REFERENCES Catalog(id),
  FOREIGN KEY(category_id) REFERENCES Category(id)
);

CREATE TABLE outfit_item(
  id INT AUTO_INCREMENT NOT NULL,
  item_id INT NOT NULL, 
  outfit_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(outfit_id) REFERENCES Outfit(id),
  FOREIGN KEY(item_id) REFERENCES Item(id)
);

CREATE TABLE catalog_item(
  id INT AUTO_INCREMENT NOT NULL,
  outfit_id INT NOT NULL, 
  catalog_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(catalog_id) REFERENCES Catalog(id),
  FOREIGN KEY(outfit_id)) REFERENCES Outfit(id)
);

CREATE TABLE outfit_staging(
  id INT AUTO_INCREMENT NOT NULL, 
  item_id INT NOT NULL, 
  img VARCHAR(255), 
  name VARCHAR(50)
)