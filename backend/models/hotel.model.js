import mongoose from "mongoose";

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    photos : {
        type : [String],
        required : true
    },
    phone : {
        type : Number,
        required : true,
        minlength : 10
    },
    desc : {
        type : String,
        required : true
    },
    rating : {
        type : String,
        min: 0,
        max:5
    },
    rooms : {
        type : [String],
        required : true
    },      
    cheapestPrice : {
        type : Number,
        required : true
    },
    featured : {
        type : Boolean,
        default : false
    },
   
})

export default mongoose.model('Hotel',hotelSchema);