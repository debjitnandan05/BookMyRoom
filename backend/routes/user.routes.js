import express from 'express';
const userRouter = express.Router();
import { getAllUser,getUserById } from '../controllers/user.controller.js';

userRouter.get('/',getAllUser);
userRouter.get('/:id',getUserById);



export default userRouter;