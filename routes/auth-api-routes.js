var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {

  app.post("/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  app.post("/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, "/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/user_data", function (req, res) {
    if (!req.user) {

      res.json({});
    } else {

      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};