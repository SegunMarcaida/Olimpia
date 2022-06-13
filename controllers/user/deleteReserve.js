const Reserves = require("../../models/reserves");

module.exports = function () {
    return async function (req, res) {
        const {id} = req.body;
        await Reserves.deleteOne({id:id},function(err,question){
            if(err) throw err;
            console.log(question)
            res.send(202,{msg:'court delete successfully',});

        })
    }
}