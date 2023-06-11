import express from 'express'
const app = express()
import dotenv from 'dotenv'
import  cors from 'cors'
import morgan from 'morgan'
import connectDB from '../config/db.js'
import Authrouter from './routes/AuthController.js'
import categoryRouter from './routes/CategoryRouter.js'
import ProductRouter from './routes/ProductRoute.js'


let l = process.env.BRAINTREE_MERCHANDISE_ID

connectDB()

dotenv.config()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use('/api',Authrouter,categoryRouter,ProductRouter)


 app.listen(process.env.PORT,()=>{
    console.log(process.env.BRAINTREE_PUBLIC_KEY)
    console.log(process.env.BRAINTREE_MERCHANDISE_ID)
    console.log(process.env.BRAINTREE_PRIVATE_KEY)
    console.log(`listening on port ${process.env.PORT}`)
})
