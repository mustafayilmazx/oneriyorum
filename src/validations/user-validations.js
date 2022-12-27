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

const changePasswordValidation = Joi.object({
    oldPassword: Joi.string()
    .min(8)
    .required()
    .messages({
        'string.empty': `Old password can't be empty`,
    }),
    newPassword: Joi.string()
    .min(8)
    .required()
    .messages({
        'string.empty': `New password can't be empty`,
    }),

    userId: Joi.string()
    .required()
    .messages({
        'string.empty': `User Id can't be empty`,
    }),
})

module.exports = {
    registerValidation,
    loginValidation,
    changePasswordValidation
}