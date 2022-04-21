
const {MongoClient: {connect}   , ObjectId} = require("mongodb");
const {Field} = require("../../models/field").Field;
const url = require('../../config/keys').mongoURI

module.exports = function () {

    return async function (req, res) {
        const adminId = req.user._id
        const {name, sport, location, description, price} = req.body;
        const newValues ={};
        if (name) {newValues["name"]=name}
        if (sport) {newValues["sport"]=sport}
        if (location) {newValues["location"]=location}
        if (description) {newValues["description"]=description}
        if (price) {newValues["price"]=price}
        console.log(newValues);


          await  connect(url, async function (err, db) {
              if (err) throw err;
              let dbo = db.db();
              let query = {name:name,adminId:adminId};
              await dbo.collection("fields").updateOne(query, {$set:newValues},function (err, result) {
                  if (err) throw err;
                 res.send(201,{msg:'court updated'})
                  db.close()
              });
          });
        }
    }