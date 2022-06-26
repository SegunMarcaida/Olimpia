const {MongoClient, ObjectId} = require("mongodb");
const url = require('../../config/keys').mongoURI

module.exports = function() {
    return async function (req, res) {
        console.clear()
        console.log(req.body)
        console.log(req.body.adminId)
        console.log( typeof req.body.adminId)
        if (req.body.adminId !== ""){
            let adminId = ObjectId(req.body.adminId);
            console.log("adminId: " + adminId)
            console.log(typeof  adminId)
            MongoClient.connect(url, async function (err, db) {
                if (err) throw err;
                let dbo = db.db();
                let query = {adminId: {'$eq':adminId}};
                await dbo.collection("fields").find(query).toArray(function (err, result){
                    if (err) throw err;
                    res.send(result);

                    db.close();
                });
            });
        }

    }
}