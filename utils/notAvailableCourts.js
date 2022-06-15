const {MongoClient} = require("mongodb");
const {mongoURI: url} = require("../config/keys");
const Reserves = require("../models/reserves");

module.exports = async function(startDate, endDate){
    console.log(startDate)
    console.log(endDate)
    const db = await MongoClient.connect(url);
        let dbo = db.db();
        let query = {
            $or: [{
                $and: [
                    {
                        startDate: {'$lte': startDate}
                    },
                    {
                        endDate: {'$gte': startDate}
                    }

                ]
            }, {
                $and: [
                    {
                        startDate: {'$gte': startDate}
                    },
                    {
                        endDate: {'$lte': endDate}
                    }
                ]
            }, {
                $and: [
                    {
                        startDate: {'$lte': endDate}
                    },
                    {
                        endDate: {'$gte': endDate}
                    }
                ]
            }

            ]
        };
        let res;
      await Reserves.find(query).then(result=>{
         console.log("result:"+ result)
         res=result
     });
     console.log(res)
     await db.close()
    return res

    }


