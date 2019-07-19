const connection = require('../connection');

require('dotenv').config();
const axios = require('axios');
const express = require('express');
const router = express.Router();

// var users = require("../models/user.js");
// var favs = require("../models/fav.js")

// // Create all our routes and set up logic within those routes where required.
// router.get("/", function(req, res) {
//   cat.all(function(data) {
//     var hbsObject = {
//       cats: data
//     };
//     console.log(hbsObject);
//     res.render("index", hbsObject);
//   });
// });

// router.post("/api/cats", function(req, res) {
//   cat.create([
//     "name", "sleepy"
//   ], [
//     req.body.name, req.body.sleepy
//   ], function(result) {
//     // Send back the ID of the new quote
//     res.json({ id: result.insertId });
//   });
// });

// router.put("/api/cats/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

//   cat.update({
//     sleepy: req.body.sleepy
//   }, condition, function(result) {
//     if (result.changedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// router.delete("/api/cats/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   cat.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

router.get('/', function (req, res) {
    res.render('index');
  });


module.exports = function(router) {

  router.post("/api/places", function(req, res) {
      let placeQuery = req.body;
      let latitude = placeQuery['location[latitude]'];
      let longitude = placeQuery['location[longitude]'];
      axios.get( "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=" + process.env.GPLACES + "&location=" + latitude + ',' + longitude + "&radius=1500&type=university"
      ).then(function (response) {
        res.json(response.data);
      }).catch(function(error) {
        console.log(error);
      })
  });
};


// // function checkAuthentication(req, res, next) {
// //     const isAuthenticate = req.isAuthenticated();
// //     if (isAuthenticate) {
// //         return next();
// //     }

// //     res.status(401).json({
// //         message: 'Not authorized',
// //         statusCode: 401
// //     });
// // }

// // router.get('/user', checkAuthentication, (req, res) => {
// //     connection.query('SELECT * FROM User WHERE id = ?', [req.user.id], (error, data) => {
// //         if (error) {
// //             return res.status(500).json({
// //                 message: 'Internal Error',
// //                 statusCode: 500
// //             });
// //         }

// //         const user = data[0];
// //         delete user.password;
// //         return res.status(200).json(user);
// //     });
// // });

module.exports = router;