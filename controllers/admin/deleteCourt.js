const {Field} = require("../../models/field");
module.exports = function () {
    return async function (req, res) {
        const {name} = req.body;
         await Field.findOne({name: name}).then(field => {
            if (field) {
                field.delete();
                res.send(202,{msg:'court delete successfully',});
            } else {
                res.send(404,{msg:'field not found'});
            }
        })
    }
}