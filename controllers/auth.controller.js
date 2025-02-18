import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';

//what is a req body:-> req.body is an object containing data that comes from the client(post request)

export const signUp = async (req, res ,next) => {
    //signup logic
    //atomic operation:database operations that update the state are atomic .all or nothing.
    //insert either works compelte or not at all
    //update either works complete or not at all
    //you never get a half operation
    //reason why operations may not work :
    //one or more contraints violed
    //datatype mismatch
    //syntax error

    const session=await mongoose.startSession();
    session.startTransaction();

    try{
        //create user
        const {name ,email ,password }=req.body;

        //check if user already exists
        const existingUser=await User.findOne({email});

        if(existingUser){
            const error =new Error('User already exists');
            error.statusCode=409;
            //409->conflict
            throw error;
        }

        //hash password
        const salt =await bcrypt.genSalt(10);
        //salt->random string that is used to hash the password
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUsers =await User.create([{name,email,password:hashedPassword}],{session});

        const token =jwt.sign({userId:newUsers[0]._id },JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});

        await session.commitTransaction();

        session.endSession();

        //201->created
        res.status(201).json({
            success:true,
            message:'User created successfully',
            data:{
                token,
                user:newUsers[0],
            }
        });
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}
export const signIn = async (req, res ,next) => {
    //signin logic
    try {
        const {email,password}=req.body;
        const user= await User.findOne({email});

        if(!user){
            const error =new Error('User not found');
            error.statusCode=404;
            //404->not found
            throw error;
        }

        const isPasswordValid =await bcrypt.compare(password,user.password);


        if(!isPasswordValid){
            const error =new Error('Invalid password');
            error.statusCode=401;
            //401->unauthorized
            throw error;
        }

        const token =jwt.sign({userId:user._id },JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});


        res.status(200).json({
            success:true,
            message:'User signed in successfully',
            data:{
                token,
                user,
            }
        });

        

    } catch (error) {
        next(error);
    }
}
export const signOut = async () => {
    //sign out logic
    
}