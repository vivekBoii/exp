const mongoose = require('mongoose'); 

var productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter Descrription"],
    },
    price:{
        type:Number,
        required:[true,"Please Enter Productr Price"],

    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            },
        }
    ],
    category:{
        type:String,
        required:[true,"Enter Product category"],
    },
    Stock:{
        type:Number,
        required:[true,"Please enter product category"],
        maxLength:[4,"Stock cannot exceed 4 character"],
        default:1,
    },
    noOfReviews:{
        type:Number,
        default:0,
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,
            },
            name:{
                type:String,
                required:[true,"Enter your name"]
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    CreatedAt:{
        type:Date,
        default:Date.now
    }
});

//Export the model
module.exports = mongoose.model('Product', productSchema);