const Joi = require('joi');

const commentValidation = Joi.object({
    content: Joi.string()
    .max(250)
    .required(),

    userId: Joi.string()
    .required()
    .length(24),

    postId: Joi.string()
    .required()
    .length(24),

    likes: Joi.array()
})

    


module.exports = {
    commentValidation
}