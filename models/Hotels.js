const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const HotelSchema = new Schema({
    hotel_title:{
        type:String,
        required:true
    },
    hotel_location:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    Price:{
        type:Number,
        required:true
    },
    Bathrooms:{
        type:Number,
    },
    Balconies:{
        type:Number,
    },
    featured:{
        type:Boolean,
        default:false
    },
    Breakfast:{
        type:Boolean,
        default:false
    },
    description:{
        type:String
    }
},{
    timestamps:true
})

const Hotel = mongoose.model('Hotel',HotelSchema);

module.exports = Hotel;