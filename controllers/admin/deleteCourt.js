const {Field} = require("../../models/field");
module.exports = function () {
    return async function (req, res) {
        const {name, adminId} = req.body;

         await Field.deleteOne({$and:[{name: name},{adminId: adminId}]},function(err,question){
             if(err) throw err;
                res.send(202,{msg:'court delete successfully',});

        })
    }
}