

const mongoose=require("mongoose")

const userSchema=mongoose.Schema({

    name :String,
email :String,
gender:String,
password : String
})

const userModel=mongoose.model("user",userSchema)

module.exports={

    userModel
}