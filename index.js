const express=require("express")

const {connection}=require("./config/db")
const app=express()
const cors=require('cors')
require("dotenv").config()
const {userRoute}=require("./router/userRoute")

const {Authentication}=require("./middleware/Authenticate")

const { postRouter}=require("./router/postRoute")
app.use(express.json())

app.use(cors())

app.get("/",(req,res)=>{

   res.send("this is my socail api")
})

app.use("/users",userRoute)

app.use(Authentication)

app.use("/post",postRouter)
app.listen(process.env.port,async ()=>{


    try{

        await connection

        console.log("connected to Db")
    }catch(err){

        console.log(err,"unable to connect")
    }
    console.log("server is running")
})

