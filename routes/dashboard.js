const express = require('express');
const router = express.Router();
const url = 'mongodb+srv://segundo:olimpia@cluster0.rutme.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MongoClient = require('mongodb').MongoClient;
const Reserves = require('../models/reserves')
//make a reserve
router.post('/makeReserve',
    (req, res) => {
        const {court, user, startDate,endDate} = req.body;
        let name = court.name;
        let startDateInt = startDate.getTime();
        let endDateInt = endDate.getTime();
        let query1 = {
            $and: [{
                $or: [{
                    $and: [
                        {
                            startDate: {'$lte': startDateInt}
                        },
                        {
                            endDate: {'$gte': startDateInt}
                        }

                    ]
                }, {
                    $and: [
                        {
                            startDate: {'$gte': startDateInt}
                        },
                        {
                            endDate: {'$lte': endDateInt}
                        }
                    ]
                }, {
                    $and: [
                        {
                            startDate: {'$lte': endDateInt}
                        },
                        {
                            endDate: {'$gte': endDateInt}
                        }
                    ]
                }

                ]
            },
                    {name:name},

            ]
        };
        Reserves.findOne(query1).then(field => {
            if (field){
                console.log(field)
                res.send('already Reserved');
            } else {
                let newReserve = new Reserves({court, user, startDate: startDateInt, endDate: endDateInt,name});
                newReserve.save();
                res.send('reserved');
            }
        })

    })

router.get('/myReservations', function (req, res) {
    let user = req.body.user;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db();
        let query = { user:user };
        dbo.collection("reserves").find(query).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);

            db.close();
        });
    });
})


module.exports = router;