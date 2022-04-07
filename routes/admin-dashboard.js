const express = require('express');
const {ensureAuthenticatedAdmin, ensureAuthorizedAdmin, ensureAuthenticated} = require("../config/auth");
const router = express.Router();
const Field = require('../models/field').Field;
const url = 'mongodb+srv://segundo:olimpia@cluster0.rutme.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MongoClient = require('mongodb').MongoClient;
const  myCourts = require('../controllers/admin/myCourts')
const addCourt = require('../controllers/admin/addCourt')
const deleteCourt = require('../controllers/admin/deleteCourt')

//findReserves
router.get('/my-courts', ensureAuthenticated, ensureAuthorizedAdmin, myCourts())


// add Field    
router.post('/add-court',ensureAuthenticated,ensureAuthorizedAdmin,addCourt())
router.delete('/delete-court',ensureAuthenticated,ensureAuthorizedAdmin,deleteCourt())
module.exports = router;