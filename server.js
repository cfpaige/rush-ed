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
var routes = require("./routes/htmlRoutes");
var apiRoutes = require("./routes/apiRoutes");

app.use(apiRoutes);
app.use(routes);

// // Start our server so that it can begin listening to client requests.
// app.listen(PORT, function() {
//   // Log (server-side) when our server has started
//   console.log("Server listening on: http://localhost:" + PORT);
// });

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
};

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      
      PORT
    )
  })
})