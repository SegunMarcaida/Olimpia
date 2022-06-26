
const {MongoClient: {connect}, ObjectId} = require("mongodb");
const {Field} = require("../../models/field");
const url = require('../../config/keys').mongoURI

module.exports = function () {

    return async function (req, res) {
        const adminId = req.user._id
        const { name, sport, location, description, price,openHourMon,closeHourMon,openHourTue,closeHourTue,closeHourWed,openHourWed,openHourThu,closeHourThu,openHourFri,closeHourFri,openHourSat,closeHourSat,openHourSun,closeHourSun,} = req.body;
        const newValues = {};
        let id = new ObjectId(req.body.id);
        let errors = [];


        let field = await Field.findOne({_id:id})


        if (name) {
            if (typeof name !== 'string') {
                errors.push({msg: 'wrong data type'})
            } else {
                field.name = name
            }
        }





        if (sport) {
            if (typeof sport !== 'string') {
                errors.push({msg: 'wrong data type'})
            }
            if (sport !== 'Football' && sport !== 'Basketball' && sport !== 'Tennis' && sport !== 'Paddle') {
                errors.push({msg: " Invalid Sport"})
            } else {
                field.sport = sport
            }
        }
        if (location) {
            if (typeof location !== 'object') {
                errors.push({msg: 'wrong data type'})
            } else {
                field.location = location
            }
        }
        if (description) {
            if (typeof description !== 'string') {
                errors.push({msg: 'wrong data type'})
            } else {
                field.description = description
            }
        }
        if (price) {
            if (typeof price !== 'number') {
                errors.push({msg: 'wrong data type'})
            }
            if (price <= 0) {
                errors.push({msg: " Invalid Price"})
            } else {
                field.price= price
            }
        }
            if(openHourMon){
                if (typeof price !== 'number') {
                    errors.push({msg: 'wrong data type'})
                }
                else{
                    field.reserves.Monday.openHour= openHourMon
                }
            }
        if(closeHourMon){
            if (typeof price !== 'number') {
                errors.push({msg: 'wrong data type'})
            }
            else{
                field.reserves.Monday.closeHour= closeHourMon
            }
        }
        if(openHourTue){
            if (typeof price !== 'number') {
                errors.push({msg: 'wrong data type'})
            }
            else{
                field.reserves.Tuesday.openHour= openHourTue
            }
        }
        if(closeHourTue){
            if (typeof price !== 'number') {
                errors.push({msg: 'wrong data type'})
            }
            else{
                field.reserves.Tuesday.closeHour= closeHourTue
            }
        }
        if(openHourWed){
            if (typeof price !== 'number') {
                errors.push({msg: 'wrong data type'})
            }
            else{
                field.reserves.Wednesday.openHour= openHourWed
            }
        }
        if(closeHourWed){
            if (typeof price !== 'number') {
                errors.push({msg: 'wrong data type'})
            }
            else{
                field.reserves.Wednesday.closeHour= closeHourWed
            }
        }
        if(openHourThu){
            if (typeof price !== 'number') {
                errors.push({msg: 'wrong data type'})
            }
            else{
                field.reserves.Thursday.openHour= openHourThu
            }
        }
        if(closeHourThu){
            if (typeof price !== 'number') {
                errors.push({msg: 'wrong data type'})
            }
            else{
                field.reserves.Thursday.closeHour= closeHourThu
            }
        }
        if(openHourFri){
            if (typeof price !== 'number') {
                errors.push({msg: 'wrong data type'})
            }
            else{
                field.reserves.Friday.openHour= openHourFri
            }
        }


        if(closeHourFri){
            if (typeof price !== 'number') {
                errors.push({msg: 'wrong data type'})
            }
            else{
                field.reserves.Friday.closeHour= closeHourFri
            }
        }
        if(closeHourFri){
            if (typeof price !== 'number') {
                errors.push({msg: 'wrong data type'})
            }
            else{
                field.reserves.Friday.closeHour= closeHourFri
            }
        }

        if(openHourSat){
            if (typeof price !== 'number') {
                errors.push({msg: 'wrong data type'})
            }
            else{
                field.reserves.Saturday.openHour= openHourSat
            }
        }
        if(closeHourSat){
            if (typeof price !== 'number') {
                errors.push({msg: 'wrong data type'})
            }
            else{
                field.reserves.Saturday.closeHour= closeHourSat
            }
        }
        if(openHourSun){
            if (typeof price !== 'number') {
                errors.push({msg: 'wrong data type'})
            }
            else{
                field.reserves.Sunday.openHour= openHourSun
            }
        }
        if(closeHourSun){
            if (typeof price !== 'number') {
                errors.push({msg: 'wrong data type'})
            }
            else{
                field.reserves.Sunday.closeHour= closeHourSun
            }
        }
        if (errors.length > 0) {
            res.send(400, {
                success: false, msg: 'there are some errors',
                errors
            });
        } else {
            await connect(url, async function (err, db) {
                console.log("1")
                if (err) throw err;
                let dbo = db.db();
                let query = {_id: id};
                console.log(newValues)
                await dbo.collection("fields").updateOne(query, {$set: field}, function (err, result) {
                    if (err) throw err;
                    res.send(201, {msg: 'court updated'})
                    db.close()
                });
            });
        }
    }
    }