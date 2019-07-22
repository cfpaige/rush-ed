// ========================= AUTHENTICATION API ROUTES =========================

var db = require('../models');
var passport = require('../config/passport');

module.exports = function (app) {
    // Fetch the sign-up view:
    app.get('/signup', function (req, res) {
        res.render('signup');
    });

    app.get('/login', function (req, res) {
        console.log('User is logged in', req.isAuthenticated());

        if (req.isAuthenticated()) {
            db.Users.findOne({
                where: {
                    email: req.session.passport.email
                }
            }).then(function (dbUser) {
                var user = {
                    userInfo: dbUser.dataValues,
                    id: req.session.passport.user,
                    isloggedin: req.isAuthenticated()
                }
                console.log(user);
                res.render('user-profile', user);
            })

        }
        else {
            var user = {
                id: null,
                isloggedin: req.isAuthenticated()
            }
            res.redirect('/signup');
        }
    });

    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the profile page.
    // Otherwise the user will be sent an error.
    app.post('/login', passport.authenticate('local'), function (req, res) {
        res.json(req.user);
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error:
    app.post('/signup', function (req, res) {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        })
            .then(function () {
                res.redirect(307, '/login');
            })
            .catch(function (err) {
                res.status(401).json(err);
            });
    });

    // Route for logging the user out:
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

//     // Route for getting some data about the user to be used client-side:
//     app.get('/profile', function (req, res) {
//         if (!req.user) {
//             // The user is not logged in, send back an empty object
//             res.json({});
//         } else {
//             // Otherwise send back the user's email and id.
//             // (Sending back a password, even a hashed password, isn't a good idea.)
//             res.json({
//                 email: req.user.email,
//                 id: req.user.id
//             });
//         }
//     });
// };