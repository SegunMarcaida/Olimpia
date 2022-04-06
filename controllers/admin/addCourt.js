const Field = require("../../models/field").Field;

module.exports = function () {
    return async function (req, res) {
        const {name, sport, location, description, amount, price, admin} = req.body;
        Field.findOne({name: name}).then(field => {
            if (field) {
                res.send(418,{msg:'field already exists',});
            } else {
                let newField = new Field({name, sport, location, description, amount, price, admin})
                newField.save();
                res.send(202,{msg:'court saved successfully'});
            }
        })
    }
}