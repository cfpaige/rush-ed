require("dotenv").config();
var methodOverride = require("method-override");
var express = require("express");
var app = express();
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3000;

// Parse application body using middleware:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Use Handlebars:
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set("view engine", "handlebars");

// Allow use of methods other than GET and POST in HTTP:
app.use(methodOverride('_method'));

// Import routes and give the server access to them.
var routes = require("./controllers/rushed_controller.js");

app.use(routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});


// fetching directly from orm, no controller:
// var orm = require("./config/orm.js");

// // For each of the following select methods, a string argument containing wildcard character ("*")
// // could work in most environments, but some MySQL servers (like MAMP) will return an error.

// // Console log all the party_name's.
// orm.select("party_name", "parties");

// // Console log all the client_name's.
// orm.select("client_name", "clients");

// // Console log all the parties that have a party-type of grown-up.
// orm.selectWhere("parties", "party_type", "grown-up");

// // Console log all the clients and their parties.
// orm.leftJoin(["client_name", "party_name"], "clients", "parties", "id", "client_id");