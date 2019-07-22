var LocalStrategy = require('passport-local').Strategy;

var db  = require('../models');

module.exports = function (passport) {

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (email, done) {
    db.User.findByPk(email).then(function (user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'user_key',
    passReqToCallback: true
  },
    function (req, email, user_key, done) {
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
          if (user) {
            console.log('signupMessage', 'That email is already taken.');
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          } else {
            db.User.create({
              email: req.body.email,
              user_key: db.User.generateHash(user_key)
            }).then(function (dbUser) {
              return done(null, dbUser);
            }).catch(function (err) {
              console.log(err);
            });
          }
        });
      });
    }));

passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField : 'user_key',
        passReqToCallback : true
    },
    function(req, email, user_key, done) {
        db.User.findOne({
            where: {
                email: req.body.email 
            }
        }).then(function(user, err) {
            if (!user){
                console.log("No user found.");
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            }
            if (user && !user.validPassword(req.body.user_key)){
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }
            return done(null, user);
        });
    }));
};