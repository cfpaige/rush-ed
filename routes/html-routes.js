// ========================= HTML ROUTES =========================
// All the routes below only handle which page the user gets sent to. 

// Requiring path to so we can use relative routes to our HTML files:
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in:
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Requiring models so we can perform queries on our database before loading pages:
var db = require("../models");

module.exports = function (app) {

// ==================== AUTHENTICATION ROUTES ====================
// TODO: create handlebars 'profile', 'login' and 'signup' files and change auth paths to use those instead:
    app.get("/", function (req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
            // handlebars alternative:
            // res.render("index", user)
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"));
        // handlebars alternative:
        // res.render("signup")
    });
// TODO:
    app.get("/login", function (req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
            // handlebars alternative:
            // res.render("index", user)
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
        // handlebars alternative:
        // res.render("login")
    });
// TODO: create 'signup' handlebars file:
    app.get('/signup', function (req, res) {
        res.render('signup')
    });

// ========================= PROTECTED ROUTES ========================
// Here we add our isAuthenticated middleware to specified routes.
// If a user who is not logged in tries to access those routes they will be redirected to the signup page.

// TODO: change to 'profile' with handlebars:
    app.get("/members", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/members.html"));
        // handlebars alternative:
        // res.render("profile")
    });

// TODO: change example to fetch profile-specific helper and load into profile page:
    app.get('/profile/mycolleges', isAuthenticated, function (req, res) {
        db.Example.findAll({}).then(function (dbExamples) {
            res.render("index", {
                msg: "Welcome!",
                examples: dbExamples
            });
        })
    });

// TODO: change example to fetch profile-specific helper and load into profile page:
    app.get('/profile/mycareers', isAuthenticated, function (req, res) {
        db.Example.findAll({}).then(function (dbExamples) {
            res.render("index", {
                msg: "Welcome!",
                examples: dbExamples
            });
        })
    });

// TODO: Change example to add functionality so user can delete saved favs by id:
    app.get("/profile/:id", function (req, res) {
        db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
            res.render("profile", {
                example: dbExample
            });
        })
    });

// TODO: If needed, change example to add functionality so user can click through to see more info:
    app.get("/profile/:id", function (req, res) {
        db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
            res.render("profile", {
                example: dbExample
            });
        })
    });

// ========================= PUBLIC ROUTES ========================
// Our app's publicly accessible HTML routes go here.

    app.get("/college", function (req, res) {
        console.log("Html route to colleges' page.");
        res.render("college");
    })


// ========================= UNMATCHED ROUTES ========================
// Render 404 page for any routes not specified above:

    app.get("*", function (req, res) {
        res.render("404");
    });
};