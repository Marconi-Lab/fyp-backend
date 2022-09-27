const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    // userName:{
    //     required:true,
    //     type: String,
    // },
    email: {
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String
    },
    role:{
        type: String,
        default: 'basic',
        enum: ['basic', 'supervisor', 'admin']
    },
    accessToken: {
        type: String
    }
})
module.exports = mongoose.model('user', dataSchema)
