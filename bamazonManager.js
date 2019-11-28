// npm requirements
// ==========================================================================

var inquirer = require("inquirer");
var mysql = require("mysql");
var pw = require("./pw");


// create mysql connection
// ==========================================================================

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: pw.pw,
    database: "bamazon_db"
});


// connect to db
// ==========================================================================

connection.connect(function (error) {
    if (error) throw error;
    // welcome MANAGER
    console.log("\n\n\n-----------------------------------------------------------------\n" +
        "Welcome to Bamazon MANAGER! \n" +
        "-----------------------------------------------------------------\n");
    // start the app
	console.log(myPassword);
	manager();
});


// Render menu options: asks managers what they want to do, runs a function 
// based on selected answer
// ==========================================================================

function manager() {
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit"
            ],
            message: "Please select the desired task."
        }
    ]).then(function(answer) {
        switch (answer.action) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addToInventory();
                break;
            case "Add New Product":
                addNewProduct();
                break;
            case "Exit":
                exit();
                break;        
            default:
                break;
        }
    })

}


// FUNCTION * View Products for Sale
// ==========================================================================

function viewProducts() {
	// save query to VAR query
	var query = "SELECT * FROM products";
	// run query
	connection.query(query, function(error, results) {
		// let us know if error
		if (error) throw error;
        // build console table
        console.log("\n-----------------------------------------------------------------\n");
        console.log("\n Showing available products in Bamazon store \n");
        console.table( results );
        console.log("\n\n-----------------------------------------------------------------\n");
		// run MANAGER function
		manager();
	});
}


// FUNCTION * View Low Inventory
// ==========================================================================
    
function viewLowInventory() {
    // save query 
	var query = "SELECT * FROM products WHERE stock_quantity < 5";
	// run query
	connection.query(query, function(error, results) {
		if (error) throw error;
		// render console table
        console.log("\n-----------------------------------------------------------------\n");
        console.log("\n Showing products with low inventory ( <5 ) \n");
        console.table( results );
        console.log("\n\n-----------------------------------------------------------------\n");
		// run manager function
		manager();
	});
}


// FUNCTION * Add to Inventory
// ==========================================================================

function addToInventory() {
	// query db for all products
	connection.query("SELECT * FROM products", function (error, results) {
		if (error) throw error;
		// show manager current product list so they know which item id to select
        console.log("\n-----------------------------------------------------------------\n");
        console.log("\n Showing products available to reorder.\n");
        console.table( results );
        console.log("\n\n-----------------------------------------------------------------\n");
		// ask manager which item id they'd like to add inventory to and by how much
		inquirer.prompt([
			{
				name: "id",
				message: "Input the [item_ID] to increase inventory on.",
				// validate the item id is a number larger than 0 and contained in db
				validate: function(value) {
					if (isNaN(value) === false && value > 0 && value <= results.length) {
						return true;
					}
					return false;
				}
			},
			{
				name: "amount",
				message: "Input the amount to increase inventory by.",
				// make sure the amount is a number over 0
				validate: function(value) {
					if (isNaN(value) === false && value > 0) {
						return true;
					}
					return false;
				}
			}
		]).then(function(answer) {
			// init item qty var
			var itemQty;
			// loop through results, if db item id equals manager's input, set itemQty
			// to stock qty of that item 
			for (var i = 0; i < results.length; i++) {
				if (parseInt(answer.id) === results[i].item_id) {
					itemQty = results[i].stock_quantity;
				}
			}
			// call increaseQty function, pass in values for item, origQty, addQty
			increaseQty(answer.id, itemQty, answer.amount);
		});
	});
}

// increase inventory FUNCTION
// ==========================================================================

function increaseQty(item, stockQty, addQty) {
	// query with an update, set stock equal to stockqty + addition qty
	// where the item_id equals the id the user entered
	connection.query(
		"UPDATE products SET ? WHERE ?", 
		[
			{
				stock_quantity: stockQty + parseInt(addQty)
			}, 
			{
				item_id: parseInt(item)
			}
		], 
		function(error, results) {
			if (error) throw error;
			console.log("\nInventory successfully increased.\n");
			manager();
	});
}


// FUNCTION * Add New Product
// ==========================================================================

function addNewProduct() {
	// querying prior to inquirer so that I can build the choices array from all 
	// available departments
	connection.query("SELECT * FROM departments", function (error, results) {
		// collect item data
		inquirer.prompt([
			{
				name: "item",
				message: "Input new item to add [product_name]."
			},
			{
				name: "department",
				type: "list",
				choices: function() {
					// empty array
					var deptArray = [];
					// filling array with all detps from table
					for (var i = 0; i < results.length; i++) {
						deptArray.push(results[i].department_name);
					}
					// returning filled array
					return deptArray;
				},
				message: "Which department does this item belong in [department_name]?"
			},
			{
				name: "price",
				message: "Please set the item's [price]",
				// validate the cost is a number above/equal to 0 (could be free)
				validate: function(value) {
					if (value >= 0 && isNaN(value) === false) {
						return true;
					}
					return false;
				}
			},
			{
				name: "inventory",
				message: "Add inventory now? Set the quantity [stock_quantity]",
				// validate the qty is a number above 0
				validate: function(value) {
					if (value > 0 && isNaN(value) === false) {
						return true;
					}
					return false;
				}			
			}
		]).then(function(newItem) {
			// then call the add item to dB function with values from inquirer
			addItemToDb(newItem.item, newItem.department, 
				parseFloat(newItem.price).toFixed(2), parseInt(newItem.inventory));
		});
	});
}


// add item to db FUNCTION
// ==========================================================================

function addItemToDb(item, department, price, quantity) {
	// query for creating table row, set vals for each column equal to parameters
	connection.query(
		"INSERT INTO products SET ?", 
		{
			product_name: item,
			department_name: department,
			price: price,
			stock_quantity: quantity
		},
		function(error, results) {
			// throw error, else log product added and return to welcome screen
			if (error) throw error;
			console.log("\nNew product successfully added.\n");
			manager();
	});
}


// FUNCTION to exit app
// ==========================================================================

function exit() {
	console.log("\nExiting Bamazon MANAGER! Have a good day.");
	connection.end();
}