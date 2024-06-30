const mongoose = require('mongoose');

const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const Schema = mongoose.Schema;

const commentSchema = Schema({

        content: {
            type: String,
            required: true
        },
        vedio: {
            type: Schema.Types.ObjectId,
            ref: 'Vedio'
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }

    },
    {
        timestamps: true
    }
)

commentSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model("Comment", commentSchema);