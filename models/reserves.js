const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");

const FieldSchema = require("./field").FieldSchema

const ReserveSchema = new mongoose.Schema({
    courtName: {
        type: String,
        required: true,
    },
    userId:{
      type: ObjectId,
      required: true
    },
    adminId:{
        type: ObjectId,
        required: true
    },
    courtId: {
       type: ObjectId,
        required: true
    },
    isAccepted:{
        type: Boolean,
        default: false
    },
    isRejected:{
      type: Boolean,
      default:false
    },
    startTime:{
        type:Date,
        required: true
    },
    endTime:{
        type:Date,
        required: true
    },

},{collection: 'reserves'});

const Reserves = mongoose.model('Reserves', ReserveSchema);

module.exports = Reserves;
