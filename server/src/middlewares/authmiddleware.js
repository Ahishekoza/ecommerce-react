import jwt_token from "jsonwebtoken";
import user from '../models/user.js'

export const requireSignIn = (req,res,next) =>{

    try {
        const secretKey = "secretkey"
        const token = req.headers.authorization
        const decode = jwt_token.verify(token,secretKey)
        req.user = decode
        next()
    } catch (error) {
        console.log(error)
    }


}



export const isAdmin = async(req, res, next) =>{

    
    try{
        await  user.findOne(req.user._id).then((user) =>{
            if(user.role !==1){
                return res.status(403).json({message:'User is not authorized'})
            }
            else{
                next()
            }
        })
    }
    catch(error) {
        return res.status(403).json({
            message:'Error while getting user'
        })
    }

}
