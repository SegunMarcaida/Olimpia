const Reserves = require("../../models/reserves");
const {ObjectId} = require("mongodb");
const {Field} = require("../../models/field");
const MILISECONDS_IN_A_WEEK = 604800000
const  getPos = require("../../utils/getPos")
    module.exports = function () {

        return async function (req, res) {
            let userId = req.user.id
            let {startDate:startDate0, endDate:endDate0, courtId} = req.body;
            let courtIdObj = ObjectId(courtId)
            let userIdObj = ObjectId(userId)
          let  startDate = new Date(startDate0)
           let endDate = new Date(endDate0)
            let startDay = startDate.getDay()
            let endDay = endDate.getDay();
            let startHours = startDate.getHours()
            let endHours = endDate.getHours()
            let startMinutes = startDate.getMinutes()
            let endMinutes = endDate.getMinutes()
            let startPos = getPos(startHours, startMinutes)
            let endPos = getPos(endHours, endMinutes)
            let now = new Date()
            if (startDate == NaN || endDate == NaN || startDate>=now+MILISECONDS_IN_A_WEEK ||startDate<= now || startDate>= endDate) {
                res.send(400, {msg: "error"})
            }
            let query1 = {_id: courtIdObj}
            let field = await Field.findOne(query1)
            if (field && startDay === endDay) {
                let isAvailable = true
                let reserves = field.reserves
                switch (startDay) {
                    case 0:
                        if(startHours<reserves.Sunday.openHour || endHours>reserves.Sunday.closeHour) {
                            isAvailable = false
                        }
                        for (let i = startPos; i <=endPos ; i++) {
                            if (reserves.Sunday.time[i]){
                                isAvailable = false
                            }
                        }
                        if(isAvailable){
                            for (let i = startPos; i < endPos ; i++) {
                                reserves.Sunday.time[i] = true
                            }
                        }
                            break;
                    case 1:
                        if(startHours<reserves.Monday.openHour || endHours>reserves.Monday.closeHour) {
                            isAvailable = false
                        }
                        for (let i = startPos; i <=endPos ; i++) {
                            if (reserves.Monday.time[i]){
                                isAvailable = false
                            }
                        }
                        if(isAvailable){
                            for (let i = startPos; i < endPos ; i++) {
                                reserves.Monday.time[i] = true
                            }
                        }
                        break;
                    case 2:
                        if(startHours<reserves.Tuesday.openHour || endHours>reserves.Tuesday.closeHour) {
                            isAvailable = false
                        }
                        for (let i = startPos; i <=endPos ; i++) {
                            if (reserves.Tuesday.time[i]){
                                isAvailable = false
                            }
                        }
                        if(isAvailable){
                            for (let i = startPos; i < endPos ; i++) {
                                reserves.Tuesday.time[i] = true
                            }
                        }
                        break;
                    case 3:
                        if(startHours<reserves.Wednesday.openHour || endHours>reserves.Wednesday.closeHour) {
                            isAvailable = false
                        }
                        for (let i = startPos; i <=endPos ; i++) {
                            if (reserves.Wednesday.time[i]){
                                isAvailable = false
                            }
                        }
                        if(isAvailable){
                            for (let i = startPos; i < endPos ; i++) {
                                reserves.Wednesday.time[i] = true
                            }
                        }
                        break;
                    case 4:
                        if(startHours<reserves.Thursday.openHour || endHours>reserves.Thursday.closeHour) {
                            isAvailable = false
                        }
                        for (let i = startPos; i <=endPos ; i++) {
                            if (reserves.Thursday.time[i]){
                                isAvailable = false
                            }
                        }
                        if(isAvailable){
                            for (let i = startPos; i < endPos ; i++) {
                                reserves.Thursday.time[i] = true
                            }
                        }
                        break;
                    case 5:
                        console.log("Friday")
                        if(startHours<reserves.Friday.openHour || endHours>reserves.Friday.closeHour) {
                            isAvailable = false
                            console.log("1")
                        }
                        for (let i = startPos; i <=endPos ; i++) {
                            if (reserves.Friday.time[i]){
                                isAvailable = false
                            }
                        }
                        if(isAvailable){
                            for (let i = startPos; i < endPos ; i++) {
                                reserves.Friday.time[i] = true
                            }
                            console.log("Friday "+ reserves.Friday.time)
                        }
                        break;
                    case 6:
                        if(startHours<reserves.Saturday.openHour || endHours>reserves.Saturday.closeHour) {
                            isAvailable = false
                        }
                        for (let i = startPos; i <=endPos ; i++) {
                            if (reserves.Saturday.time[i]){
                                isAvailable = false
                            }
                        }
                        if(isAvailable){
                            for (let i = startPos; i < endPos ; i++) {
                                reserves.Saturday.time[i] = true
                            }
                        }
                }
                if (isAvailable){
                    console.log("reserves: "+ reserves)
                    Field.updateOne(query1,{$set: {reserves: reserves}}).then(async field2 => {
                        if (field2) {
                            console.log("field2: "+ field2)
                            let newReserve = await new Reserves({
                                courtName: field.name,
                                userId: userId,
                                adminId: field.adminId,
                                courtId: field._id,
                                startTime: startDate0,
                                endTime: endDate0,
                            })
                            newReserve.save()
                            res.send(200, {msg: "Reservation Sent"})

                        }else {
                            res.send(400, {msg: "error 1"})
                        }

                    })
                }else{
                    res.send(400, {msg: "unavailable"})
                }

            }
            else{
                res.send(400, {msg: "error 0",field})
            }


        }
    }