

const jwt=require("jsonwebtoken")

require("dotenv").config()

const Authentication =(req,res,next)=>{


    const token =req.headers.authorization.split(" ")[0]


 

    if(token){

        const decoded=jwt.verify(token,process.env.key)

        if(decoded){

            const userID=decoded.userID

            req.body.userID=userID

            next()
        }else{
            res.send("please Login or not authorized")
        }
    }else{
        res.send("YOu are not authorized")
    }
}

module.exports={
Authentication

}