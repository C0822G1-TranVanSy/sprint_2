CREATE DATABASE `sprint2`;
USE `sprint2`;

CREATE TABLE `sprint2`.`account` (
  `id_account` INT auto_increment NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `encrypt_password` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) ,
  `phone` VARCHAR(45) NOT NULL,
  `usename` VARCHAR(45) NOT NULL,
  `flag_delete` BIT ,
  `avatar` VARCHAR(255),
  PRIMARY KEY (`id_account`));
  
  CREATE TABLE `sprint2`.`role` (
  `id_role` INT auto_increment NOT NULL,
  `name_role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_role`));
  
CREATE TABLE  `sprint2`.`account_role` (
  `id_role` INT,
  `id_account` INT,
  FOREIGN KEY(id_role) REFERENCES `role`(id_role),
  FOREIGN KEY(id_account) REFERENCES `account`(id_account),
  PRIMARY KEY (`id_role`, `id_account`));
  
CREATE TABLE `category` (
  `id_category` INT auto_increment NOT NULL,
  `name_category` VARCHAR(45),
  PRIMARY KEY (`id_category`));  
  
  CREATE TABLE `product` (
  `id_product` INT auto_increment NOT NULL,
  `name_product` VARCHAR(45),
  `description` VARCHAR(45),
  `flag_delete` BIT,
  `price` DOUBLE,
  `avatar` VARCHAR(45) ,
  `id_category` INT,
	foreign key(id_category) references `category`(id_category),
  PRIMARY KEY (`id_product`));  
  
    CREATE TABLE `warehouse` (
  `id_warehouse` INT auto_increment NOT NULL,
  `quantity` INT,
  `id_product` INT,
  	foreign key(id_product) references `product`(id_product),
  PRIMARY KEY (`id_warehouse`));  
  
  CREATE TABLE `order` (
  `id_order` INT auto_increment primary key,
  `id_account` INT,
  `flag_delete` BIT,
  `order_date` date,
  foreign key(id_account) references `account`(id_account)
);  

CREATE TABLE `purchase_history` (
  `id_product` INT,
  `id_order` INT,
  `quantity` INT,
  foreign key(id_product) references `product`(id_product),
  foreign key(id_order) references `order`(id_order),
	primary key(id_product,id_order)
);

CREATE TABLE `payment` (
  `id_pay` INT auto_increment primary key,
  `id_order` INT,
  `payment_method` VARCHAR(45),
  foreign key(id_order) references `order`(id_order)
);






