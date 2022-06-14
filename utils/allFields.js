const {MongoClient} = require("mongodb");
const {mongoURI: url} = require("../config/keys");
module.exports = async function (){
    const db = await MongoClient.connect(url);
        let dbo = db.db();
      let res = await dbo.collection("fields").find().toArray();
      await db.close();
      return res
    }
