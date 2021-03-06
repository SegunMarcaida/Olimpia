const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User').User;

module.exports = function(passport) {
    passport.use('local',
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            // Match user
            await User.findOne({
                email: email
            }).then(async user => {
                if (!user) {
                    return done(null, false, {message: 'That email is not registered'});
                }
                // Match password
                await bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Password incorrect'});
                    }
                });
            });
        })
    );
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};
