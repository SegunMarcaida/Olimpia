const {MongoClient} = require("mongodb");
const {mongoURI: url} = require("../../../config/keys");

module.exports = function () {
    return async function (req, res) {
        let {low,high} = req.body;
        if(!low || typeof low !== 'number'|| !high || typeof high !== 'number' || low>high) {
            res.send(400, {
                success: false, msg: 'there are some errors',
            })
        }
        await MongoClient.connect(url, (err, db) => {
            if (err) throw err;
            let dbo = db.db();
            let query = {
                $and:[
                    {
                price:{'$lte':high}
                },
                    {
                        price:{'$gte':low}
                    }
                ]
            };
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
