const {MongoClient} = require("mongodb");
const {mongoURI: url} = require("../config/keys");

module.exports = async function(startDate, endDate){
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
     return dbo.collection("reserves").find(query).toArray();
    }


