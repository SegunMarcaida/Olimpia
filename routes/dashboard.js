const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require("../config/auth");
const makeReserve = require("../controllers/user/makeResersve");
const myReservations = require("../controllers/user/myReservations");

;
//make a reserve
router.post('/make-reserve' ,ensureAuthenticated,makeReserve())

router.get('/my-reservations' ,ensureAuthenticated, myReservations())



module.exports = router;