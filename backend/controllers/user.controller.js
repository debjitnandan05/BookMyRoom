import User from "../models/user.model.js";

export const getAllUser = async (req,res,next)=>{
    let users;
    try {
        users = await User.find();
        if(!users){
            return res.status(404).json({message : "No user found"})
        }
        else{
            return res.status(200).json({users});
        }
    } catch (error) {
        return console.log(error);
    }
}

export const getUserById = async(req,res,next)=>{
    const userId = req.params.id;
    let user;
    try {
        user = await User.findById(userId);
        if(!user){
            return res.status(400).json({message : 'Invalid User'});
        }
        else{
            res.status(200).json({user});
        }
        
    } catch (error) {
        return console.log(error)
    }
}