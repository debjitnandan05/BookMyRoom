import express from "express";
import { checkout, paymentVerification } from "../controllers/payment.controller.js";
import dotenv from "dotenv";
dotenv.config();
const paymentRouter = express.Router();

paymentRouter.post('/',checkout);
paymentRouter.post("/paymentverification",paymentVerification)
paymentRouter.get('/getkey',(req, res) => res.status(200).json({ key: process.env.RAZORPAY_API_KEY }))
export default paymentRouter;