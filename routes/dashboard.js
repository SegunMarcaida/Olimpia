const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require("../config/auth");
const makeReserve = require("../controllers/user/makeResersve");
const myReservations = require("../controllers/user/myReservations");
const getCourts = require("../controllers/user/GetCourts");
const filterByName = require("../controllers/user/Filter/FilterByName");
const filterByLocation = require("../controllers/user/Filter/FilterByLocation");
const filterByPrice = require("../controllers/user/Filter/FilterByPrice")

;
//make a reserve
router.post('/makeReserve' ,ensureAuthenticated,makeReserve())

router.get('/myReservations' ,ensureAuthenticated, myReservations())

router.get('/courts' ,ensureAuthenticated, getCourts())

router.get('/search', ensureAuthenticated,filterByName())
router.get('/location',ensureAuthenticated,filterByLocation())
router.get('/price',ensureAuthenticated,filterByPrice())
module.exports = router;