// npm requirements
var inquirer = require("inquirer");
var mysql = require("mysql");
var myPassword = require("./pw.js");


// create mysql connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

// connect to db
connection.connect(function (error) {
    if (error) throw error;
    // welcome customer
    console.log("\n\n\n-----------------------------------------------------------------\n" +
        "Welcome to Bamazon! Shop Today’s Deals\n" +
        "-----------------------------------------------------------------\n");
    // start the app
    console.log("the content is: " + myPassword)
    welcome();
});


// initial screen / app opens
function welcome() {
    // ask customer what they'd like to do
    inquirer.prompt([{
        name: "action",
        type: "list",
        choices: ["View items for sale", "Exit the store"],
        message: "Please select an option."
    }]).then(function (action) {
        // if user wants to view items, run the view items function
        if (action.action === "View items for sale") {
            viewItems();

            // if user wants to leave, run exit function
        } else if (action.action === "Exit the store") {
            exit();
        }
    });
}

// function for building the items table for customers to view

function viewItems() {
	// save my sql query
	var query = "SELECT * FROM products";
	// query db display results
	connection.query(query, function(error, results) {
		// if error, tell us
		if (error) throw error;
		// call the console table function to build/display the items table
		console.table(results);
		// ask customer what they'd like to buy and how much qty
		inquirer.prompt([
			{
				name: "id",
				message: "Please enter the item_ID of the item that you would like to purchase.",
				// validates that the id is a number greater than 0 and less than/equal to 
				// the number of items
				validate: function(value) {
					if (value > 0 && isNaN(value) === false && value <= results.length) {
						return true;
					}
					return false;
				}
			},
			{
				name: "qty",
				message: "What quantity would you like to purchase?",
				// validate the quantity is a number larger than 0
				validate: function(value) {
					if (value > 0 && isNaN(value) === false) {
						return true;
					}
					return false;
				}
			}
		]).then(function(transaction) {
			// init itemQty, itemPrice, itemName vars
			var itemQty;
			var itemPrice;
			var itemName;
			var productSales;
			// set above vars equal to results where the user id matches db id
			for (var j = 0; j < results.length; j++) {
				if (parseInt(transaction.id) === results[j].item_id) {
					itemQty = results[j].stock_quantity;
					itemPrice = results[j].price;
					itemName = results[j].product_name;
					productSales = results[j].product_sales;
				}
			}
			// if user tries to buy more qty than db has available, tell them no, run the
			// welcome function again
			if (parseInt(transaction.qty) > itemQty) {
				console.log("\nInsufficient inventory for your requested quantity. We have " 
					+ itemQty + " in stock. Try again.\n");
				welcome();
			} 
			// if user tries to buy equal/less qty than db has available, tell them yes,
			// update the db to reduce qty by customer purchase amt, update product sales
			// with revenue from the sale
			else if (parseInt(transaction.qty) <= itemQty) {
				console.log("\nCongrats! You successfully purchased " + transaction.qty 
					+ " of " + itemName + ".");
				lowerQty(transaction.id, transaction.qty, itemQty, itemPrice);
				salesRevenue(transaction.id, transaction.qty, productSales, itemPrice);
			}
		});
	});
}


// function to reduce stock qty (inventory)
// reduce stock qty function
function lowerQty(item, purchaseQty, stockQty, price) {
	// query with an update, set stock equal to stockqty - purchase qty
	// where the item_id equals the id the user entered
	connection.query(
		"UPDATE products SET ? WHERE ?", 
		[
			{
				stock_quantity: stockQty - parseInt(purchaseQty)
			},
			{
				item_id: parseInt(item)
			}
		],
		// throw error if error, else run displayCost
		function(error, response) {
			if (error) throw error;
	});
}

// function sales revenue 
function salesRevenue(item, purchaseQty, productSales, price) {
	var customerCost = parseInt(purchaseQty) * price;
	// query with an update, set product rev equal to current product sales + 
	// purchase qty * price where the item id equals the id the user entered
	connection.query(
		"UPDATE products SET ? WHERE ?", 
		[
			{
				product_sales: productSales + customerCost
			}, 
			{
				item_id: parseInt(item)
			}
		], 
		function(error, response) {
			if (error) throw error;
			// log it fixed to 2 decimals to tell customer what their price was
			console.log("The total price is [$" + customerCost.toFixed(2) 
				+ "] Thanks for you purchase!\n");
			// run welcome function
			welcome();
	});
}

// function to exit app
function exit() {
	console.log("\nThanks for shopping at Bamazon's! Have a good day.");
	connection.end();
}