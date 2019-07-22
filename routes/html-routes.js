// ========================= HTML ROUTES =========================
// All the routes below only handle which page the user gets sent to. 

var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

    // ==================== AUTHENTICATION ROUTES ====================

    app.get("/signup", function (req, res) {
        if (req.user) {
            res.redirect("/profile");
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    app.get("/login", function (req, res) {
        if (req.user) {
            res.redirect("/profile");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get("/profile", isAuthenticated, function (req, res) {
        res.render('profile');
    });

    // ========================= PUBLIC ROUTES ========================

    app.get("/", function (req, res) {
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