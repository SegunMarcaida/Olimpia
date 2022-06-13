const {ObjectId, MongoClient} = require("mongodb");
const {mongoURI: url} = require("../../config/keys");
module.exports = function(){
    return async function (req, res) {
        let AdminId = req.body;
        userId = new ObjectId(userId)
        MongoClient.connect(url, (err, db) => {
            if (err) throw err;
            let dbo = db.db();
            let query = {$and: [{
                    userId: userId
                },
                    {isAccepted:false}
                ]};
            dbo.collection("reserves").find(query).toArray(function (err, result) {
                if (err) throw err;
                res.send(result);
                db.close();
            });
        });
    }
}