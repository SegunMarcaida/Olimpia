const {MongoClient} = require("mongodb");
const url = require('../../../config/keys').mongoURI


module.exports = function () {
    return async function (req, res) {
        let {name} = req.body;
        if(!name || typeof name !== 'string') {
            res.send(400, {
                success: false, msg: 'there are some errors',
            })
        }
        await MongoClient.connect(url, (err, db) => {
            if (err) throw err;
            let dbo = db.db();
            let query = {name: name};
            dbo.collection("fields").find(query).toArray(function (err, result) {
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
