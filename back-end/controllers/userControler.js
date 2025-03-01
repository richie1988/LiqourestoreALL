import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user
const loginUser = async (req,res)=> {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User doesent exist"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid user credentials"});
        }
        const token = createToken(user._id);
        res.json({success:true,token});
    } catch (error) {
        res.json({success:false,message:"Server error"});
  }
}

 // create token
    const createToken = (id)=>{
        return jwt.sign({id},process.env.JWT_SECRET,{
            expiresIn:3600
        });
    }

// rigister user
const registerUser = async(req,res)=>{
    const[name,password,email]=req.body;
    try {
        // check if the user alredy exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"});
        }
        // validate email
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid email"});
        }
        // hash password
        if(password.length<8){
            return res.json({success:false,message:"Password must be at least 8 characters"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        // create user
        const newUser = await userModel({
            name:name,
            email:email,
            password:hashedPassword
        });
        const user = await newUser.save();
        // create token
        const token = createToken(user._id);
        res.json({success:true,token});

    } catch (error) {
        res.json({success:false,message:"Server error"});
    }

}

export {loginUser,registerUser}