require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
const passport = require('./passportAuthentication');
const apiRoutes = require('./routes/apiRoutes');
const authenticationRoute = require('./routes/authentication');
const htmlRoutes = require('./routes/htmlRoutes');
const cookieSession = require('cookie-session');

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // one day in miliseconds
  name: 'session',
  keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set("view engine", "handlebars");

// Routes
// require("./routes/apiRoutes")(app);
// require("./routes/authentication")(app);
// require("./routes/htmlRoutes")(app);

app.use('/', authenticationRoute);
app.use('/', apiRoutes);
app.use('/', htmlRoutes);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;