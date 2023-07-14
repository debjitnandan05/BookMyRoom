import Room from "../models/room.model";
import Hotel from "../models/hotel.model";

// Create new rooms
export const addRoom = async (req,res,next)=>{
    const hotelId = req.params.id; // get hotel id
    try {
        const newRoom = await Room(req.body); // create new room
        await newRoom.save(); // save new room

        try {
            await Hotel.findByIdAndUpdate(hotelId,{$push : {rooms : newRoom._id}},{new:true}); // push the new rooms id to specific hotel 
        } catch (error) {
            next(error)
        } 

        return res.status(201).json({newRoom});
    } catch (error) {
        return console.log(error)
    }
}

// update room
export const updateRoom = async (req,res,next)=>{
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set : req.body}, {new:true});
        return res.status(200).json(updatedRoom);
    } catch (error) {
        return console.log(error)
    }
}

// get all hotel
export const getAllRoom = async (req,res,next)=>{
    try {
        const room = await Room.find();
        if(!room){
            return res.status(404).json({message : "No rooms found"});
        }
        else{
            return res.status(200).json(room);
        }
    } catch (error) {
        return console.log(error);            
    }
}

// get hotel by id
export const getRoomById = async (req,res,next)=>{
    try {
        const room = await Room.findById(req.params.id);
        if(!room){
            return res.status(404).json({message : "No room found with this id"});
        }
        else{
            return res.status(200).json(room);
        }
    } catch (error) {
        return console.log(error)
    }
}

// delete hotel
export const deleteRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelId;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$pull : {rooms : req.params.id}},{new:true}); // pull the deleted rooms id from specific hotel 
        } catch (error) {
            next(error)
        } 
        return res.status(200).json({message : "Room with this id is deleted successfully"});        
    } catch (error) {
        return console.log(error)
    }
}       



