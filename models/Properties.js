const mongoose = require('mongoose');
const PropertyRouter = require('../routes/PropertyRouter');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


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
    comments:[commentSchema]
},{
    timestamps:true
})

const Property = mongoose.model('Property',PropertySchema);

module.exports = Property;