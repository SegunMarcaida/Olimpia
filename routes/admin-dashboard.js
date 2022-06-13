const express = require('express');
const { ensureAuthorizedAdmin, ensureAuthenticated} = require("../config/auth");
const router = express.Router();
const  myCourts = require('../controllers/admin/myCourts')
const addCourt = require('../controllers/admin/addCourt')
const deleteCourt = require('../controllers/admin/deleteCourt')
const editCourt = require('../controllers/admin/editCourt')

//findReserves
router.get('/my-courts', ensureAuthenticated, ensureAuthorizedAdmin, myCourts())


// add Field    
router.post('/add-court',ensureAuthenticated,ensureAuthorizedAdmin,addCourt())
router.delete('/delete-court',ensureAuthenticated,ensureAuthorizedAdmin,deleteCourt())
router.post('/edit-court',ensureAuthenticated,ensureAuthorizedAdmin,editCourt())

module.exports = router;