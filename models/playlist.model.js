const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playlistSchema = Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    vedios: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Vedio'
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

},
{
    timestamps: true
});


module.exports = mongoose.model("Playlist",playlistSchema);

