import jwt_token from "jsonwebtoken";

const requireSignIn = (req,res,next) =>{

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


export default requireSignIn