const {MongoClient: {connect}, ObjectId} = require("mongodb");
const {Field} = require("../../models/field");
const {User} = require("../../models/User");
const url = require('../../config/keys').mongoURI
module.exports = function () {

    return async function (req, res) {
        const userId = req.user._id
        const {username, email, phone} = req.body.newData;
        console.log(req.body)
        let errors = [];


        let user = await User.findOne({_id:userId})


        if (username) {
            console.log(username)
                user.username = username
            console.log(user.username)
        }

        if (email) {
                user.email = email
        }

        if (phone) {
                user.phone = phone
        }

        if (errors.length > 0) {
            res.send(400, {
                success: false, msg: 'there are some errors',
                errors
            });
        } else {
            await connect(url, async function (err, db) {
                console.log("1")
                if (err) throw err;
                let dbo = db.db();
                let query = {_id: userId};
                console.log("user: "+ user)
                await dbo.collection("User").updateOne(query, {$set: user}, function (err, result) {
                    if (err) throw err;
                    res.send(201, {msg: 'court updated'})
                    db.close()
                });
            });
        }
    }
}
