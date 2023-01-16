const express=require("express")

const {postModel}=require("../models/postsModel")


const postRouter=express.Router()

postRouter.get("/",async(req,res)=>{

   
const notes=await postModel.find()

res.send(notes)

})

postRouter.post("/create",async(req,res)=>{


    const payload =req.body

    try{
        const new_posts=new postModel(payload)

        await new_posts.save()

        res.send({"msg":"post has been save"})
    }catch(err){

        res.send({"msg":"invalid"})
    }
})
postRouter.patch("/update/:id",async(req,res)=>{

    const payload=req.body


        const id=req.params.id

        const post=await postModel.findOne({"_id":id})

        const userID_who_req=req.body.userID
        const userID_post=post.userID
        try{

            if(userID_who_req!==userID_post){
            
                res.send({"msg":"Not authorized"})
            }else{

                await postModel.findByIdAndUpdate({"_id":id},payload)

                res.send({"msg":"post is updated"})
            }
        
        }catch(err){

            console.log(err)

            res.send("please check you are authorized or not to update")
        }
   
})


postRouter.delete("/delete/:id",async(req,res)=>{

    const payload=req.body


        const id=req.params.id

        const post=await postModel.findOne({"_id":id})

        const userID_who_req=req.body.userID
        const userID_post=post.userID
        try{

            if(userID_who_req!==userID_post){
            
                res.send({"msg":"Not authorized"})
            }else{

                await postModel.findByIdAndDelete({"_id":id},payload)

                res.send({"msg":"post is deleted"})
            }
        
        }catch(err){

            console.log(err)

            res.send("somewthing went wrong check You are authoreized or not")
        }
   
})
module.exports={

    postRouter
}

