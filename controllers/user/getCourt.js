const {Field} = require("../../models/field");
const {ObjectId} = require("mongodb");
module.exports = function (){
    return async function (req, res) {
       let courtId = req.body.courtId
        courtId= ObjectId(courtId)
        let field = await Field.findOne({_id: courtId})
        if (field){
            res.send(200,field)
        }else{
            res.send(404,{msg: "not found"})
        }

    }
}