const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load admin model
const { forwardAuthenticated } = require('../config/auth');
const User = require("../models/User");

// Login Page
router.get('/login' ,forwardAuthenticated,(req,res) => {
    res.render('login')
})

// Register Page
router.get('/register', forwardAuthenticated)

// Register
router.post('/register', (req, res) => {
    const { name, email, password,password2,phone,isAdmin } = req.body;
    let errors = [];

    if (!name || !email || !password ||!password2  ) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('adminRegister', {
            errors,
            name,
            email,
            password,
            password2,
            phone,
            isAdmin
        });
    } else {
        User.findOne({ email: email }).then(admin => {
            console.log(admin)
            if (admin) {
                errors.push({ msg: 'Email already exists' });
                res.render('adminRegister', {
                    errors,
                    name,
                    email,
                    password,
                    password2,
                    phone,
                    isAdmin
                });
            } else {
                const newClient = new User({
                    name,
                    email,
                    password,
                    phone,
                    isAdmin
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newClient.password, salt, (err, hash) => {
                        if (err) throw err;
                        newClient.password = hash;
                        newClient
                            .save()
                            .then(admin => {
                                req.flash(
                                    'You are now registered and can log in'
                                );
                                res.redirect('/olimpia/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }

});

// Login
router.post('/login', (req, res, next) => {
    if (!req.body.isAdmin) {

        passport.authenticate('user-local', {
            successRedirect: '/dashboard',
            failureRedirect: '/olimpia/login',
            failureFlash: true
        })(req, res, next);
    }else
        {
            passport.authenticate('admin-local', {
                successRedirect: '/adminDashboard',
                failureRedirect: '/olimpia/login',
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
