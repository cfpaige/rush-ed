// ========================= AUTHENTICATION API ROUTES =========================

var db = require('../models');
var passport = require('passport');

module.exports = function (app) {

  app.get("/signup", function (req, res) {
      res.render("signup");
  });

  app.get("/profile", function (req, res) {
      console.log("User is logged in: ", req.isAuthenticated());     
      if(req.isAuthenticated()){
        db.User.findOne({
          where:{
            id: req.user
          }
        }).then(function(dbUser){
          var user = {
            userInfo: dbUser.dataValues,
            id: req.user,
            isloggedin: req.isAuthenticated()
          }
          res.render("user-profile", user);
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
    res.redirect("/home");
  });


app.post('/signup', function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    console.log("info", info);
    if (err) {
      console.log("passport err", err);
      return next(err);
    }
    if (! user) {
      console.log("user error", user);
      return res.send({ success : false, message : 'authentication failed' });
    }
    req.login(user, loginErr => {
      if (loginErr) {
        console.log("loginerr", loginerr)
        return next(loginErr);
      }
      // res.cookie('email', user.email);
      return res.redirect("/profile");
    });      
  })(req, res, next);
});

app.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    console.log("User: ", user)
    if (err) {
      console.log("passport err", err);
      return next(err);
    }
    if (!user) {
      return res.send({ success : false, message : 'Authentication failed.'});
    }
    req.login(user, loginErr => {
      if (loginErr) {
        console.log("loginerr", loginErr)
        return next(loginErr);
      }
      res.cookie('email', user.email);
      return res.json(true);
    });      
  })(req, res, next);
});
};