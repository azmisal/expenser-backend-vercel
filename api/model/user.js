const mongoose = require("mongoose");
const {v4:uuidv4} = require("uuid");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: uuidv4, 
        unique: true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        match: /^\S+@\S+\.\S+$/
    },
    password:{
        type:String,
        required:true
    },
    monthlyLimit:{
        type:Number,
        required:true
    }
    
});
module.exports = mongoose.model('userdata',userSchema)
