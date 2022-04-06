const express = require('express');
const router = express.Router();
const url = 'mongodb+srv://segundo:olimpia@cluster0.rutme.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MongoClient = require('mongodb').MongoClient;
const Reserves = require('../models/reserves')
const {ensureAuthenticated} = require("../config/auth");
const makeReserve = require("../controllers/user/makeResersve");
;
//make a reserve
router.post('/makeReserve' ,ensureAuthenticated,makeReserve())

router.get('/myReservations' ,ensureAuthenticated, (req, res)=> {
    let user = req.body.user;
    MongoClient.connect(url,(err, db)=> {
        if (err) throw err;
        let dbo = db.db();
        let query = {user: user};
        dbo.query(query)
         dbo.collection("reserves").find(query).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);

            db.close();
        });
    });
})


module.exports = router;