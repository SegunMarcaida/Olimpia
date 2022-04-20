const {MongoClient, ObjectId} = require("mongodb");
const url = require('../../config/keys').mongoURI

module.exports = function() {
    return async function (req, res) {
        let adminId = req.user._id;
        console.log(adminId)
        MongoClient.connect(url, async function (err, db) {

            if (err) throw err;
            let dbo = db.db();
            let query = {adminId: adminId};
            await dbo.collection("fields").find(query).toArray(function (err, result) {
                if (err) throw err;
                res.send(result);

                db.close();
            });
        });
    }
}