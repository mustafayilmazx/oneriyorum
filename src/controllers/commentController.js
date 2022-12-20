const comment = require('../models/comment');
const post = require('../models/post');
const User = require('../models/user');
const { commentValidation, UpdateValidation } = require('../validations/commentValidations');
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

// get comment by id
const getComment = async (commentId) => {
    try {
        const result = await comment.findById(commentId);
        if (!result) {
            throw (new createError(404, "Comment not found."))
        }
        return result;
    } catch (error) {
        throw error;
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

const editComment = async (req, res, next) => {
    try {
        const {error, value} = await UpdateValidation.validate(req.body);
        if (error) {
            throw next(new createError(400,error));
        }
        // check if the comment exists
        console.log(req.body)
        const myComment = await getComment(req.body.commentId);
        if (!myComment) {
            throw next(new createError(404,"Comment not found."));
        }
        // check if the user is the owner of the comment
        if (myComment.userId != req.body.userId) {
            throw next(new createError(403,"You are not the owner of this comment."));
        }
        // update the post
        try {
            myComment.content = req.body.content;
            const result = await myComment.save();

            res.json({
                success: true,
                postId: result._id
            })
        } catch (error) {
            throw next(new createError(500,error));
        }
    
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createComment,
    editComment
}