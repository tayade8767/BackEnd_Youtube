const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const subscriptionSchema = mongoose.Schema({

    subscriber: {
        type: Schema.Types.ObjectId,      // one who subscring 
        ref: 'User'
    },

    channel: {
        type: Schema.Types.ObjectId,      // one who subscring 
        ref: 'User'
    }

}, {
    timestamps: true,
})


model.exports = mongoose.model("Subscription", subscriptionSchema);