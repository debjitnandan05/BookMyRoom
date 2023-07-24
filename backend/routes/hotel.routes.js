import express from "express";
import { addHotel,countByCity,deleteHotel,getAllHotel,getHotelById,updateHotel } from "../controllers/hotel.controller";
const hotelRouter = express.Router();

hotelRouter.post('/',addHotel);
hotelRouter.get('/',getAllHotel);
hotelRouter.get('/find/:id',getHotelById);
hotelRouter.put('/:id',updateHotel);
hotelRouter.delete('/:id',deleteHotel);
hotelRouter.get('/countByCity',countByCity);


export default hotelRouter;