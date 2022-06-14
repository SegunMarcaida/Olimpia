const {Field} = require("../../models/field");
const {ObjectId} = require("mongodb");
const {User} = require("../../models/User");
module.exports= function(){
return  async function (req, res) {
    let id = req.user._id
     id = new ObjectId(id)

    await User.findOne({_id: id}).then(field => {
        if (field) {
            res.send(200, field)
        } else {
            res.send(404, {msg: "not found"})
        }

    })
}
}