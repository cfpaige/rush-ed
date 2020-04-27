require('dotenv').config();
var methodOverride = require('method-override');
var express = require('express');
var session = require('express-session');
var exphbs = require('express-handlebars');
var passport = require('passport');
require('./config/passport');

// port,and database require
var PORT = process.env.PORT || 3000;
var db = require('./models');
var app = express();

// express server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(methodOverride('_method'));

// getting all the routes in
let apiRoutes = require('./routes/apiRoutes')
require('./routes/auth-api-routes')(app, passport);
require('./routes/api-routes')(app, passport);
app.use(apiRoutes);
require('./routes/html-routes')(app, passport);

// stop the database from remaking itself every time the server starts
var syncOptions = { force: false };
// unless we're in a development environmnet
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}

// start up the server using the information provided
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  });
});

module.exports = app;