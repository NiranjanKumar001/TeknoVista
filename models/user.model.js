import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,'User Name is required '],
        trim:true,
        minLength:2,
        maxLength:50,
    },
    email:{
        type:String,
        required:[true,'Email is required '],
        trim:true,
        unique:true,
        lowercase:true,
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
    },
    password:{
        type:String,
        required:[true,'Password is required '],
        trim:true,
        minLength:6,
    }
} ,{timestamps:true}); // this will add created at and updated at fields in the database

const User = mongoose.model('User',userSchema);

export default User;

