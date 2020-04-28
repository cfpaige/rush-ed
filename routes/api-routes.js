require('dotenv').config();
const axios = require('axios');
const request = require('request');
var db = require("../models");

module.exports = function (app) {

  // the google places api call
  app.post("/api/places", function (req, res) {
    let placeQuery = req.body;
    let latitude = placeQuery['location[latitude]'];
    let longitude = placeQuery['location[longitude]'];
    axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=" + process.env.GPLACES + "&location=" + latitude + ',' + longitude + "&radius=1500&type=university"
    ).then(function (response) {
      res.json(response.data);
    }).catch(function (error) {
      console.log(error);
    })
  });

  // the apprenticeship call to careeronestop
  app.get("/api/apprenticeship/:place", function (req, res) {
    let place = req.params.place; //ex: Seattle,WA (city and state or just state)
    axios.get("https://api.careeronestop.org/v1/apprenticeshipfinder/" + process.env.COSID + "/" + place + "/25", { headers: { Authorization: "Bearer " + process.env.COSTOKEN } })
      .then(function (response) {
        res.json(response.data);
      }).catch(function (err) {
        console.log(err);
        res.end()
      })
  });

  // the certification call to career one stop
  app.get("/api/certification/:field", function (req, res) {
    let field = req.params.field; //ex: doctors
    console.log("looook HERE", "https://api.careeronestop.org/v1/certificationfinder/" + process.env.COSID + "/" + field, { headers: { Authorization: "Bearer " + process.env.COSTOKEN } });
    axios.get("https://api.careeronestop.org/v1/certificationfinder/" + process.env.COSID + "/" + field + "/0/0/0/0/0/0/0/0/0/10", { headers: { Authorization: "Bearer " + process.env.COSTOKEN } })
      .then(function (response) {
        res.json(response.data);
      })
      .catch(function (err) {
        console.log(err);
      })
  })

  // the licenses call to career one stop
  app.get("/api/licenses/:field/:location", function (req, res) {
    let field = req.params.field; //ex: doctors
    let location = req.params.location; //ex: WA (NOT city and state)
    axios.get('https://api.careeronestop.org/v1/license/' + process.env.COSID + '/' + field + '/' + location + '/0/0/0/5?searchMode=literal', { headers: { Authorization: "Bearer " + process.env.COSTOKEN } })
      .then(function (response) {
        res.json(response.data);
      })
      .catch(function (error) {
        console.log(error)
      })
  })

  // api call to the college score card database
  app.post("/api/college", function (req, res) {
    var city = req.body.city;
    var dept = req.body.dept;
    console.log(req.body.city);
    console.log(req.body.dept);
    axios.get("https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=" + process.env.college + "&latest.academics.program.bachelors.computer=1&school.city=" + city + "&_fields=id,school.name,id,school.zip,school.school_url,school.accreditor,latest.admissions.admission_rate.overall"
    ).then(function (response) {
      return res.json(response.data.results);
    }).catch(function (error) {
      console.log(error);
    })
  });
};