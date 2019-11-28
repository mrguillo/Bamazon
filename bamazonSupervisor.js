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
    // welcome customer
    console.log("\n\n\n-----------------------------------------------------------------\n" +
        "Welcome to Bamazon SUPERVISOR! \n" +
        "-----------------------------------------------------------------\n");
    // start the app
    supervisor();
});


// List a set of menu options: asks managers what they want to do, runs a function 
// based on selected answer
// ==========================================================================

function supervisor() {
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            choices: [
                "View Product Sales by Department",
                "Create New Department",
                "Exit"
            ],
            message: "Please select the desired task."
        }
    ]).then(function(answer) {
        switch (answer.action) {
            case "View Product Sales by Department":
                viewSales();
                break;
            case "Create New Department":
                newDepartment();
                break;
            case "Exit":
                exit();
                break;        
            default:
                break;
        }
    })
}

// FUNCTION view Bamazon sales by Department
// ==========================================================================

function viewSales() {
	// building query variable for inner join
	// selecting dept id, dept name, OH costs, sum(product sales) with alias product
	// sales, and sum(product sales) - OH costs with alias total profit - these will
	// be the resulting table headers
	// from departments table, inner join products table where dept names equal each 
	// other. group by dept id
	var joinQuery = "SELECT department_id, departments.department_name, over_head_costs,"
		+ " SUM(product_sales) AS product_sales," 
		+ " SUM(product_sales) - over_head_costs AS total_profit ";
	joinQuery += "FROM departments INNER JOIN products ";
	joinQuery += "ON departments.department_name = products.department_name ";
	joinQuery += "GROUP BY department_id ";

	// query the db, throw error if error, if not, build and print console table
	// return to welcome screen
	connection.query(joinQuery, function(error, results) {
		if (error) throw error;
		console.table(results);
		supervisor();
	});
}


// FUNCTION to create new department
// ==========================================================================

function newDepartment() {
	// query db to display console table of current departments and validate supervisor
	// isn't adding a dept that already exists
	connection.query("SELECT * FROM departments", function (error, results) {
		if (error) throw error;
		// display current departments
		console.table(results);
		// ask for new dept name and overhead for it
		inquirer.prompt([
			{
				name: "name",
				message: "Please input new [department_name].",
				// validating dept doesn't already exist
				validate: function(value) {
					// create empty dept array
					var deptArray = [];
					// push all current depts to array
					for (var i = 0; i < results.length; i++) {
						deptArray.push(results[i].department_name.toLowerCase());
					}
					// if supervisor input not in array, return true, else return false
					if (deptArray.indexOf(value.toLowerCase()) === -1) {
						return true;
					}
					return false;
				}
			},
			{
				name: "overhead",
				message: "Input new Department [over_head_costs].",
				// validate the overhead is a number larger than 0
				validate: function(value) {
					if (isNaN(value) === false && value > 0) {
						return true;
					}
					return false;
				}
			}
		]).then(function(newDept) {
			// query db for an insertion into the departments table, set name/costs equal
			// to supervisor input
			connection.query(
				"INSERT INTO departments SET ?",
				{
					department_name: newDept.name,
					over_head_costs: parseFloat(newDept.overhead).toFixed(2)
				}, 
				function(error, results) {
					// if error, tell us, else log success and return to welcome screen
					if (error) throw error;
					console.log("\nNew department added successfully.\n");
					supervisor();
			});
		});
	});
}



// FUNCTION to exit app
// ==========================================================================

function exit() {
	console.log("\nExiting Bamazon SUPERVISOR! Have a good day.");
    connection.end();
    console.log("\n\n-----------------------------------------------------------------\n");
}

