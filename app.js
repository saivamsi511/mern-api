const express = require("express");
const nodemon = require("nodemon")
const morgan = require("morgan")
const { connectDb} = require("./database")
const  postsroute  = require("./routers/postrouter");
const app = express();
const studentroute = require("./routers/sturouter")
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config();
const PORT = process.env.PORT

// const PORT = 3000;
// const userrouter = require("./routers/postrouter")
app.use(cors);
app.use(express.json())
app.use(express.urlencoded({extended:true}));
// app.use("/",userrouter);
app.use(morgan("dev"))
app.use("/posts",postsroute)
app.use("/students",studentroute)

connectDb();

let students=[
    {name:"vamsi",rollno:521},
    {name:"sai",rollno:522},
    {name:"king",rollno:525}
]

app.get('/',(req,res)=>{
    res.send(students)
})


app.post("/users",(req,res)=>{
    let body = req.body();
    if(body!=null && body['name'] && body['rollno']){
        students.push(body);
        res.status(200).send(body);
    }else{
        res.status(400).send("Invalid Request Body");
    }
})

app.put("/:id",(req,res)=>{
    let rollno = req.params.id;
    let body=req.body;
    if (rollno!== null && body['name'] && body['rollno']){
        let index = (students.findIndex(x=>x.rollno == rollno));
        let student = structuredClone(students[index]);
        student['name'] = body['name'];
        students.splice(index,1,student);
        res.status(202).send(student)
    }else{
        res.status(400).send("Invalid Body")
    }
})


app.delete("/:id",(req,res) =>{
    let id = req.params.id;
    if (id!==null){
        let index = (students.findIndex(x=>x.rollno == id));
        const student = structuredClone(students[index]);
        students.splice(index,1);
        res.status(200).send(`Deleted the Record by ${id}`)
    }else{
        res.status(500).send("Invalid Id")
    }
})

app.listen(PORT,()=>{
    console.log(`server is good to see u on hello no http://localhost:${PORT}`)
})