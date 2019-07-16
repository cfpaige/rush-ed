require('dotenv').config();
const passport = require('passport');
// const connection = require('../connection');
var express = require('express');
var app = express();
var db = require("../models");

// Import Google strategy:
const googleStrategy = require('./googleStrategy');


// Configure:
passport.use('google', googleStrategy);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    app.query('SELECT * FROM User WHERE id = ?', [id], (err, users) => {
        if (err) {
            return done(err, null);
        }
        const user = users[0];
        return done(null, user);
    });
});

module.exports = passport;