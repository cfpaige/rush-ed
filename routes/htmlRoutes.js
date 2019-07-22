const connection = require('../config/connection.js');
require('dotenv').config();
const express = require('express');
const router = express.Router();
var apiRoutes = require('./apiRoutes');

// Load index page
router.get("/home", function (req, res) {
  console.log("html route");
  res.render("home");
});


router.get("/college", function (req, res) {
  console.log("html route");
  res.render("college");
});



router.get("/profile", function (req, res) {
  console.log("html route");
  res.render("studentprofile");
});

//router.get("/college/job", function (req, res) {
//  console.log("html route");
 // res.render("college");
//});

router.get("/career", function (req, res) {
  console.log("html route");
  res.render("certification");
});

// Secure Routes

// router.get('/profile', checkAuthentication, function (req, res) {
//   connection.query('SELECT * FROM User WHERE id = ?', [req.user.id], (error, data) => {
//     if (error) {
//       return res.status(500).json({
//         message: 'Internal Error',
//         statusCode: 500
//       });
//     }

//     const user = data[0];
//     delete user.password;
//     res.render('profile', { title: 'Profile - Page', ...user });
//   });

// });

// Render 404 page for any unmatched routes
router.get("*", function (req, res) {
  res.render("404");
});




// // function checkAuthentication(req, res, next) {
// //     const isAuthenticate = req.isAuthenticated();
// //     if (isAuthenticate) {
// //         if (req.url === '/') {
// //             return res.redirect('/profile');
// //         }
// //         return next();
// //     }

// //     if (!isAuthenticate && req.url === '/') {
// //         return next();
// //     }

// //     return res.redirect('/notauthorized');
// // }

// // // Secure Routes
// // router.get('/', checkAuthentication, function (req, res) {
// //     res.render('index', { title: 'Home Page' })
// // });

// // router.get('/profile', function (req, res) {
// //     // connection.query('SELECT * FROM User WHERE id = ?', [req.user.id], (error, data) => {
// //     //     if (error) {
// //     //         return res.status(500).json({
// //     //             message: 'Internal Error',
// //     //             statusCode: 500
// //     //         });
// //     //     }

// //     //     const user = data[0];
// //     //     delete user.password;
// //     //     res.render('profile', { title: 'Profile - Page', ...user });
// //     // });
// //     res.render("profile")
// // });

// // // Public Routes
// // router.get('/notauthorized', function (req, res) {
// //     res.render('notauthorized', { title: 'Not Authorized - Pagw' })
// // });

module.exports = router;
