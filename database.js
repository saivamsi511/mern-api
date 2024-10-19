const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();

const mongoURL = process.env.mongoURL


const connectDb = async ()=>{
    try{
        await mongoose.connect(`${mongoURL}`,{});
        console.log("mongoDB connected successfully,.");
    }catch(error){
        console.log(`error connecting with database : ${error}`)
    }
    // mongoose.connection.on(error=>)
}

module.exports = {
    connectDb
}