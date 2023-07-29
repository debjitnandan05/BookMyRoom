import express from 'express';

import authRouter from './routes/auth.routes.js';
import hotelRouter from './routes/hotel.routes.js';
import roomRouter from './routes/room.routes.js';
import userRouter from './routes/user.routes.js';
import cors from 'cors';
import paymentRouter from './routes/payment.routes.js';


export const app = express();


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


