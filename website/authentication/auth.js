var user = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (u, done) {
    done(null, u.id);
});

passport.deserializeUser(function (id, done) {
    user.User.findById(id, function (err, u) {
        done(err, u);
    });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log("adasdasda");
        console.log("In login function" + username + password);
        user.User.findOne({ username: username }, function (err, u) {
            if (err) { return done(err); }
            if (!u) {
                return done(null, false, { message: 'Incorrect Username No.' });
            }
            if (u) {
                if (password == u.password) {
                    return done(null, u);
                }
                else {
                    return done(null, false, { message: 'Incorrect password.' });
                }
            }
        });
    })
);