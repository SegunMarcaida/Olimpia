const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load admin model
const { forwardAuthenticated } = require('../config/auth');
const User = require("../models/User");
const register = require('../controllers/shared/register')
const login = require("../controllers/shared/login");
const logout = require("../controllers/shared/logout");

// Login Page
router.get('/login' ,forwardAuthenticated,(req,res) => {
    res.render('login')
})

// Register Page
router.get('/register', forwardAuthenticated)

// Register
router.post('/register', register());

// Login
router.post('/login', login())

router.get('/logout', logout())




module.exports = router;
