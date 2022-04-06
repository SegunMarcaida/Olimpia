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

        passport.authenticate('user-local', {
            successRedirect: '/dashboard',
            failureRedirect: '',
            failureFlash: true
        })(req, res, next);
    }else
        {
            passport.authenticate('admin-local', {
                successRedirect: '/adminDashboard',
                failureRedirect: '',
                failureFlash: true
            })(req, res, next);
        }
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;
