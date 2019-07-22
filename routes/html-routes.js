// ========================= HTML ROUTES =========================
// All the routes below only handle which page the user gets sent to. 

var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

// ==================== AUTHENTICATION ROUTES ====================

app.get("/profile", function(req, res) {
    // If the user already has an account send them to the profile page
    if (req.user) {
      res.redirect("/profile");
    }
    res.render('signup');
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the profile page
    if (req.user) {
      res.redirect("/profile");
    }
    res.render('signup');
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/profile", isAuthenticated, function(req, res) {
    res.render('profile');
  });

// ========================= PROTECTED ROUTES ========================

// TODO: change example to fetch profile-specific helper and load into profile page:
    // app.get('/profile/mycolleges', isAuthenticated, function (req, res) {
    //     db.Example.findAll({}).then(function (dbExamples) {
    //         res.render('index', {
    //             msg: 'Welcome!',
    //             examples: dbExamples
    //         });
    //     })
    // });

// TODO: change example to fetch profile-specific helper and load into profile page:
    // app.get('/profile/mycareers', isAuthenticated, function (req, res) {
    //     db.Example.findAll({}).then(function (dbExamples) {
    //         res.render('index', {
    //             msg: 'Welcome!',
    //             examples: dbExamples
    //         });
    //     })
    // });

// TODO: Change example to add functionality so user can delete saved favs by id:
    // app.get('/profile/:id', function (req, res) {
    //     db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
    //         res.render('profile', {
    //             example: dbExample
    //         });
    //     })
    // });

// TODO: If needed, change example to add functionality so user can click through to see more info:
    // app.get('/profile/:id', function (req, res) {
    //     db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
    //         res.render('profile', {
    //             example: dbExample
    //         });
    //     })
    // });

// ========================= PUBLIC ROUTES ========================

    app.get("/", function(req,res){
        res.render("home");
    });

    app.get('/college', function (req, res) {
        console.log('Html route to colleges page.');
        res.render('college');
    })

    app.get('/career', function (req, res) {
        console.log('Html route to career page.');
        res.render('certification');
    })

// ========================= UNMATCHED ROUTES ========================
// Render 404 page for any routes not specified above:

    app.get('*', function (req, res) {
        res.render('404');
    });
};