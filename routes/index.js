const express = require('express');
const router = express.Router();
const { ensureAuthenticated,  forwardAuthenticated, ensureAuthenticatedAdmin,
    ensureAuthorizedAdmin
} = require('../config/auth');
const resetReserves = require('../controllers/shared/resetReserves')

router.post('/', forwardAuthenticated, resetReserves());
// Dashboard
router.get('/dashboard',ensureAuthenticated);
router.get('/adminDashboard', ensureAuthenticated,ensureAuthorizedAdmin)

module.exports = router;
