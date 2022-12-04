const Joi = require('joi');

const registerValidation = Joi.object({
    username: Joi.string()
    .min(6)
    .max(20)
    .required(),

    email: Joi.string()
    .email()
    .required(),
    
    password: Joi.string()
    .min(8)
    .required(),
})

const loginValidation = Joi.object({
    username: Joi.string()
    .min(6)
    .max(20)
    .required(),
    
    password: Joi.string()
    .min(8)
    .required(),
})


module.exports = {
    registerValidation,
    loginValidation,
}