// ========================= HTML ROUTES =========================
// All the routes below only handle which page the user gets sent to. 

// Requiring path to so we can use relative routes to our HTML files:
var path = require('path');

// Requiring models so we can perform queries on our database before loading pages:
var db = require('../models');

module.exports = function (app) {

// ==================== AUTHENTICATION ROUTES ====================

app.get("/", function(req,res){
        res.render("home");
    });

app.get("/profile", function(req,res){
    if(req.isAuthenticated()){
        var user = {
            id: req.user,
            isloggedin: req.isAuthenticated()
        }
        res.render("user-profile", user);
    }
    else{
        res.render("home");
    }
})

app.get("/signup", function(req,res){
    if(req.isAuthenticated()){
        res.redirect("/profile");
    }else{
       res.render("signup"); 
    }
});

//   app.get("/login", function(req, res) {
//     // If the user already has an account send them to the members page
//     if (req.user) {
//       res.redirect("/profile");
//     }
//     res.render('login');
//   });


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
// Our app's publicly accessible HTML routes go here.

    app.get('/college', function (req, res) {
        console.log('Html route to colleges page.');
        res.render('college');
    })

    // app.get('/career', function (req, res) {
    //     console.log('Html route to career page.');
    //     res.render('career');
    // })

// ========================= UNMATCHED ROUTES ========================
// Render 404 page for any routes not specified above:

    app.get('*', function (req, res) {
        res.render('404');
    });
};