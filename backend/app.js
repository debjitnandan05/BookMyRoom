import express from 'express';
import Razorpay from "razorpay";
import dotenv from "dotenv";
import mongoose from 'mongoose';
dotenv.config();
import authRouter from './routes/auth.routes.js';
import hotelRouter from './routes/hotel.routes.js';
import roomRouter from './routes/room.routes.js';
import userRouter from './routes/user.routes.js';
import cors from 'cors';
import paymentRouter from './routes/payment.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;


// database connection
const dburl = process.env.DB_URL;
 
mongoose.connect(dburl)  
.then(
    ()=>{console.log('DB is conneted')}
)
.catch((err)=>console.log(err))

// payment instance
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});


app.use(cors());
app.use(express.urlencoded({extended : true})); 
app.use(express.json());



app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/hotels',hotelRouter);
app.use('/api/room',roomRouter)
app.use('/api/payment',paymentRouter)


// for handel error
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});


app.listen(PORT,()=>{
  console.log(`Your app is listen on port ${PORT}`);
})


