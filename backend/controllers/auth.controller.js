import User from "../models/user.model";
import bcrypt from 'bcryptjs';  


export const signup = async(req,res,next)=>{
    const {name,email,password} = req.body;
    const hashPassword = bcrypt.hashSync(password);
 
     let existingUser;
     try {
         existingUser = await User.findOne({email});
         if(existingUser){
             return res.status(400).json({message : 'User is already Present'});
         }
         else{
             const newUser = new User({
                 name,
                 email,
                 password : hashPassword
                })
             
                try {
                 await newUser.save();
                 return res.status(201).json({newUser});
                } catch (error) {
                 return console.log(error)
                }
         }
         
     } catch (error) {
         return console.log(error)
     } 
 
 }
 
 export const login = async (req,res,next)=>{
     const {email,password} = req.body;
     let existingUser;
 
     try {
         existingUser = await User.findOne({email});
         if(!existingUser){
             return res.status(400).json({message : 'Invalid User'});
         }
         else{
             const isPasswordMatched = bcrypt.compareSync(password,existingUser.password);
             if(!isPasswordMatched){
                 res.status(400).json({message : "Incorrect Password"})
             }
             else{
                 res.status(200).json({message : "You are logged in"});
             }
         }
     } catch (error) {
         return console.log(error)
     }
 }