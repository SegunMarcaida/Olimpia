const mongoose = require('mongoose');



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
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    admin: {
        type:String,
        required: true
    },
    id: {
        type:String,
        default: mongoose.Types.ObjectId
    }
},{collection: 'fields'});
const Field = mongoose.model('Field', FieldSchema);
module.exports = {
    Field:Field,
    FieldSchema: FieldSchema
}

