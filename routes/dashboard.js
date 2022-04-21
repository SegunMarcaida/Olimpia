const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require("../config/auth");
const makeReserve = require("../controllers/user/makeResersve");
const myReservations = require("../controllers/user/myReservations");
const getCourts = require("../controllers/user/GetCourts");

;
//make a reserve
router.post('/makeReserve' ,ensureAuthenticated,makeReserve())

router.get('/myReservations' ,ensureAuthenticated, myReservations())

router.get('/courts' ,ensureAuthenticated, getCourts())

//router.get('/search', ensureAuthenticated,require('./search'))

module.exports = router;