const {ObjectId} = require("mongodb");
const {User} = require("../../models/User");
module.exports= function(){
    return  async function (req, res) {
        let id = req.body.id
        id = new ObjectId(id)
        await User.findOne({_id: id}).then(admin => {
            if (admin) {
                res.send(200, admin)
            } else {
                res.send(404, {msg: "not found"})
            }

        })
    }
}