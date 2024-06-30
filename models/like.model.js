const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const likesSchema = Schema({

    vedio: {
        type: Schema.Types.ObjectId,
        ref: 'Vedio'
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    tweet: {
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
    },
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

    }, 
    { 
        timestamps: true
    }
)


module.exports = mongoose.model("Likes",likesSchema);