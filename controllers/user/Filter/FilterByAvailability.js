const {MongoClient, ObjectId} = require("mongodb");
const {mongoURI: url} = require("../../../config/keys");
const notAvailableCourts = require("../../../utils/notAvailableCourts")
const allFields = require("../../../utils/allFields")
module.exports = function () {
    return async function (req, res) {
        console.log(req.body)
        let {startDate,endDate} = req.body
        console.log( "1   " +typeof startDate)
        console.log("1     "+typeof endDate)
        console.log("2   " + startDate)
        console.log("2    "+ endDate)
        //startDate = Date.parse(startDate)
        //endDate = Date.parse(endDate)
        console.log("3   "+ typeof startDate)
        console.log("3   " +typeof endDate)
        console.log("4   " + startDate)
        console.log("4    "+ endDate)
        let courts1 = [];
        let available = [];

        notAvailableCourts(startDate,endDate).then((courts)=>{
            console.log("courts:"+ courts)
            if (courts !== null){
                courts.map((court) => {
                    courts1.push(court.courtId);
                })
            }
            console.log("courts1:"+ courts1)
            allFields().then((courts2)=>{
                console.log("courts2:"+ courts2)
                for (let i = 0; i < courts2.length ; i++) {
                    let isAvailable = true;
                    for(let j = 0; j <courts1.length; j++){
                        let id1= courts1[j].toString();
                        let id2 = courts2[i]._id.toString()
                        console.log("1   " + id1 )
                        console.log("2   " + id2)
                        console.log(typeof id1)
                        console.log(typeof id2)
                        if(id1 == id2 ){
                            console.log("equals")
                            isAvailable = false
                        }
                    }
                    if (isAvailable){
                        available.push(courts2[i]);
                    }
                }
                res.send(200,available)
            })
        })


    }

}