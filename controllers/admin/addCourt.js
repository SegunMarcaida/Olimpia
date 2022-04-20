const Field = require("../../models/field").Field;
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

module.exports = function () {
    return async function (req, res) {
        const adminId = req.user._id
        const {name, sport, location, description, amount, price} = req.body;
        await Field.findOne({$and:[{name: name},{adminId: adminId}]}).then(async field => {
            if (field) {
                res.send(418, {msg: 'field already registered',});
            } else {
                let newField = new Field({name, sport, location, description, amount, price, adminId})
                newField.save()
                res.send(202, {msg: 'court saved successfully',courtId: newField.id, name:name,adminId:adminId});
            }
        })
    }
}