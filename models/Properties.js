const mongoose = require('mongoose');
const PropertyRouter = require('../routes/PropertyRouter');
const Schema = mongoose.Schema;




const PropertySchema = new Schema({
    house_title:{
        type:String,
        required:true
    },
    house_location:{
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
    Area:{
        type:Number,
        required:true
    },
    Spacing:{
        type:String,
    },
    Bedrooms:{
        type:Number,
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
    description:{
        type:String
    }
},{
    timestamps:true
})

const Property = mongoose.model('Property',PropertySchema);

module.exports = Property;