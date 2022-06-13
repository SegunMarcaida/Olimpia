const passport = require("passport");
const express = require("express");
const isAdmin = require("../../utils/isAdmin")
module.exports= function() {
    return async function (req, res,next) {
           let admin =  await isAdmin(req.body.email)
        if (admin) {
            admin = admin.isAdmin;
        }else{
            admin = null;
        }
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
                    console.log(admin)
                    return res.send(202, {success: true, message: 'authentication succeeded', userID:user.id, isAdmin: admin});
                });
            })(req, res, next);

    }
}
// Logout
/*router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});*/