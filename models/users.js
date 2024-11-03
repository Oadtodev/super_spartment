const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true,
    },
    room:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    citizenid:{
        type:String,
        required:true,
    },
    tel:{
        type:String,
        required:true,
    },
    carinfo:{
        type:String,
        required:true,
    },
   createdAt:{
    type:Date,
    default:Date.now,
   }
})


module.exports = mongoose.model('users',usersSchema);

