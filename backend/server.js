import { app } from "./app.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import mongoose from 'mongoose';
dotenv.config();

const PORT = process.env.PORT || 5000;

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

const dburl = process.env.DB_URL;
 
mongoose.connect(dburl)  
.then(
    ()=>{console.log('DB is conneted')}
)
.catch((err)=>console.log(err))

app.listen(PORT,()=>{
    console.log(`Your app is listen on port ${PORT}`);
})