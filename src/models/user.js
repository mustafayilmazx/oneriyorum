const Mongoose = require('mongoose');

const UserSchema = Mongoose.Schema(
    {
        username : {
            type: String,
            min: 6,
            max: 20,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        avatar: {
            type: Number,
            default: null,
        },
        email_verified: {
            type: Boolean,
            default: false,
        },
        password: {
            type: String,
            min: 8,
            required: true,
            select: false,
            trim: true,
        },
        biography: {
            type: String,
            max: 300,
            default: null,
        },
        social: {
            website: {type: String, default:null},
            facebook: {type: String, default:null},
            twitter: {type: String, default:null},
            instagram: {type: String, default:null},
        },
        comments: [
            {
                type: Mongoose.Schema.Types.ObjectId,
                ref: 'comment',
            }
        ],
        followers: [
            {
                type: Mongoose.Schema.Types.ObjectId,
                ref: 'user',
            }
        ],
        following: [
            {
                type: Mongoose.Schema.Types.ObjectId,
                ref: 'user',
            }
        ],
        posts: [
            {
                type: Mongoose.Schema.Types.ObjectId,
                ref: 'post',
            }
        ],

    },
    { timestamps: true, versionKey: false }
);

module.exports = Mongoose.Schema('user',UserSchema);