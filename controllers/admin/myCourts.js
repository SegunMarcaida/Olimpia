const {MongoClient} = require("mongodb");

module.exports = function() {
    return async function (req, res) {
        let admin = req.body.admin;
        MongoClient.connect(url, async function (err, db) {
            if (err) throw err;
            let dbo = db.db();
            let query = {admin: admin};
            await dbo.collection("fields").find(query).toArray(function (err, result) {
                if (err) throw err;
                res.send(result);

                db.close();
            });
        });
    }
}