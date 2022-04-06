const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load admin model
const { forwardAuthenticated } = require('../config/auth');
const User = require("../models/User");
const register = require('../controllers/shared/register')

// Login Page
router.get('/login' ,forwardAuthenticated,(req,res) => {
    res.render('login')
})

// Register Page
router.get('/register', forwardAuthenticated)

// Register
router.post('/register', register());

// Login
router.post('/login', (req, res, next) => {
    if (!req.body.isAdmin) {

        passport.authenticate('user-local',function (err,user,info) {
            if (err) {
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting authentication status
            if (! user) {
            return res.send(401,{ success : false, message : 'authentication failed' });
        }
        req.login(user, function(err){
            if(err){
                return next(err);
            }
            return res.send({ success : true, message : 'authentication succeeded' });
        });
    })(req, res, next);
    }else
        {
            passport.authenticate('admin-local', function(err,user,info){
                if (err) {
                    return next(err); // will generate a 500 error
                }
                // Generate a JSON response reflecting authentication status
                if (! user) {
            return res.send(401,{ success : false, message : 'authentication failed' });
        }
            req.login(user, function(err){
                if(err){
                    return next(err);
                }
                return res.send({ success : true, message : 'authentication succeeded' });
            });
        })(req, res, next);
        }
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;
