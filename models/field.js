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
    reserves:{
        Monday:{
            openHour: {
                type:Number ,
                required: true

            },closeHour: {
                type:Number ,
                required: true
            },
            time:{
                type: [Boolean],
                required: true
            },
        },
        Tuesday: {
            openHour: {
                type: Number,
                required: true

            }, closeHour: {
                type: Number,
                required: true
            },
            time: {
                type: [Boolean],
                required: true
            },
        },
            Wednesday:{
                openHour: {
                    type:Number ,
                    required: true

                },closeHour: {
                    type:Number ,
                    required: true
                },
                time:{
                    type: [Boolean],
                    required: true
                },
            },
                Thursday:{
                    openHour: {
                        type:Number ,
                        required: true

                    },closeHour: {
                        type:Number ,
                        required: true
                    },
                    time:{
                        type: [Boolean],
                        required: true
                    },
                },
                    Friday:{
                        openHour: {
                            type:Number ,
                            required: true

                        },closeHour: {
                            type:Number ,
                            required: true
                        },
                        time: {
                            type: [Boolean],
                            required: true
                            }
                        },
                        Saturday:{
                            openHour: {
                                type:Number ,
                                required: true

                            },closeHour: {
                                type:Number ,
                                required: true
                            },
                            time:{
                                type: [Boolean],
                                default: true
                            },
                        },
                            Sunday:{
                                openHour: {
                                    type:Number ,
                                    required: true

                                },closeHour: {
                                    type:Number ,
                                    required: true
                                },
                                time:{
                                    type: [Boolean],
                                    required: true
                                }
                            },
    }
},{collection: 'fields'});
const Field = mongoose.model('Field', FieldSchema);
module.exports = {
    Field:Field,
    FieldSchema: FieldSchema
}

