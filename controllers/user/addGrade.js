const {Field} = require("../../models/field");
module.exports = function() {
    return async function (req, res) {
        const {courtId} = req.body
        await Field.findOne({id: courtId}).then(async field => {
            let sum = field.qualifications.reduce((a, b) => a + b, 0)
            res.send( 200, sum / field.qualifications.length)

        })
    }
}
