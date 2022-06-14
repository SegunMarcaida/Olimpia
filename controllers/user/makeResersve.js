const Reserves = require("../../models/reserves");
const {ObjectId} = require("mongodb");
const {Field} = require("../../models/field");
const MILISECONDS_IN_A_DAY = 86400000
const MILISECONDS_IN_A_HOUR = 3600000
    module.exports = function () {
       let getHoursFromMilisec = function (milisec) {
           let hoursInMilisec = parseInt(milisec / MILISECONDS_IN_A_DAY);
           return parseInt(hoursInMilisec / MILISECONDS_IN_A_HOUR)
       }
        return async function (req, res) {
            let {userId, startDate, endDate,courtId} = req.body;
              let courtIdObj = new ObjectId(courtId)
              let userIdObj = new ObjectId(userId)
            startDate = Date.parse(startDate)
            endDate = Date.parse(endDate)
            let query1 = {
                $and: [{
                    $or: [{
                        $and: [
                                    {
                                startDate: {'$lte': startDate}
                            },
                            {
                                endDate: {'$gte': startDate}
                            }

                        ]
                    }, {
                        $and: [
                            {
                                startDate: {'$gte': startDate}
                            },
                            {
                                endDate: {'$lte': endDate}
                            }
                        ]
                    }, {
                        $and: [
                            {
                                startDate: {'$lte': endDate}
                            },
                            {
                                endDate: {'$gte': endDate}
                            }
                        ]
                    }

                    ]
                },
                    {courtId: courtId},
                ]
            };
            await Reserves.findOne(query1).then(async field => {
                if (field) {
                    console.log( "field: " + field)
                    res.send(418, {msg: 'already Reserved'});
                } else {
                    await Field.findOne({_id: courtId}).then(field2 => {
                        if(field2){
                            if (field2.openHour > getHoursFromMilisec(startDate) && field2.openHour > getHoursFromMilisec(endDate) && field2.closeHour < getHoursFromMilisec(startDate) && field2.closeHour < getHoursFromMilisec(endDate)) {
                                res.send(418, {msg: 'invalid time'});
                            } else {
                                let adminId = field2.adminId;
                                let courtName= field2.name;
                                let newReserve = new Reserves({
                                    userId: userIdObj,
                                    startDate: startDate,
                                    endDate: endDate,
                                    courtId: courtIdObj,
                                    adminId: adminId,
                                    courtName: courtName
                                });
                                newReserve.save();
                                res.send(202, {msg: 'Reservation Completed', courtId: newReserve.id})
                                console.log("4")
                            }
                        }else{
                            res.send(400, {msg: "error"})
                        }
                    })
                }
            })
        }

}
