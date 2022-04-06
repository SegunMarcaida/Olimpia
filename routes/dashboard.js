const express = require('express');
const router = express.Router();
const url = 'mongodb+srv://segundo:olimpia@cluster0.rutme.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MongoClient = require('mongodb').MongoClient;
const Reserves = require('../models/reserves')
const {ensureAuthenticated} = require("../config/auth");
const makeReserve = require("../controllers/user/makeResersve");
const myReservations = require("../controllers/user/myReservations");

;
//make a reserve
router.post('/make-reserve' ,ensureAuthenticated,makeReserve())

router.get('/my-reservations' ,ensureAuthenticated, myReservations())


module.exports = router;