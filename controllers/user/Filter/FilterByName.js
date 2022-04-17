const {MongoClient} = require("mongodb");
const url = require("url");
const Fields = require("../../../models/field").Field;

module.exports = function () {
    return async function (req, res) {
        let name = req.body.name;
        await MongoClient.connect(url, (err, db) => {
            if (err) throw err;
            let dbo = db.db();
            let query = {name: name};
            dbo.query(query)
            dbo.collection("reserves").find(query).toArray(function (err, result) {
                if (err) throw err;
                if (result.length > 0) {
                    res.send(200, {
                        result:result,
                        msg: "found some courts"
                    })
                }else{
                    res.send(404, {
                        msg: "nothing found"
                    })
                }

                db.close();
            });
        });
    }
}
