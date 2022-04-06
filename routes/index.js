const express = require('express');
const router = express.Router();
const { ensureAuthenticated,  forwardAuthenticated, ensureAuthenticatedAdmin,
    ensureAuthorizedAdmin
} = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard',ensureAuthenticated);
router.get('/admin-dashboard', ensureAuthenticated,ensureAuthorizedAdmin)

module.exports = router;
