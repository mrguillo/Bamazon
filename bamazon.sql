-- drop db if exists, create db --
DROP DATABASE IF EXISTS bamazon_db;
create database bamazon_db;

-- use bamazon db --
use bamazon_db;

-- create products table --
CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100) NULL,
	department_name VARCHAR(100) NULL,
	price DECIMAL(10,2) NULL,
	stock_quantity INT NULL,
    product_sales DECIMAL(10,2) DEFAULT 0,
	PRIMARY KEY (item_id)
);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Salcedo1@1';

-- default products vals -- 
-- populating base product sales data assuming past sales have occurred so that profitability won't be all deeply negative -- 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Workingman's Dead by Grateful Dead - Vinyl", "Music", 19.99, 40), 
		("The Departed", "Movies", 19.99, 35), 
		("Lenovo Yoga 720 Laptop", "Electronics", 949.99, 4), 
        ("Super Slinky XL", "Toys", 9.99, 100), 
		("Pillows", "Household essentials", 14.99, 75), 
        ("North Face Jacket", "Clothes", 89.99, 50), 
       ("Set of Allen Wrenches", "Hardware", 29.99, 300), 
       ("Hockey Net", "Sports Equipment", 49.99, 3), 
       ("Xbox One", "Electronics", 299.99, 25), 
       ("Stop Making Sense by Talking Heads - Vinyl", "Music", 19.99, 17);
       
-- view tables --
SELECT * FROM products;
