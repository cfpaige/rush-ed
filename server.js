require("dotenv").config();
var methodOverride = require('method-override');
// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
var exphbs = require("express-handlebars");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 3000;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Use Handlebars:
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set("view engine", "handlebars");

// Allow use of methods other than GET and POST in HTTP:
app.use(methodOverride('_method'));

// Requiring our routes
require('./routes/auth-api-routes')(app);
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});