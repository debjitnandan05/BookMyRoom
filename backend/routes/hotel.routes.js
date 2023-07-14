import express from "express";
import { addHotel,deleteHotel,getAllHotel,getHotelById,updateHotel } from "../controllers/hotel.controller";
const hotelRouter = express.Router();

hotelRouter.post('/',addHotel);
hotelRouter.get('/',getAllHotel);
hotelRouter.get('/:id',getHotelById);
hotelRouter.put('/:id',updateHotel);
hotelRouter.delete('/:id',deleteHotel);


export default hotelRouter;