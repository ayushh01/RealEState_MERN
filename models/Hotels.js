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
    featured:{
        type:Boolean,
        default:false
    },
    Breakfast:{
        type:Boolean,
        default:false
    },
    Wifi:{
        type:Boolean,
        default:false
    },
    Pool:{
        type:Boolean,
        default:false
    },
    Spa:{
        type:Boolean,
        default:false
    },
    Pets:{
        type:Boolean,
        default:false
    },
    AC:{
        type:Boolean,
        default:false
    },
    Restaurant:{
        type:Boolean,
        default:false
    },
    Hotel_bar:{
        type:Boolean,
        default:false
    },
    Gym:{
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