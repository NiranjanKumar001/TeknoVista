import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Subscription Name is required '],
        trim:true,
        minLength:2,
        maxLength:100,
    },
    price:{
        type:Number,
        required:[true,'Subscription price is required '],
        min:[0,'Price must be greater than 0'],
    },
    
}, { timestamps: true });