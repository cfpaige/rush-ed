require('dotenv').config();
var methodOverride = require('method-override');
var express = require('express');
var session = require('express-session');
var exphbs = require('express-handlebars');
var passport = require('passport');
require('./config/passport');

var PORT = process.env.PORT || 3000;
var db = require('./models');
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(methodOverride('_method'));

let apiRoutes = require('./routes/apiRoutes')

require('./routes/auth-api-routes')(app, passport);
require('./routes/api-routes')(app, passport);
app.use(apiRoutes);
require('./routes/html-routes')(app, passport);

var syncOptions = { force: false };

if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}

db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  });
});

module.exports = app;