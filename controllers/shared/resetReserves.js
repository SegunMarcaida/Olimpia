const {Field} = require("../../models/field");
const {ObjectId, MongoClient} = require("mongodb");
const {mongoURI: url} = require("../../config/keys");
const Reserves = require("../../models/reserves");
const getPos = require("../../utils/getPos");
module.exports = function () {

    return async function (req, res) {
        let now = new Date();
        const db = await MongoClient.connect(url);
        let dbo = db.db();
        let reserves = await dbo.collection("reserves").find().toArray();
        reserves.map(async reserve => {
            if (reserve.startTime <= now) {
                console.log(reserve)
                let id = reserve._id;
                console.log(id)
                await Reserves.deleteOne({_id: id}, function (err, question) {
                    if (err) throw err;
                    console.log(question)
                })
                let courtId = reserve.courtId
                let field = await Field.findOne({_id: courtId})
                if (field) {
                    let startDay = reserve.startTime.getDay()
                    let endDay = reserve.endTime.getDay();
                    let startHours = reserve.startTime.getHours()
                    let endHours = reserve.endTime.getHours()
                    let startMinutes = reserve.startTime.getMinutes()
                    let endMinutes = reserve.endTime.getMinutes()
                    let startPos = getPos(startHours, startMinutes)
                    let endPos = getPos(endHours, endMinutes)

                    let reserves = field.reserves
                    switch (startDay) {
                        case 0:
                            for (let i = startPos; i < endPos; i++) {
                                reserves.Sunday.time[i] = false
                            }

                            break;
                        case 1:

                            for (let i = startPos; i < endPos; i++) {
                                reserves.Monday.time[i] = false
                            }

                            break;
                        case 2:

                            for (let i = startPos; i < endPos; i++) {
                                reserves.Tuesday.time[i] = false
                            }

                            break;
                        case 3:
                            for (let i = startPos; i < endPos; i++) {
                                reserves.Wednesday.time[i] = false
                            }

                            break;
                        case 4:
                            for (let i = startPos; i < endPos; i++) {
                                reserves.Thursday.time[i] = false
                            }
                            break;
                        case 5:
                            for (let i = startPos; i < endPos; i++) {
                                reserves.Friday.time[i] = false
                            }
                            break;
                        case 6:
                            for (let i = startPos; i < endPos; i++) {
                                reserves.Saturday.time[i] = false
                            }
                    }
                    Field.updateOne({_id: courtId}, {$set: {reserves: reserves}}).then(async field2 => {

                        if (field2) {
                        } else {
                            res.send(400, {msg: "error 2 field not found"})
                        }

                    })

                } else {
                    res.send(400, {msg: "reserve not found"})
                }
            }
        })
        res.send(200, {msg: "completed"})
    }

}
