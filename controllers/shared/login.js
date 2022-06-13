const passport = require("passport");
const express = require("express");

module.exports= function() {
    return async function (req, res,next) {
        if (!req.body.isAdmin) {
            await passport.authenticate('local', function (err, user, info) {
                if (err) {
                    return next(err); // will generate a 500 error
                }
                // Generate a JSON response reflecting authentication status
                if (!user) {
                    return res.send(401, {success: false, message: 'authentication failed'});
                }
                req.login(user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    return res.send(202, {success: true, message: 'authentication succeeded', userID:user.id, isAdmin: false});
                });
            })(req, res, next);
        } else {
           await passport.authenticate('local', function (err, user, info) {
                if (err) {
                    return next(err); // will generate a 500 error
                }
                // Generate a JSON response reflecting authentication status
                if (!user) {
                    return res.send(401, {success: false, message: 'authentication failed'});
                }
                req.login(user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    return res.send(202,{success: true, message: 'authentication succeeded', userId:user.id, isAdmin:true});
                });
            })(req, res, next);
        }
    }
}
// Logout
/*router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});*/