const {Field} = require("../../models/field");
module.exports = function () {
    return async function (req, res) {
        const {name} = req.body;
        const adminId = req.user._id

         await Field.deleteOne({$and:[{name: name},{adminId: adminId}]},function(err,question){
             if(err) throw err;
             console.log(question)
                res.send(202,{msg:'court delete successfully',});

        })
    }
}