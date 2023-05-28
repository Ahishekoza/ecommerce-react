import mongoose from 'mongoose';

const connectDB = async() =>{
    try {
        const conn = await mongoose.connect('mongodb+srv://Abhishek:4Wu0eDqs16Zke6tz@cluster0.wvueacp.mongodb.net/?retryWrites=true&w=majority')
        console.log(`mongo host running on ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

export default connectDB