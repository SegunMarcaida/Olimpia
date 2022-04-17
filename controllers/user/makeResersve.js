const Reserves = require("../../models/reserves");
const {ObjectId} = require("mongodb");

    module.exports = function () {
        return async function (req, res) {
            const {userId, startDate, endDate,courtId} = req.body;
            let startDateInt = startDate;
            let endDateInt = endDate;
              let courtIdObj = new ObjectId(courtId)
              let userIdObj = new ObjectId(userId)
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
                    {courtId: courtId},
                ]
            };
            await Reserves.findOne(query1).then(field => {
                if (field) {
                    console.log(field)
                    res.send(418, {msg: 'already Reserved',});
                } else {
                    let newReserve = new Reserves({userId:userIdObj, startDate: startDateInt, endDate: endDateInt,courtId:courtIdObj});
                    newReserve.save();
                    res.send(202, {msg: 'Reservation Completed',courtId: newReserve.id})
                }
            })
        }

}
