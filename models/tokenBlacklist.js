const mongoose = require("mongoose")

const tokenblacklist = new mongoose.Schema({
    token:{ type:String, required:true},
    createdDate:{ type:Date, default: Date.now(),expires:'2h'}
})

const TokenDeleted = mongoose.model("tokendelete",tokenblacklist);
module.exports = TokenDeleted