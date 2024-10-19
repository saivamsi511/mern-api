const Student = require("../models/users");
const TokenDeleted = require("../models/tokenBlacklist")
const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config();

const validateToken = async(req,res,next)=>{
    let token = req.headers['authorization'].split(" ")[1];
    let blacklistedtoken = TokenDeleted.findOne({token});
    if(!blacklistedtoken){
    const isVerified = jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err) res.status(401).json({message:"Invalid Token"})
        else{
            req.user = user;
            next();
}
    })
}else{
    res.status(401).json({message:"You are already Loged out"})
}
}

module.exports = {
    validateToken
}