import express from 'express'
const app = express()
import dotenv from 'dotenv'
import  cors from 'cors'
import morgan from 'morgan'
import connectDB from '../config/db.js'
import Authrouter from './routes/AuthController.js'


connectDB()

dotenv.config()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use('/api',Authrouter)


 app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`)
})
