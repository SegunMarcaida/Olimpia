const {MongoClient} = require("mongodb");
const {mongoURI: url} = require("../config/keys");
module.exports = async function (email){
    const db = await MongoClient.connect(url);
    let dbo = db.db();
    let res = await dbo.collection("User").findOne({email: email})
    await db.close()
    return res
}