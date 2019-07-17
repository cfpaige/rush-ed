// const connection = require('../connection');

require('dotenv').config();
const axios = require('axios');
const express = require('express');
var app = express();
const router = express.Router();

var db = require("../models");

  // Get all examples
  router.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

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

  router.get("/api/apprenticeship/:field/:place", function(req, res) {
    let field = req.params.field;
    let place = req.params.place;
    console.log('did we get here?');
    axios.get("https://api.careeronestop.org/v1/apprenticeshipfinder/" + process.env.COSID + "/" + place + "/25", {headers: {Authorization: "Bearer " + process.env.COSTOKEN}})
    .then(function(response) {
      res.json(response.data);
    })
  })

  // Create a new example
  router.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  router.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

function checkAuthentication(req, res, next) {
    const isAuthenticate = req.isAuthenticated();
    if (isAuthenticate) {
        return next();
    }

    res.status(401).json({
        message: 'Not authorized',
        statusCode: 401
    });
}

router.get('/user', checkAuthentication, (req, res) => {
    connection.query('SELECT * FROM User WHERE id = ?', [req.user.id], (error, data) => {
        if (error) {
            return res.status(500).json({
                message: 'Internal Error',
                statusCode: 500
            });
        }

        const user = data[0];
        delete user.password;
        return res.status(200).json(user);
    });
});

module.exports = router;