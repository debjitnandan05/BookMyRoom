import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';
import hotelRouter from './routes/hotel.routes';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended : true})); 
app.use(express.json());

// database add
const dburl = process.env.DB_URL;
 
mongoose.connect(dburl)  
.then(
    ()=>{console.log('DB is conneted')}
)
.catch((err)=>console.log(err))

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/hotel',hotelRouter);

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