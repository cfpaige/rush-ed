// ========================= AUTHENTICATION API ROUTES =========================

var db = require('../models');
var passport = require('../config/passport');

module.exports = function (app) {

    app.get("/signup", function (req, res) {
        res.render("signup");
    });

      app.post("/signup", function(req, res) {
        db.User.create({
          email: req.body.email,
          password: req.body.password
        })
          .then(function() {
            res.redirect(307, "/login");
          })
          .catch(function(err) {
            res.status(401).json(err);
          });
      });


    app.get("/profile", function (req, res) {
        console.log("User is logged in", req.isAuthenticated());
       
        if(req.isAuthenticated()){

          db.Users.findOne({
            where:{
              id: req.user
            }
          }).then(function(dbUser){
            var user = {
              userInfo: dbUser.dataValues,
              id: req.user,
              isloggedin: req.isAuthenticated()
            }
            res.render("profile", user);
          })
        }
        else {
          var user = {
              id: null,
              isloggedin: req.isAuthenticated()
            }
          res.redirect("/");
        }
       
    });

      app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
      });

  app.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      console.log("info", info);
      if (err) {
        console.log("passport err", err);
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting authentication status
      if (! user) {
        console.log("user error", user);
        return res.send({ success : false, message : 'authentication failed' });
      }

      req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.redirect("/profile");
      });      
    })(req, res, next);
  });

//   app.post("/signup", function(req, res) {
//     db.User.create({
//       email: req.body.email,
//       password: req.body.password
//     })
//       .then(function() {
//         res.redirect(307, "/login");
//       })
//       .catch(function(err) {
//         res.status(401).json(err);
//       });
//   });

  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      console.log("User: ", user)
      if (err) {
        console.log("passport err", err);
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting authentication status
      if (!user) {
        return res.send({ success : false, message : 'authentication failed'});
      }

      req.login(user, loginErr => {
        if (loginErr) {
          console.log("loginerr", loginErr)
          return next(loginErr);
        }
        return res.json(true);        
      });      
    })(req, res, next);
  });


      app.post("/signup", function(req, res) {
        db.User.create({
          email: req.body.email,
          password: req.body.password
        })
          .then(function() {
            res.redirect(307, "/login");
          })
          .catch(function(err) {
            res.status(401).json(err);
          });
      });
    
      // Route for logging user out
      app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/home");
      });
    
    //   // Route for getting some data about our user to be used client side
    //   app.get("/api/user_data", function(req, res) {
    //     if (!req.user) {
    //       // The user is not logged in, send back an empty object
    //       res.json({});
    //     } else {
    //       // Otherwise send back the user's email and id
    //       // Sending back a password, even a hashed password, isn't a good idea
    //       res.json({
    //         email: req.user.email,
    //         id: req.user.id
    //       });
    //     }
    //   });
    };