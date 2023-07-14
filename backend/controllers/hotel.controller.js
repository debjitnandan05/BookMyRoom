import Hotel from "../models/hotel.model";

// add hotel
export const addHotel = async (req,res,next)=>{
    try {
        const newHotel = await Hotel(req.body);
        await newHotel.save();
        return res.status(201).json({newHotel});
    } catch (error) {
        return console.log(error)
    }
}

// update hotel
export const updateHotel = async (req,res,next)=>{
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set : req.body}, {new:true});
        return res.status(200).json(updatedHotel);
    } catch (error) {
        return console.log(error)
    }
}

// get all hotel
export const getAllHotel = async (req,res,next)=>{
    try {
        const hotel = await Hotel.find();
        if(!hotel){
            return res.status(404).json({message : "No hotel found"});
        }
        else{
            return res.status(200).json(hotel);
        }
    } catch (error) {
        return console.log(error);            
    }
}

// get hotel by id
export const getHotelById = async (req,res,next)=>{
    try {
        const hotel = await Hotel.findById(req.params.id);
        if(!hotel){
            return res.status(404).json({message : "No hotel found"});
        }
        else{
            return res.status(200).json(hotel);
        }
    } catch (error) {
        return console.log(error)
    }
}

// delete hotel
export const deleteHotel = async (req,res,next)=>{
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        return res.status(200).json({message : "Hotel with this id is deleted successfully"});        
    } catch (error) {
        return console.log(error)
    }
}       



