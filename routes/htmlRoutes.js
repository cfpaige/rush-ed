const connection = require('../config/connection.js');
require('dotenv').config();
const express = require('express');
const router = express.Router();
var apiRoutes = require('./apiRoutes');

  // Load index page
  router.get("/", function(req, res) {
      res.render("index", {
        msg: "RushEd has landed!",
      });
  });

//   // Load example page and pass in an example by id
//   app.get("/example/:id", function(req, res) {
//     db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.render("example", {
//         example: dbExample
//       });
//     });
//   });

  router.get("/college", function (req, res) {
    console.log("html route");
    res.render("college");
  })


  // Render 404 page for any unmatched routes
  router.get("*", function (req, res) {
    res.render("404");
  });