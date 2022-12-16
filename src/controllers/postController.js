const post = require('../models/post');
const { PostValidation } = require('../validations/postValidations');
const createError = require('http-errors');


const createPost = async (req, res, next) => {
    req.body.parentUser = req.body.userId;
    delete req.body.userId;

    console.log(req.body);

    try {
        const {error, value} = await PostValidation.validate(req.body);
        if (error) {
            throw next(new createError(400,error));
        }

        const newPost = new post(req.body)
        try {
            const result = await newPost.save();

            res.json({
                success: true,
                postId: result._id
            })
        } catch (postError) {
            throw next(new createError(500,"There is an error while saving post."))
        }
        
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createPost
}