import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
        const {name,email,password}=req.body;

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



        await session.commitTransaction();
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}
export const signIn = async (req, res ,next) => {
    //signin logic

}
export const signOut = async (req, res ,next) => {
    //signout logic

}