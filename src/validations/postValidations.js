const Joi = require('joi');

const PostValidation = Joi.object({
    content: Joi.string()
    .max(400)
    .required()
    .min(50),

    parentUser : Joi.string()
    .length(24)
    .required()
})


module.exports = {
    PostValidation
}