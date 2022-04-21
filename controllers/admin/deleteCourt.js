const {Field} = require("../../models/field");
module.exports = function () {
    return async function (req, res) {
        const {name} = req.body;
        if(!name || typeof name !== 'string'){
            res.send(400, {
                success: false, msg: 'there are some errors',
            })
        }
        const adminId = req.user._id

         await Field.deleteOne({$and:[{name: name},{adminId: adminId}]},function(err,question){
             if(err) throw err;
             console.log(question)
                res.send(202,{msg:'court delete successfully',});

        })
    }
}