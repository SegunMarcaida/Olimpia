const {MongoClient} = require("mongodb");
const {mongoURI: url} = require("../../../config/keys");
const notAvailableCourts = require("../../../utils/notAvailableCourts")
const allFields = require("../../../utils/allFields")
module.exports = function () {
    console.log("1")
    return async function (req, res) {
        let {startDate,endDate} = req.body
        console.log( typeof startDate)
        console.log(typeof endDate)
        startDate = Date.parse(startDate)
        endDate = Date.parse(endDate)
        let courts1 = [];
        let available = [];

        notAvailableCourts(startDate,endDate).then((courts)=>{
            console.log("courts:"+ courts)
            if (courts !== null){
                courts.map((court) => {
                    courts1.push(court._id);
                })
            }
            console.log("courts1:"+ courts1)
            allFields().then((courts2)=>{
                console.log("courts2:"+ courts2)
                for (let i = 0; i < courts2.length ; i++) {
                    let isAvailable = true;
                    for(let j = 0; j <courts1.length; j++){
                        if(courts2[i]._id == courts1[i] ){
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