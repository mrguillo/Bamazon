
## Bamazon app
An Amazon-like storefront with the MySQL mock storefront. The app take in orders from customers and deplete stock from the store's inventory.

## About the app
A CLI node.js app for Customers to view items and place orders, for Managers to perform inventory control and add new products, and for Supervisors to track department profitability and add new departments. 
 
## Video
bamazon Customer demo [clic here](https://drive.google.com/file/d/1or1ctjXC247Dw4gK38XNNR3_FqXo_V-3/view)
bamazon Manager demo [clic here](https://drive.google.com/file/d/1hta45282NRxHywDhcUzwxGNGXjdylMMk/view)	
bamazon Supervisor [clic here](https://drive.google.com/file/d/1hta45282NRxHywDhcUzwxGNGXjdylMMk/view)


## Tech/framework used
<b>Built with</b>
- [Node.js](https://nodejs.org/en/)
- Javascript
- [MySQL](https://www.mysql.com/)
- [inquirer](https://www.npmjs.com/package/inquirer)
- dotenv


## Main Features
_Inquirer_.js strives to be an easily embeddable and beautiful command line interface for _Node_.js
- bamazon Customers - Users can purchase products from an available products table in the MySQL database. 
- bamazon Managers - Users can reorder inventory and create new products to the databse. 
-  bamazon Supervisors - Users can view profit data by department and add new departments. 


## Setup
- Install [Node js](https://nodejs.org/en/)
- Clone the Bamazon repository to your machine
- Open CLI, navigate to the cloned repository, and run the following to install the npm package dependencies 

		npm install

- Open MySQL Workbench, SQL Pro, or your preferred database management app. Open the "bamazon.sql" script from the cloned repo, and run it to set up the database and base product/department data.
- Next, within the cloned repo, you'll need to create a pw.js file with the following code, and add your password to access your root server to that file. This file is a dependency for the app. If you do not require a password to access your root, simply leave the pw property as an empty string.


> Written with [StackEdit](https://stackedit.io/).
