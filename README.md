
## Bamazon app
An Amazon-like storefront with the MySQL mock storefront. The app take in orders from customers and deplete stock from the store's inventory.

## About the app
A CLI node.js app for Customers to view items and place orders, for Managers to perform inventory control and add new products, and for Supervisors to track department profitability and add new departments. 
 
## Video


## Tech/framework used
<b>Built with</b>
- [Node.js](https://nodejs.org/en/)
- Javascript
- [MySQL](https://www.mysql.com/)
- [inquirer](https://www.npmjs.com/package/inquirer)


## Features
_Inquirer_.js strives to be an easily embeddable and beautiful command line interface for _Node_.js
- Customers may purchase products from the available products in the MySQL database. 
- Managers can reorder  inventory and new products to the databse. 
- Supervisors have the ability to view profit data by department and add new departments. 
- Console table organizes product, inventory, and department data in a concise manner within the CLI. 
- User input validation is present to ensure that customers cannot purchase more inventory than Bamazon has in stock, managers don't add products with no inventory, and supervisors cannot add departments that already exist.

## Installation
- Install [Node js](https://nodejs.org/en/)
- Clone the Bamazon repository to your machine
- Open CLI, navigate to the cloned repository, and run the following to install the npm package dependencies 

		npm install

- Open MySQL Workbench, SQL Pro, or your preferred database management app. Open the "bamazon.sql" script from the cloned repo, and run it to set up the database and base product/department data.
- Next, within the cloned repo, you'll need to create a pw.js file with the following code, and add your password to access your root server to that file. This file is a dependency for the app. If you do not require a password to access your root, simply leave the pw property as an empty string.


```javascript
var pwd = {
	pw: "YOUR PASSWORD HERE"
}
	
module.exports = pwd;

> Written with [StackEdit](https://stackedit.io/).
