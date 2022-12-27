const post = require('../models/post');
const User = require('../models/user')
const { PostValidation, UpdateValidation } = require('../validations/postValidations');
const createError = require('http-errors');


const getUser = async (userId) => {
    try {
        const result = await User.findOne({ _id: userId });
        if (!result) {
            throw (new createError(404,"User not found."));
        }
        return result;
    } catch (error) {
        throw (error);
    }
}

// insert post to user
const insertPostToUser = async (user, postId) => {
    try {
        // const user = await getUser(userId);
        user.posts.push(postId);
        const result = await user.save();
        return;
    } catch (error) {
        throw (error);
    }
}

const createPost = async (req, res, next) => {
    req.body.parentUser = req.body.userId;
    delete req.body.userId;

    console.log(req.body);

    try {
        const {validateError, value} = await PostValidation.validate(req.body);
        if (validateError) {
            throw next(new createError(400,error));
        }

        const myUser = await getUser(req.body.parentUser);
        req.body.parentUsername = myUser.username;

        const newPost = new post(req.body)
        try {
            const result = await newPost.save();
            // insert post to user
            try {
                await insertPostToUser(myUser, result._id);
            } catch (error) {
                throw next(new createError(500,"There is an error while saving post."));
            }

            res.json({
                success: true,
                postId: result._id
            })

        } catch (postError) {
            console.log(postError);
            throw next(new createError(500,"There is an error while saving post."))
        }
        
    } catch (error) {
        next(error);
    }
}

// create a like to post
const likePost = async (req, res, next) => {
    try {
        const myPost = await post.findById(req.body.postId);
        if (!myPost) {
            throw next(new createError(404,"Post not found."));
        }
        // check user already liked the post
        const isLiked = myPost.likes.includes(req.body.userId);
        if (isLiked) {
            throw next(new createError(403,"You already liked this post."));
        }
        // add like to post
        myPost.likes.push(req.body.userId);
        try {
            const result = await myPost.save();
            res.json({
                success: true,
                postId: result._id
            })
        } catch (error) {
            throw next(new createError(500,"There is an error while saving post."));
        }
    } catch (error) {
        next(error);
    }
}

// create a unlike to post
const unlikePost = async (req, res, next) => {
    try {
        const myPost = await post.findById(req.body.postId);
        if (!myPost) {
            throw next(new createError(404,"Post not found."));
        }
        // check user already liked the post
        const isLiked = myPost.likes.includes(req.body.userId);
        if (!isLiked) {
            throw next(new createError(403,"You didn't like this post."));
        }
        // remove like from post
        myPost.likes.pull(req.body.userId);
        try {
            const result = await myPost.save();
            res.json({
                success: true,
                postId: result._id
            })
        } catch (error) {
            throw next(new createError(500,"There is an error while saving post."));
        }
    } catch (error) {
        next(error);
    }
}


const editPost = async (req, res, next) => {
    try {
        const {error, value} = await UpdateValidation.validate(req.body);
        if (error) {
            throw next(new createError(400,error));
        }
        // check if the post is exist
        const myPost = await post.findById(req.body.postId).populate('parentUser');
        if (!myPost) {
            throw next(new createError(404,"Post not found."));
        }
        
        // check if the user is the owner of the post
        if (myPost.parentUser._id != req.body.userId) {
            throw next(new createError(403,"You are not the owner of this post."));
        }
        // update the post
        try {
            myPost.content = req.body.content;
            const result = await myPost.save();

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

// get posts by date and sort them by date also populate parentUser and comments fields and return them
const getPosts = async (req, res, next) => {
    try {
        const { page, username } = req.query;
        const options = {
            limit: 10,
            skip: ((parseInt(page, 10) || 1)-1) * 10,
            sort: { 'createdAt': -1 }
        }
        
        const filter = {};
        if (username) {
            filter.parentUsername = username;
        }

        const posts = await post.find(filter,null,options).sort({date: -1})
        .populate({
            path: 'comments',
            select: {'content': 1, 'date': 1, 'parentUser': 1},
            populate: [{path: 'userId' , select: {'username': 1, 'avatar': 1, _id: 0},options: { sort: { 'createdAt': -1 } }}]
        });
        res.json({
            success: true,
            posts
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createPost,
    editPost,
    getPosts,
    likePost,
    unlikePost
}