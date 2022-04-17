const {MongoClient, ObjectId} = require("mongodb");
const url = require('../../config/keys').mongoURI
module.exports = function(){
    return async function (req, res) {
        let userId = req.body;
        userId = new ObjectId(userId)
        MongoClient.connect(url, (err, db) => {
            if (err) throw err;
            let dbo = db.db();
            let query = {userId: userId};
            dbo.collection("reserves").find(query).toArray(function (err, result) {
                if (err) throw err;
                res.send(result);

                db.close();
            });
        });
    }
}