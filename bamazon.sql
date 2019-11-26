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

-- create departments table --
CREATE TABLE departments (
	department_id INT AUTO_INCREMENT NOT NULL,
	department_name VARCHAR(100) NULL,
	over_head_costs DECIMAL(10,2) NULL,
	PRIMARY KEY (department_id)
);

-- default table vals --
INSERT INTO departments (department_name, over_head_costs)
VALUES 	("Music", 2000), 
		("Movies", 2000), 
		("Electronics", 10000), 
		("Toys", 2000), 
		("Household essentials", 1000), 
		("Apparel", 1000), 
		("Hardware", 500),
		("Sports Equipment", 1300);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Salcedo1@1';

-- default products vals -- 
-- populating base product sales data assuming past sales have occurred so that profitability won't be all deeply negative -- 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 	("thank u, next by Ariana Grande - Album", "Music", 19.99, 40), 
		("Leading Digital: Turning Technology into Business", "Books", 29.99, 35), 
		("Apple MacBook Air (13-inch)", "Electronics", 949.99, 4), 
        ("Hasbro Connect 4 Game", "Toys", 9.99, 100), 
		("Bounty Quick-Size Paper Towels", "Household essentials", 14.99, 75), 
        ("North Face Jacket", "Apparel", 89.99, 50), 
		("TEKTON Hex Key Wrench Set, 30-Piece", "Hardware", 29.99, 300), 
		("Franklin Sports Blackhawk Portable Soccer Goal ", "Sports Equipment", 49.99, 3), 
		("Xbox One S Two Controller Bundle (1TB)", "Electronics", 269.99, 25), 
       ("Philips Sonicare C3 Premium Toothbrush Head", "Personal Care", 29.99, 17);
       
-- view tables --
SELECT * FROM products;
SELECT * FROM departments;
