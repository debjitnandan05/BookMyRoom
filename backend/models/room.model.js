import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    roomNumbers : {
        type : [{
            number : Number,
            unavailabe : { type : [Date] }
        }],
    },
    maxCount : {
        type : Number,
        required : true
    },
    desc : {
        type : String,
        required : true
    }
   
})

export default mongoose.model('Room',roomSchema);