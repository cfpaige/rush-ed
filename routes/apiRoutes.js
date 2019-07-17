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




  app.post("/api/college", function(req, res) {
     var city=req.body.city;
    var dept=req.body.dept;
    console.log(req.body.city);
    console.log(req.body.dept);
    
    axios.get( "https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key="+process.env.college+"&latest.academics.program.bachelors.computer=1&school.city="+city+"&_fields=id,school.name,id,school.zip,school.school_url,school.accreditor,latest.admissions.admission_rate.overall"
    ).then(function (response) {
    
     
      return res.json(response.data.results);
    }).catch(function(error) {
      console.log(error);
    })
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