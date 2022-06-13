const {Field} = require("../../models/field");
const {MongoClient: {connect}, ObjectId} = require("mongodb");
const {mongoURI: url} = require("../../config/keys");
module.exports = function(){
    return async function(req, res) {
        let {courtId,grade}= req.body
        let qualifications={}
        courtId = new ObjectId(courtId)
        await Field.findOne({_id: courtId}).then(async field => {
            console.log( " field: "+field)
            if(field){
                qualifications["qualifications"] = field.qualifications;
                field.qualifications.push(grade)
            }else{
                res.send(404, {msg: "error"})
            }

        })
        await connect(url, async function (err, db) {
            if (err) throw err;
            let dbo = db.db();
            let query = {_id:courtId};
            await dbo.collection("fields").updateOne(query, {$set: qualifications}, function (err, result) {
                if (err) throw err;
                res.send(201, {msg: 'court updated'})
                db.close()
            });
        });



    }

}