const {ObjectId, MongoClient} = require("mongodb");
const {mongoURI: url} = require("../../config/keys");
const Reserves = require("../../models/reserves");
const {Field} = require("../../models/field");
const getPos = require("../../utils/getPos");
const MILISECONDS_IN_A_DAY = 86400000
const MILISECONDS_IN_A_HOUR = 3600000
module.exports = function () {

    return async function (req, res) {
        let {courtId} = req.body;
        let field = await Field.findOne({_id: ObjectId(courtId)})

        if (field ) {
            res.send(200,{
                msg:"found this reserves",
                reserves:field.reserves})
        }else{
        res.send(400,{msg:"field not found"})
        }

    }
}