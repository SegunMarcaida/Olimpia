const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");

const FieldSchema = require("./field").FieldSchema

const ReserveSchema = new mongoose.Schema({
    userId:{
      type: ObjectId,
      required: true
    },
    startDate: {
        type: Date,
        required:true
    },
    endDate: {
        type: Date,
        required: true
    },
    courtId: {
       type: ObjectId,
        required: true
    },
    isAccepted:{
        type: Boolean,
        default: false
    }
},{collection: 'reserves'});

const Reserves = mongoose.model('Reserves', ReserveSchema);

module.exports = Reserves;
