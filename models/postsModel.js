
const mongoose=require("mongoose")

const postSchema=mongoose.Schema({

    title : String,
    body:String,
    device:String,
    userID:String
})

const postModel=mongoose.model("posts",postSchema)

module.exports={
postModel
}