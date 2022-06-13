
const {MongoClient: {connect} } = require("mongodb");
const {Field} = require("../../models/field").Field;
const url = require('../../config/keys').mongoURI

module.exports = function () {

    return async function (req, res) {
        const adminId = req.user._id
        const {name, sport, location, description, price} = req.body;
        const newValues = {};
        let errors = [];
        if (name) {
            if (typeof name !== 'string') {
                errors.push({msg: 'wrong data type'})
            } else {
                newValues["name"] = name
            }
        }
        if (sport) {
            if (typeof sport !== 'string') {
                errors.push({msg: 'wrong data type'})
            }
            if (sport !== 'Football' && sport !== 'Basketball' && sport !== 'Tennis' && sport !== 'Paddle') {
                errors.push({msg: " Invalid Sport"})
            } else {
                newValues["sport"] = sport
            }
        }
        if (location) {
            if (typeof location !== 'object') {
                errors.push({msg: 'wrong data type'})
            } else {
                newValues["location"] = location
            }
        }
        if (description) {
            if (typeof description !== 'string') {
                errors.push({msg: 'wrong data type'})
            } else {
                newValues["description"] = description
            }
        }
        if (price) {
            if (typeof price !== 'number') {
                errors.push({msg: 'wrong data type'})
            }
            if (price <= 0) {
                errors.push({msg: " Invalid Price"})
            } else {
                newValues["price"] = price
            }
        }

        if (errors.length > 0) {
            res.send(400, {
                success: false, msg: 'there are some errors',
                errors
            });
        } else {
            await connect(url, async function (err, db) {
                if (err) throw err;
                let dbo = db.db();
                let query = {name: name, adminId: adminId};
                await dbo.collection("fields").updateOne(query, {$set: newValues}, function (err, result) {
                    if (err) throw err;
                    res.send(201, {msg: 'court updated'})
                    db.close()
                });
            });
        }
    }
    }