import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products:[
        {
            type: mongoose.Types.ObjectId,
            ref:'Products',
        }
    ],
    payment:{
        
    },
    buyer:{
        type: mongoose.Types.ObjectId,
        ref:'Users',
    },
    status:{
        type: String,
        default: "Not Process",
        emu: ["Not Process","Processing","Shipped","delivered","cancel"]
    }


},{timestamps:true})

export default mongoose.model('Orders', orderSchema);