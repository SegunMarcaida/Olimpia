const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");

const FieldSchema = require("./field").FieldSchema

const ReserveSchema = new mongoose.Schema({
    userId:{
      type: ObjectId,
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
    courtId: {
       type: ObjectId,
        required: true
    }
},{collection: 'reserves'});

const Reserves = mongoose.model('Reserves', ReserveSchema);

module.exports = Reserves;
