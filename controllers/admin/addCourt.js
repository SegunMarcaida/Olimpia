const Field = require("../../models/field").Field;

module.exports = function () {
    return async function (req, res) {
        const adminId = req.user._id
        let errors = [];
        const {name, sport, location, description, price, closeHourSun, openHourSun,closeHourMon, openHourMon,closeHourTue, openHourTue,closeHourWed, openHourWed,closeHourThur, openHourThur,closeHourFri, openHourFri,closeHourSat, openHourSat} = req.body;
        if (!name || !sport || !location || !description || !price) {
            errors.push({msg: " please fill all data"})
        }
        console.log(typeof price)
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
        } else {

            await Field.findOne({$and: [{name: name}, {adminId: adminId}]}).then(async field => {
                if (field) {
                    res.send(418, {msg: 'field already registered',});
                } else {
                    let newField = new Field({name, sport, location, description, price, adminId,qualification:[],
                        reserves:{
                             Monday:{
                            openHour: openHourMon,
                            closeHour:closeHourMon
                            },
                            Tuesday:{
                                openHour: openHourTue,
                                closeHour:closeHourTue
                            },
                            Wednesday:{
                                openHour: openHourWed,
                                closeHour:closeHourWed
                            },
                            Thursday:{
                                openHour: openHourThur,
                                closeHour:closeHourThur
                            },
                            Friday:{
                                openHour: openHourFri,
                                closeHour:closeHourFri
                            },
                            Saturday:{
                                openHour: openHourSat,
                                closeHour:closeHourSat
                            },
                            Sunday:{
                                openHour: openHourSun,
                                closeHour:closeHourSun
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