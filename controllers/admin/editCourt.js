
const {MongoClient, ObjectId} = require("mongodb");
const {Field} = require("../../models/field").Field;
const url = require('../../config/keys').mongoURI
module.exports = function () {
    return async function (req, res) {
        const {name, sport, location, description, amount, price,adminId} = req.body;
        const newValues ={};
        if (name) {newValues["name"]=name}
        if (sport) {newValues["sport"]=sport}
        if (location) {newValues["location"]=location}
        if (description) {newValues["description"]=description}
        if (amount) {newValues["amount"]=amount}
        if (price) {newValues["price"]=price}
        console.log(newValues);


          await  MongoClient.connect(url, async function (err, db) {
              if (err) throw err;
              let dbo = db.db();
              let query = {name:name,adminId:new ObjectId(adminId)};
              await dbo.collection("fields").updateOne(query, {$set:newValues},function (err, result) {
                  if (err) throw err;
                 res.send(201,{msg:'court updated'})
                  db.close()
              });
          });
        }
    }