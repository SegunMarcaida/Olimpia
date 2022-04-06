const {MongoClient} = require("mongodb");

module.exports = function(){
    return async function (req, res) {
        let user = req.body.user;
        MongoClient.connect(url, (err, db) => {
            if (err) throw err;
            let dbo = db.db();
            let query = {user: user};
            dbo.query(query)
            dbo.collection("reserves").find(query).toArray(function (err, result) {
                if (err) throw err;
                res.send(result);

                db.close();
            });
        });
    }
}