
const express=require("express")
const jwt=require('jsonwebtoken')
require("dotenv").config()
const bcrypt=require("bcrypt")
const {userModel}=require("../models/userModel")
const userRoute=express.Router()


userRoute.post("/register",async(req,res)=>{

    const {name,email,gender,password}=req.body

    try{

        bcrypt.hash(password,8,async(err,hash)=>{
   
            const user=new userModel({name,email,gender,password:hash})

            await user.save()

            res.send("successfully Registered")
        })
    }catch(err){
 
        console.log(err)

        res.send("Invalid")
    }
})

userRoute.post("/login",async(req,res)=>{

    const {email,password}=req.body

    try{

        const user=await userModel.find({email})

        if(user.length>0){
            bcrypt.compare(password,user[0].password,function(err,result){

                if(result){

                    const token=jwt.sign({mode:"social"},process.env.key)


                    res.send({"msg":"login successfull","token":token})
                }else{

                    res.send("wrong crediential")
                }
            })


        }
    }catch(err){

        console.log(err)
        res.send("Something is wrong try again")
    }
})

module.exports={

    userRoute
}