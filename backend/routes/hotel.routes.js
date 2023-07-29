import express from "express";
import { addHotel,countByCity,deleteHotel,getAllHotel,getHotelById,getHotelRooms,updateHotel } from "../controllers/hotel.controller.js";
const hotelRouter = express.Router();

hotelRouter.post('/',addHotel);
hotelRouter.get('/',getAllHotel);
hotelRouter.get('/find/:id',getHotelById);
hotelRouter.put('/:id',updateHotel);
hotelRouter.delete('/:id',deleteHotel);
hotelRouter.get('/countByCity',countByCity);
hotelRouter.get('/rooms/:id',getHotelRooms);


export default hotelRouter;