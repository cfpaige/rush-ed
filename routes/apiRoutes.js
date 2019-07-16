var db = require("../models");
const axios = require('axios');

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  app.post("/api/places", function(req, res) {
      let placeQuery = req.query.location;
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
