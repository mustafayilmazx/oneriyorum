const Mongoose = require('mongoose');

const PostSchema = new Mongoose.Schema(
    {
        content: {
            type: String,
            require: true,
            max: 400
        },
        parentUser: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'user',
            require: true,
        },
        comments: [
            {
                type: Mongoose.Schema.Types.ObjectId,
                ref: 'comment',
            }
        ],
        likes: [
            {
                type: Mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
        ]
    },
    {
        timestamps: true
    }
);

module.exports = Mongoose.Schema('post',PostSchema);