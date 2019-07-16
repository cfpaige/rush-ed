// const connection = require('../connection');

require('dotenv').config();
const axios = require('axios');
const express = require('express');
var app = express();
const router = express.Router();

var db = require("../models");


module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  app.post("/api/places", function(req, res) {
      let placeQuery = req.body.location;
      placeQuery = placeQuery.split(" ");
      placeQuery = placeQuery.join('%20');
      axios.get( "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=" + process.env.GPLACES + "&input=" + placeQuery + "&inputtype=textquery&fields=formatted_address,geometry"
      ).then(function (response) {
        res.json(response.data.candidates[0].geometry.location);
      }).catch(function(error) {
        console.log(error);
      })
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};

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