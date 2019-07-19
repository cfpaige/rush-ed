const connection = require('../config/connection');

require('dotenv').config();
const axios = require('axios');
const express = require('express');
<<<<<<< HEAD
var request = require('request');   
//var app = express();
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
=======
const router = express.Router();


    // router.post("/places", function (req, res) {
    //     let placeQuery = req.body;
    //     let latitude = placeQuery['location[latitude]'];
    //     let longitude = placeQuery['location[longitude]'];
    //     axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=" + process.env.GPLACES + "&location=" + latitude + ',' + longitude + "&radius=1500&type=university"
    //     ).then(function (response) {
    //         res.json(response.data);
    //     }).catch(function (error) {
    //         console.log(error);
    //     })
    // }); im not sure why this is still here? why are there two of them?

    router.post("/api/places", function (req, res) {
        let placeQuery = req.body;
        let latitude = placeQuery['location[latitude]'];
        let longitude = placeQuery['location[longitude]'];
        axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=" + process.env.GOOGLEKEY + "&location=" + latitude + ',' + longitude + "&radius=1500&type=university"
        ).then(function (response) {
            res.json(response.data);
        }).catch(function (error) {
            console.log(error);
        })
>>>>>>> 1f23f6f1ddda2ce6a2a53362cb98af7f93f7b88a
    });

<<<<<<< HEAD
  router.post("/api/college", function(req, res) {
     var city=req.body.city;
    var dept=req.body.dept;
    console.log(req.body.city);
    console.log(req.body.dept);
    
    axios.get( "https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key="+process.env.college+"&latest.academics.program.bachelors.computer=1&school.city="+city+"&_fields=id,school.name,id,school.zip,school.school_url,school.accreditor,latest.admissions.admission_rate.overall"
    ).then(function (response) {
    
     
      return res.json(response.data.results);
    }).catch(function(error) {
      console.log(error);
=======
    router.get("/api/apprenticeship/:place", function (req, res) {
        let place = req.params.place; //ex: Seattle,WA (city and state or just state)
        axios.get("https://api.careeronestop.org/v1/apprenticeshipfinder/" + process.env.COSID + "/" + place + "/25", { headers: { Authorization: "Bearer " + process.env.COSTOKEN } })
            .then(function (response) {
                res.json(response.data);
            }).catch(function (err) {
                console.log(err);
                res.end()
            })
>>>>>>> 1f23f6f1ddda2ce6a2a53362cb98af7f93f7b88a
    })

    router.get("/api/certification/:field", function (req, res) {
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

<<<<<<< HEAD

router.get("/api/college", function(req, res) {
  
 
 axios.get("https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key="+process.env.college+"&latest.academics.program.certificate_lt_1_yr.biological=1&latest.academics.program.assoc.health=1&latest.academics.program.bachelors.health=2&_fields=id,school.name,school.city,school.zip,school.school_url,school.accreditor,latest.admissions.admission_rate.overall"
 ).then(function (response) {
 
  
   return res.json(response.data.results);
 }).catch(function(error) {
   console.log(error);
 })
});


router.post("/api/college/job", function(req, res) {
  
    
  var place=req.body.place;
  var job=req.body.job;
  console.log("job"+job);
  var host = 'data.usajobs.gov';  
  var userAgent = 'helankjose@gmail.com';  
  var authKey=process.env.job;
  //var query_url="https://data.usajobs.gov/api/search?JobCategoryCode=2210&Keyword=Software Development&LocationName=Washington";
  //var authKey = process.env.job;    
  request({      
    url: 'https://data.usajobs.gov/api/search?page=2&ResultsPerPage=4&Keyword='+job+'&LocationName='+place,      
    method: 'GET',      
    headers: {          
        "Host": host,          
        "User-Agent": userAgent,          
        "Authorization-Key": authKey      
    }  
}, function(error, response, body) {      
    //var data = JSON.parse(body);  
    //console.log(data);
    console.log(body);
    return res.json(body);
});

});


function checkAuthentication(req, res, next) {
    const isAuthenticate = req.isAuthenticated();
    if (isAuthenticate) {
        return next();
    }
=======
    router.get("/api/licenses/:field/:location", function (req, res) {
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
>>>>>>> 1f23f6f1ddda2ce6a2a53362cb98af7f93f7b88a

    router.get("/api/calenderlist", function (req, res) {
        
    })

    // router.get("/api/apprenticeship/sponsers/:field/:place", function (req, res) {
    //   let field = req.params.field;
    //   let place = req.params.place;
    //   console.log("https://api.careeronestop.org/v1/apprenticeshipfinder/" + process.env.COSID + "/" + field + "/" + place + "/100")
    //   axios.get("https://api.careeronestop.org/v1/apprenticeshipfinder/" + process.env.COSID + "/" + field + "/" + place + "/100", { headers: { Authorization: "Bearer " + process.env.COSTOKEN } })
    //     .then(function (response) {
    //       res.json(response.data);
    //     }).catch(function(err) {
    //       console.log(err);
    //     })
    // })

    router.post("/api/college", function (req, res) {
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

// function checkAuthentication(req, res, next) {
//   const isAuthenticate = req.isAuthenticated();
//   if (isAuthenticate) {
//     return next();
//   }

//   res.status(401).json({
//     message: 'Not authorized',
//     statusCode: 401
//   });
// }

// router.get('/user', checkAuthentication, (req, res) => {
//   connection.query('SELECT * FROM User WHERE id = ?', [req.user.id], (error, data) => {
//     if (error) {
//       return res.status(500).json({
//         message: 'Internal Error',
//         statusCode: 500
//       });
//     }

//     const user = data[0];
//     delete user.password;
//     return res.status(200).json(user);
//   });
// });

module.exports = router;