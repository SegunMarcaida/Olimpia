const Reserves = require("../../models/reserves");
const {ObjectId} = require("mongodb");

module.exports = function () {
    return async function (req, res) {
        let {_id} = req.body;
        _id = new ObjectId(_id)
        await Reserves.deleteOne({_id:_id},function(err,question){
            if(err) throw err;
            console.log(question)
            res.send(202,{msg:'court delete successfully',});

        })
    }
}