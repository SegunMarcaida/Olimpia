const Reserves = require("../../models/reserves");

    module.exports = function () {
        return async function (req, res) {
            const {court, user, startDate, endDate} = req.body;
            let id = court.id;
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
                    {name: name},
                ]
            };
            await Reserves.findOne(query1).then(field => {
                if (field) {
                    console.log(field)
                    res.send('already Reserved');
                } else {
                    let newReserve = new Reserves({court, user, startDate: startDateInt, endDate: endDateInt, name,id});
                    newReserve.save();
                    res.send('reserved');
                }
            })
        }

}
