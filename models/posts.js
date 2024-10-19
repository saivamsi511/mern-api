const mongoose = require("mongoose")


const postschema = new mongoose.Schema({

    name:{type:String,required:true},
    age:{type:Number,required:true},
    rollno:{type:String,required:true},
    mobileno:{type:String,required:true},
    gender:{type:String,required:true}
})


const post = mongoose.model("users",postschema)

module.exports = post;