const {MongoClient} = require("mongodb");
const {mongoURI: url} = require("../../config/keys");
module.exports = function() {
    return async function (req, res) {
        MongoClient.connect(url, async function (err, db) {
            if (err) throw err;
            let dbo = db.db();
            await dbo.collection("fields").find().toArray(function (err, result) {
                if (err) throw err;
                res.send(result);
                db.close();
            });
        });
    }
}