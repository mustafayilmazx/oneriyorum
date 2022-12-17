const comment = require('../models/comment');
const post = require('../models/post');
const User = require('../models/user');
const { commentValidation } = require('../validations/commentValidations');
const createError = require('http-errors');


const getPost = async (postId) => {
    try {
        const result = await post.findById(postId);
        if (!result) {
            throw (new createError(404,"Post not found."));
        }
        return result;
    } catch (error) {
        throw (error);
    }
}

const getUser = async (userId) => {
    try {
        const result = await User.findById(userId);
        if (!result) {
            throw (new createError(404,"User not found."));
        }
        return result;
    } catch (error) {
        throw (error);
    }
}




const createComment = async (req, res, next) => {
    // req.body.parentUser = req.body.userId;
    // delete req.body.userId;

    console.log(req.body);

    try {
        const {error, value} = await commentValidation.validate(req.body);
        if (error) {
            throw next(new createError(400,error));
        }

        const post = await getPost(req.body.postId);
        const user = await getUser(req.body.userId);

        const newComment = new comment(req.body)
        try {
            const result = await newComment.save();
            
            // insert comment id to post document
            post.comments.push(result._id);
            await post.save();
            
            // insert comment id to user document
            user.comments.push(result._id);
            await user.save();

            res.json({
                success: true,
                commentId: result._id
            })
        } catch (postError) {
            throw next(new createError(500,"There is an error while saving post."))
        }
        
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createComment
}