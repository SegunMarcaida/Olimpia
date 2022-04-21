const Field = require("../../models/field").Field;
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

module.exports = function () {
    return async function (req, res) {
        const adminId = req.user._id
        let errors = [];
        const {name, sport, location, description, price} = req.body;
        if (!name || !sport || !location || !description || !price) {
            errors.push({msg: " please fill all data"})
        }
        console.log(typeof price)
        if (typeof name !== 'string' || typeof sport !== 'string'  || typeof description !== 'string' || typeof location  !== 'object'|| typeof price !== 'number') {
            errors.push({msg: " Data types dont much with Required"})
        }
        if (sport !== 'Football' && sport !== 'Basketball' && sport !== 'Tennis' && sport !== 'Paddle') {
            errors.push({msg: " Invalid Sport"})
        }
        if (price <= 0) {
            errors.push({msg: " Invalid Price"})
        }
        if (errors.length > 0) {
            res.send(400, {
                success: false, msg: 'there are some errors',
                errors
            });
        } else {

            await Field.findOne({$and: [{name: name}, {adminId: adminId}]}).then(async field => {
                if (field) {
                    res.send(418, {msg: 'field already registered',});
                } else {
                    let newField = new Field({name, sport, location, description, price, adminId})
                    newField.save()
                    res.send(202, {
                        msg: 'court saved successfully',
                        courtId: newField.id,
                        name: name,
                        adminId: adminId
                    });
                }
            })
        }
    }
}