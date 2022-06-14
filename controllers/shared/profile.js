const {Field} = require("../../models/field");
const {ObjectId} = require("mongodb");
module.exports= function(){
return  async function (req, res) {
    const courtId = new ObjectId(req.body.courtId)

    await Field.findOne({_id: courtId}).then(field => {
        if (field) {
            res.send(200, field)
        } else {
            res.send(404, {msg: "not found"})
        }

    })
}
}