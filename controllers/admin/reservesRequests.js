const {ObjectId, MongoClient} = require("mongodb");
const {mongoURI: url} = require("../../config/keys");
module.exports = function(){
    return async function (req, res) {
        let adminId = req.user._id
        console.log(adminId)
        MongoClient.connect(url, (err, db) => {
            if (err) throw err;
            let dbo = db.db();
            let query = {$and: [{
                    adminId: adminId
                },
                    {isAccepted:false}
                ]};
            dbo.collection("reserves").find(query).toArray(function (err, result) {
                if (err) throw err;
                res.send(200,{msg:"find this requests",result});
                db.close();
            });
        });
    }
}