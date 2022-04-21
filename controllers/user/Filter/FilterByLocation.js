/*const {MongoClient} = require("mongodb");
const url = require("url");

module.exports = function () {
    return async function (req, res) {
        let x = req.body.coordinateX;
        let y = req.body.coordinateY;
        let radius = req.body.radius;
        await MongoClient.connect(url, (err, db) => {
            if (err) throw err;
            let dbo = db.db();
            let query = {
                loc: { $geoWithin: { $centerSphere: [ [ x, y ], radius ] } }
            }
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
*/

