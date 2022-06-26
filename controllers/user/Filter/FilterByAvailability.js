const {MongoClient, ObjectId} = require("mongodb");
const {mongoURI: url} = require("../../../config/keys");
const notAvailableCourts = require("../../../utils/notAvailableCourts")
const allFields = require("../../../utils/allFields")
const getPos = require("../../../utils/getPos");
module.exports = function () {
    return async function (req, res) {
        console.log(req.body)
        let {startDate,endDate} = req.body
        startDate = new Date(startDate)
        endDate = new Date(endDate)
        let startDay = startDate.getDay()
        let endDay = endDate.getDay();
        let startHours = startDate.getHours()
        let endHours = endDate.getHours()
        let startMinutes = startDate.getMinutes()
        let endMinutes = endDate.getMinutes()
        let startPos = getPos(startHours, startMinutes)
        let endPos = getPos(endHours, endMinutes)
        const db = await MongoClient.connect(url);
        let dbo = db.db();
        let fields = await dbo.collection("fields").find().toArray();
        await db.close();
       let fieldsAux = [];
        fields.map(field=>{
            let reserves = field.reserves
            let  isAvailable = true;
            switch (startDay) {
                case 0:
                    for (let i = startPos; i <= endPos; i++) {
                        if(reserves.Sunday.time[i]=== true){
                            isAvailable = false
                        }
                    }
                    if (isAvailable){
                        fieldsAux.push(field)
                    }
                    break;
                case 1:
                    for (let i = startPos; i <= endPos; i++) {
                        if(reserves.Monday.time[i]=== true){
                            isAvailable = false
                        }
                    }
                    if (isAvailable){
                        fieldsAux.push(field)
                    }
                    break;
                case 2:
                    for (let i = startPos; i <= endPos; i++) {
                        if(reserves.Tuesday.time[i]=== true){
                            isAvailable = false
                        }
                    }
                    if (isAvailable){
                        fieldsAux.push(field)
                    }
                    break;
                case 3:
                    for (let i = startPos; i <= endPos; i++) {
                        if(reserves.Wednesday.time[i]=== true){
                            isAvailable = false
                        }
                    }
                    if (isAvailable){
                        fieldsAux.push(field)
                    }
                    break;
                case 4:
                    for (let i = startPos; i <= endPos; i++) {
                        if(reserves.Thursday.time[i]=== true){
                            isAvailable = false
                        }
                    }
                    if (isAvailable){
                        fieldsAux.push(field)
                    }
                    break;
                case 5:
                    for (let i = startPos; i <= endPos; i++) {
                        if(reserves.Friday.time[i]=== true){
                            isAvailable = false
                        }
                    }
                    if (isAvailable){
                        fieldsAux.push(field)
                    }
                    break;
                case 6:
                    for (let i = startPos; i <= endPos; i++) {
                        if(reserves.Saturday.time[i]=== true){
                            isAvailable = false
                        }
                    }
                    if (isAvailable){
                        fieldsAux.push(field)
                    }
                    break;
            }


        })

        res.send(200, {msg:"find this courts", fieldsAux})

    }

}