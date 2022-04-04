const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load admin model
const Admin = require('../models/admin').Admin;
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated)

// Register Page
router.get('/register', forwardAuthenticated)

// Register
router.post('/register', (req, res) => {
    const { name, email, password,password2,phone } = req.body;
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
            phone
        });
    } else {
        Admin.findOne({ email: email }).then(admin => {
            if (admin) {
                errors.push({ msg: 'Email already exists' });
                res.render('adminRegister', {
                    errors,
                    name,
                    email,
                    password,
                    password2,
                    phone
                });
            } else {
                const newAdmin = new Admin({
                    name,
                    email,
                    password,
                    phone
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                        if (err) throw err;
                        newAdmin.password = hash;
                        newAdmin
                            .save()
                            .then(admin => {
                                req.flash(
                                    'You are now registered and can log in'
                                );
                                res.redirect('/admins/login');
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
    passport.authenticate('local', {
        successRedirect: '/adminDashboard',
        failureRedirect: '/admins/login',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/admins/login');
});

module.exports = router;
