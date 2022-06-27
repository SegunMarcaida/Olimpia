const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureAuthorizedAdmin} = require("../config/auth");
const makeReserve = require("../controllers/user/makeResersve");
const myReservations = require("../controllers/user/myReservations");
const getCourts = require("../controllers/user/GetCourts");
const filterByName = require("../controllers/user/Filter/FilterByName");
const filterByLocation = require("../controllers/user/Filter/FilterByLocation");
const filterByPrice = require("../controllers/user/Filter/FilterByPrice")
const addGrade = require("../controllers/user/addGrade");
const gradeCount = require("../controllers/user/gradeCourt");
const deleteReserve = require("../controllers/user/deleteReserve");
const filterByAvailability = require("../controllers/user/Filter/FilterByAvailability");
const profile = require("../controllers/shared/profile")
const establishmet = require("../controllers/user/establishmentProfile")
const adminCourts = require("../controllers/user/adminCourts")
const availableTime = require("../controllers/user/availableTime")
const getCourt = require("../controllers/user/getCourt")
const  editProfile = require("../controllers/user/editProfile")
//make a reserve
router.post('/makeReserve' ,ensureAuthenticated,makeReserve())
router.get('/myReservations' ,ensureAuthenticated, myReservations())
router.get('/courts' ,ensureAuthenticated, getCourts())
router.get('/search', ensureAuthenticated,filterByName())
router.get('/location',ensureAuthenticated,filterByLocation())
router.get('/price',ensureAuthenticated,filterByPrice())
router.post('/availability', ensureAuthenticated,filterByAvailability())
router.get("/addGrade",ensureAuthenticated,addGrade())
router.get("/gradeCourt", ensureAuthenticated,gradeCount())
router.delete("/deleteReserve",ensureAuthenticated,deleteReserve())
router.get("/profile",ensureAuthenticated,profile())
router.post("/establishment",ensureAuthenticated,establishmet())
router.post("/adminCourts",ensureAuthenticated,adminCourts())
router.post("/availableTime", ensureAuthenticated, availableTime())
router.post("/getCourt",ensureAuthenticated,getCourt())
router.post("/editProfile",ensureAuthenticated,editProfile())
module.exports = router;