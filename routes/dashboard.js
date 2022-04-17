const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require("../config/auth");
const makeReserve = require("../controllers/user/makeResersve");
const myReservations = require("../controllers/user/myReservations");

;
//make a reserve
router.post('/makeReserve' ,ensureAuthenticated,makeReserve())

router.get('/myReservations' ,ensureAuthenticated, myReservations())

//router.get('/search', ensureAuthenticated,require('./search'))

module.exports = router;