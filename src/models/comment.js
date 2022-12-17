const Mongoose = require('mongoose');

const CommentSchema = new Mongoose.Schema(
    {
        userId: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'user',
            require: true,
        },
        content: {
            type: String,
            min: 1,
            max: 250,
            require: true,
        },
        postId: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'post',
        },
        likes: [
            {
                type: Mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
        ]

    }
);

module.exports = Mongoose.model('comment',CommentSchema);