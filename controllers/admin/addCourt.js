const Field = require("../../models/field").Field;

module.exports = function () {
    return async function (req, res) {
        const adminId = req.user._id
        let errors = [];
        let {name, sport, location, description, price, closeHourSun, openHourSun,closeHourMon, openHourMon,closeHourTue, openHourTue,closeHourWed, openHourWed,closeHourThur, openHourThur,closeHourFri, openHourFri,closeHourSat, openHourSat} = req.body;
    console.log(openHourMon)
        if (!name || !sport || !location || !description || !price) {
            errors.push({msg: " please fill all data"})
        }

        if (typeof name !== 'string' || typeof sport !== 'string'  || typeof description !== 'string' || typeof location  !== 'object'|| typeof price !== 'number') {
            errors.push({msg: " Data types dont much with Required"})
        }
        if (sport !== 'Football' && sport !== 'Basketball' && sport !== 'Tennis' && sport !== 'Paddle') {
            errors.push({msg: " Invalid Sport"})
        }
        if (price <= 0) {
            errors.push({msg: " Invalid Price"})
        }
        if (errors.length > 0) {
            res.send(400, {
                success: false, msg: 'there are some errors',
                errors
            });
            if (openHourMon === undefined){
                console.log("1")
                openHourMon = 0
                closeHourMon = 0
            }
            if (!openHourTue || !closeHourTue){
                openHourTue = 0
                closeHourTue =0
            }
            if (!openHourWed || !closeHourWed){
                openHourWed = 0
                closeHourWed =0
            }
            if (!openHourThur || !closeHourThur){
                openHourThur = 0
                closeHourThur =0
            }
            if (!openHourFri || !closeHourFri){
                openHourFri = 0
                closeHourFri =0
            }
            if (!openHourSat || !closeHourSat){
                openHourSat = 0
                closeHourSat =0
            }
            if (!openHourSun || !closeHourSun){
                openHourSun = 0
                closeHourSun =0
            }

        } else {
            let timeMon= [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,]
            let timeTue= [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,]
            let timeWed= [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,]
            let timeThur= [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,]
            let timeFri= [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,]
            let timeSat= [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,]
            let timeSun= [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,]

            for (let i = openHourMon*2; i <closeHourMon*2 ; i++) {
                timeMon[i] = false
            }
            for (let i = openHourTue*2; i <closeHourTue*2 ; i++) {
                timeTue[i] = false
            }
            for (let i = openHourWed*2; i <closeHourWed*2 ; i++) {
                timeWed[i] = false
            }
            for (let i = openHourThur*2; i <closeHourThur*2 ; i++) {
                timeThur[i] = false
            }
            for (let i = openHourFri*2; i <closeHourFri*2 ; i++) {
                timeFri[i] = false
            }
            for (let i = openHourSat*2; i <closeHourSat*2 ; i++) {
                timeSat[i] = false
            }
            for (let i = openHourSun*2; i <closeHourSun*2 ; i++) {
                timeSun[i] = false
            }

            await Field.findOne({$and: [{name: name}, {adminId: adminId}]}).then(async field => {
                if (field) {
                    res.send(418, {msg: 'field already registered',});
                } else {
                    let newField = new Field({name, sport, location, description, price, adminId,qualification:[],
                        reserves:{
                             Monday:{
                            openHour: openHourMon,
                            closeHour:closeHourMon,
                                 time : timeMon
                            },
                            Tuesday:{
                                openHour: openHourTue,
                                closeHour:closeHourTue,
                                time : timeTue
                            },
                            Wednesday:{
                                openHour: openHourWed,
                                closeHour:closeHourWed,
                                time : timeWed
                            },
                            Thursday:{
                                openHour: openHourThur,
                                closeHour:closeHourThur,
                                time : timeThur
                            },
                            Friday:{
                                openHour: openHourFri,
                                closeHour:closeHourFri,
                                time : timeFri
                            },
                            Saturday:{
                                openHour: openHourSat,
                                closeHour:closeHourSat,
                                time : timeSat
                            },
                            Sunday:{
                                openHour: openHourSun,
                                closeHour:closeHourSun,
                                time : timeSun
                            },
                        }})
                    newField.save()
                    res.send(202, {
                        msg: 'court saved successfully',
                        courtId: newField.id,
                        name: name,
                        adminId: adminId
                    });
                }
            })
        }
    }
}