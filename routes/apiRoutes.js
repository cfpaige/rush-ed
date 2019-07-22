// const connection = require('../config/connection'); FIXME: cannot find module but i don't think we need this?

require('dotenv').config();
const axios = require('axios');
const express = require('express');
const router = express.Router();
const request = require('request');

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
});

router.post("/api/college", function (req, res) {
    var city = req.body.city;
    var dept = req.body.dept;
    console.log(req.body.city);
    console.log(req.body.dept);
    
    axios.get( "https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key="+process.env.college+"&school.city="+city+"&school.operating=1&_fields=id,school.name,school.school_url,school.accreditor,school.branches,latest.cost.tuition.program_year,latest.aid.pell_grant_rate,latest.aid.federal_loan_rate,latest.cost.program_reporter.program_1.cip_6_digit.full_program,latest.cost.program_reporter.program_2.cip_6_digit.annualized",
    
    ).then(function (response) {


        return res.json(response.data.results);
    }).catch(function (error) {
        console.log(error);
    })

});

router.get("/api/apprenticeship/:place", function (req, res) {
    let place = req.params.place; //ex: Seattle,WA (city and state or just state)
    axios.get("https://api.careeronestop.org/v1/apprenticeshipfinder/" + process.env.COSID + "/" + place + "/25", { headers: { Authorization: "Bearer " + process.env.COSTOKEN } })
        .then(function (response) {
            res.json(response.data);
        }).catch(function (err) {
            console.log(err);
            res.end()
        })
});

router.get("/api/certification/:field", function (req, res) {
    let field = req.params.field; //ex: doctors
    console.log("https://api.careeronestop.org/v1/certificationfinder/" + process.env.COSID + "/" + field, { headers: { Authorization: "Bearer " + process.env.COSTOKEN } });
    axios.get("https://api.careeronestop.org/v1/certificationfinder/" + process.env.COSID + "/" + field + "/0/0/0/0/0/0/0/0/0/10", { headers: { Authorization: "Bearer " + process.env.COSTOKEN } })
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (err) {
            console.log(err);
        })
})


router.post("/api/college/job", function (req, res) {


    var place = req.body.place;
    var job = req.body.job;
    console.log("job" + job);
    var host = 'data.usajobs.gov';
    var userAgent = 'helankjose@gmail.com';
    var authKey = process.env.job;
    //var query_url="https://data.usajobs.gov/api/search?JobCategoryCode=2210&Keyword=Software Development&LocationName=Washington";
    //var authKey = process.env.job;    
    request({
        url: 'https://data.usajobs.gov/api/search?page=2&ResultsPerPage=4&Keyword=' + job + '&LocationName=' + place,
        method: 'GET',
        headers: {
            "Host": host,
            "User-Agent": userAgent,
            "Authorization-Key": authKey
        }
    }, function (error, response, body) {
        //var data = JSON.parse(body);  
        //console.log(data);
        console.log(body);
        return res.json(body);
    });

});
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
