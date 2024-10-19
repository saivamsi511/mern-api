const Student = require("../models/users");
const TokenDeleted = require("../models/tokenBlacklist")
const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config();

const getAllStudents = async (req, res) => {
    try {
        const posts = await Student.find();
        if (posts && posts.length == 0) res.status(204).send(posts)

        else res.status(200).send(posts);
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}



const singUpStudent = async (req, res) => {
    let body = req.body;
    const passwordhaash =await  bcrypt.hash(body.password,2);
    const student = new Student({
        email: body.email,
        username: body.username,
        password: passwordhaash
    });
    try {
        await student.save();
        res.status(201).json({
            email: body.email,
            username: body.username
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const loginStudent = async (req,res) => {
    const { email, password } = req.body;
    try {
        const student = await Student.findOne({ email });
        if (!student) {
            res.status(404).json({ message: `Hey you We don;t find your account with email : ${ email }, place singup` })
        }
        else {
        const isMatched = await bcrypt.compare(password,student.password);
        if(isMatched){
            const token = await jwt.sign({user:student._id},process.env.SECRET_KEY,{expiresIn:'1h',algorithm:'HS512'});
             res.status(200).json({email:email ,token:token,message: "Successfully login or verifeid" })
        }
        else res.status(404).json({message: "invalid Email id or password, please enter correct details" });
        }
    }catch(err){
        res.status(500).json({message:"Server Error While Loggingin Pleasse try again"})
    }
}

const logoutStudent = async(req,res) =>{
    const token = req.headers['authorization'].split(" ")[1];
    try{
        await TokenDeleted.create({token});
        res.status(200).json({message:"logout successfully"})
    }catch(err){
        res.status(500).json({message:"Error processing logout,please try again"})
    }
}


module.exports = {
    singUpStudent,
    getAllStudents,
    loginStudent,
    logoutStudent
}