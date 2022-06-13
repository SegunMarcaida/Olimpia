const mongoose = require('mongoose');
const PointSchema = require('./Point')
const {ObjectId} = require("mongodb");
const UserSchema = require('./User').UserSchema


const FieldSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sport: {
        type: String,
        required: true
    },
    location: {
        type: PointSchema,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    adminId: {
        type:ObjectId,
        required: true
    },
    qualifications:{
        type: [Number],
        required: true
    },
    openHour: {
      type:Number ,
      required: true

    },closeHour: {
      type:Number ,
      required: true
    },
},{collection: 'fields'});
const Field = mongoose.model('Field', FieldSchema);
module.exports = {
    Field:Field,
    FieldSchema: FieldSchema
}

