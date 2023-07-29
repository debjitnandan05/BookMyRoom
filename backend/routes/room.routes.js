import express from "express";
import { addRoom, deleteRoom, getAllRoom, getRoomById, updateRoom, updateRoomAvailability } from "../controllers/room.controller.js";

const roomRouter = express.Router();

roomRouter.post('/:id',addRoom);
roomRouter.get('/',getAllRoom);
roomRouter.get('/:id',getRoomById);
roomRouter.put('/:id',updateRoom);
roomRouter.delete('/:id/:hotelId',deleteRoom);
roomRouter.put("/availability/:id", updateRoomAvailability);


export default roomRouter;