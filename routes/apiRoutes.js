var db = require("../models");
const axios = require('axios');
var express = require("express");


var router = express.Router();
var router = express.Router();

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
