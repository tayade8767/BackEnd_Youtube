
const mongoose = require('mongoose');

var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const vedioSchema = mongoose.Schema({

    vedioFile: {
        type: String,            //   cloudinary URLfor this vedio
        required: true
    },
    thumbnail: {
        type: String,            //   cloudinary URLfor this vedio
        required: true
    },
    title: {
        type: String,            
        required: true
    },
    discription: {
        type: String,            
        required: true
    },
    duration: {
        type: Number,            
        required: true
    },
    views: {
        type: Number,            
        default:0        //   because initally views are 0 for every vedio
    },
    isPublished: {
        type: Boolean,            
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

},
{
    timestamps: true
}
);

//  mongodb aggregation use for 
vedioSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('Vedio', vedioSchema);