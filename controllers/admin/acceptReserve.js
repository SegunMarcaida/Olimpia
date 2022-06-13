const {Field} = require("../../models/field");
const Reserves = require("../../models/reserves");
const {mongoURI: url} = require("../../config/keys");
const {MongoClient: {connect}   , ObjectId} = require("mongodb");
module.exports = function() {
    return async function (req, res) {
        const {ReserveId} = req.body
        const accept = {isAccepted:true}
        await connect(url, async function (err, db) {
            if (err) throw err;
            let dbo = db.db();
            let query = {id:ReserveId};
            await dbo.collection("Reserves").updateOne(query, {$set: accept}, function (err, result) {
                if (err) throw err;
                res.send(201, {msg: 'reserve accepted'})
                db.close()
            });
        });
        }
    }