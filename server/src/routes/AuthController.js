import express from 'express'
const router = express.Router()
import { regitserNewUser,loginUser,forgotPassword} from '../controller/registerUser.js'
import { requireSignIn , isAdmin } from '../middlewares/authmiddleware.js'


router.post('/register', regitserNewUser)

router.post('/login', loginUser)

router.get('/user-auth',requireSignIn,(req,res)=>{
    return res.status(200).json({
        ok: true,
    })
})

// admin route
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    return res.status(200).json({
        ok: true,
    })
})

router.put('/change-password',forgotPassword)


export default router