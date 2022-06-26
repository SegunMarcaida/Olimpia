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
                default: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,]
            }

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
                default: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,]
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
                    default: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,]
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
                        default: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,]
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
                            default: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,]
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
                                default: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,]
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
                                    default: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,]
                                }
                            },
    }
},{collection: 'fields'});
const Field = mongoose.model('Field', FieldSchema);
module.exports = {
    Field:Field,
    FieldSchema: FieldSchema
}

