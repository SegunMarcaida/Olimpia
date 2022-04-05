const mongoose = require("mongoose");

const FieldSchema = require("./field").FieldSchema

const ReserveSchema = new mongoose.Schema({
   court:{
       type: FieldSchema,
       required: true
   },
    user:{
      type: String,
      required: true
    },
    startDate: {
        type: Number,
        required:true
    },
    endDate: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
},{collection: 'reserves'});

const Reserves = mongoose.model('Reserves', ReserveSchema);

module.exports = Reserves;
