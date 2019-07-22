var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

module.exports = function (passport) {

  // In order to help keep authentication state across HTTP requests,
  // Sequelize needs to serialize and deserialize the user
  // Just consider this part boilerplate needed to make it all work
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (email, done) {
    db.User.findByPk(email).then(function (user) {
      if (user) {
        done(null, user.get());
      } else {
        // console.log("user.errors", user.errors)
        done(user.errors, null);
      }
    });
  });

  // Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
  passport.use('local-signup', new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, email, password, done) {
      // When a user tries to sign in this code runs
      process.nextTick(function () {
        db.User.findOne({
          where: {
            email: email
          }
        }).then(function (user, err) {
          if (err) {
            console.log("err", err)
            return done(err);
          }

          // check to see if theres already a user with that email
          if (user) {

            console.log('signupMessage', 'That email is already taken.');
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          } else {
            db.User.create({
              email: req.body.email,
              password: db.User.generateHash(password)

            }).then(function (dbUser) {
              //console.log("created result: ", dbUser);
              // send post back to render
              return done(null, dbUser);

            }).catch(function (err) {
              // handle error;
              console.log(err);
            });
          }
        });
      });

    }));

  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and account_key, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    function (req, email, password, done) {

      db.User.findOne({
        where: {
          email: req.body.email
        }
      }).then(function (user, err) {
        if (!user) {
          console.log("No user found.");
          return done(null, false, req.flash('loginMessage', 'No user found.'));
        }
        if (user && !user.validPassword(req.body.password)) {

          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        }
        return done(null, user);

      });

    }));

};