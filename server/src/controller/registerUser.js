import user from '../models/user.js'
import orders from '../models/orders.js'
import { comparePassword, hashPassword } from '../helper/bcrypt.js'
import jwt_token from 'jsonwebtoken'



function jwtToken(user) {
    const payload = 
    { email: user.email, password: user.password}
    const options={
        expiresIn:'1d'
    }

    const secretKey = "secretkey"
    const token = jwt_token.sign(payload,secretKey,options)

    return token
}



// ----Register User
export const regitserNewUser = async(req,res) =>{

    const {name,email,password,phone,address,answer} = req.body

    if(!name){
        return res.status(404).json({
            message: 'Please enter your name',
        })
    }

    if(!email){
        return res.status(404).json({
            message: 'Please enter your email address',
        })
    }

    if(!password){
        return res.status(404).json({
            message: 'Please enter your password',
        })
    }

    if(!address){
        return res.status(404).json({
            message: 'Please enter your address',
        })
    }

    if(!phone){
        return res.status(404).json({
            message: 'Please enter your Phone number',
        })
    }

    if(!answer){
        return res.status(404).json({
            message: 'Enter your Answer',
        })
    }

    // check for existing user

    const  existingUser = await user.findOne({ email:email})

    if(existingUser){
        return res.status(200).json({
            success:true,
            message: 'User already exists Please Procced to Login'
        })
    }

    // await user.findOne({email: email}).then((resposne)=>{
    //     return res.status(200).json({
    //         message: 'User already exists please Login',
    //         user: resposne
    //     })
    // }).catch((err)=>{
    //     console.log(err)
    // })

    // Create new User 

    const hashpassword = await hashPassword(password)
    await user.create({name:name,email:email,password:hashpassword,phone:phone,address:address,answer:answer}).then((resposne)=>{
        return res.status(200).json({
            success: true,
            message: 'User created successfully',
            user: resposne
        })
    }).catch((err)=>{
        return res.status(500).json({
            message: err
        })
    }); 

    
}



//  --- Login User

export const loginUser = async(req, res) =>{

    const {email,password} = req.body

    

    await user.findOne({email:email}).then((user)=>{

        console.log(password)
       const match = comparePassword(password,user.password)
       if(!match){
        return res.status(200).json(
            {success: false, message:"Invalid password"}
            )
       } 

       const generate_token = jwtToken(user)
       if(generate_token){

        return res.status(200).json({
            message:"Token generated",
            token: generate_token,
            user: user
        })

       }
       




    }).catch((err)=>{
        return res.status(403).json({
            success: false,
            message: err.message
        })
    })

}


export const forgotPassword = async(req,res) =>{


    const {email,answer,newPassword} =req.body

    // get the user Data 
    await user.findOne({email: email,answer:answer}).then(async(response)=>{
        if(response){
            const password = await hashPassword(newPassword)
            await user.findByIdAndUpdate(response._id,{password:password}).then((response)=>{
                return res.status(200).json({
                    success:true,
                    message:'Password updated successfully'
                })
            }).catch((err)=>{
                return res.status(500).json({
                    success:false,
                    message:`Couldn\'t update password ${err.message}`
                })
            })
        }
    }).catch((err)=>{
        return res.status(500).json({
            success:false,
            message:'Couldn\'t find the user'
        })
    })
    

}


export const getUsersOrder = async(req,res)=>{
    
    await orders.find({buyer:req.user._id})
    .populate('products','-photo')
    .populate('buyer','name')
    .then((response)=>{
        return res.status(200).json({
            success:true,
            orders:response
        })
    }) .catch((err)=>{
        return res.status(500).json({
            success:false,
            message:`Unable to Fetch Orders `
        })
    })

}