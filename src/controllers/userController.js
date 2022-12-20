const User = require('../models/user');
const { registerValidation, loginValidation, changePasswordValidation } = require('../validations/user-validations');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');


const generateToken = async (req,uid) => {
    const body = {
        username: req.body.username,
        email: req.body.email,
        uid: uid
    }
    const token = await Jwt.sign(body,process.env.JWT_SECRET,{expiresIn : '3 days'});
    return token;
}

const isEmailExist = async (email) => {
    try {
        const result = await User.findOne({email})
        if (result){
            return true;
        } else {
            return false;
        }     
    } catch (error) {
        throw error
    }
}

const getUser = async (username) => {
    try {
        const result = await User.findOne({username})
        if (result){
            return result;
        } else {
            return false;
        }     
    } catch (error) {
        throw error
    }
}

// find user by id
const getUserById = async (id) => {
    try {
        const result = await User.findById(id).populate('posts');
        if (result){
            return result;
        } else {
            return false;
        }
    } catch (error) {
        throw error
    }
}


const login = async (req, res, next) => {
    try {
        const {error, value} = await loginValidation.validate(req.body);
        if (error){
            throw next(new createError(401, "Wrong Username or Password."));
        };
        const user = await User.findOne({
            username: req.body.username
        });
        if (user) {
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if (validPass) {
                const token = await generateToken(req, user._id);
                res.status(200).json({
                    "success": true,
                    "username" : user.username,
                    "token" : token,
                }); 
            } else {
                throw next(new createError(401, "Wrong Username or Password."));
            };

        } else {
            throw next(new createError(404,'Username not found!'));
        }
    } catch (error) {
        next(error);
    }
}


const register = async (req, res, next) => {
    try {
        const { error, value} = await registerValidation.validate(req.body);
        if (error){
            console.log("Joi Error\n\n", error)
            throw next(new createError(400,error))
        }

        const userExist = await isEmailExist(req.body.email);
        if (userExist){
            throw next(new createError(400,'Email is already registered.'));
        }

        const UsernameExist = await getUser(req.body.username);
        if (UsernameExist){
            throw next(new createError(400,'Username is already registered.'));
        }     

        const user = new User({
            username: req.body.username.toLowerCase() ,
            password: req.body.password,
            email: req.body.email
        });
        
        user.password = await bcrypt.hash(user.password,10);

        try {
            const result  = await user.save();
            const token = await generateToken(req, user._id);
                
            res.json({
                success: true,
                username: result.username,
                email : result.email,
                token: token
            });
        } catch (err) {
            throw err;
        }

    } catch (err) {
        next(err);
    }
};

// get user infos by id and return it
const getUserInfos = async (req, res, next) => {
    try {
        const user = await getUser(req.query.username.toLowerCase());
        if (!user) {
            throw next(new createError(404,'User not found!'));
        }
        res.json({
            success: true,
            username: user.username,
            biography: user.biography,
            posts : user.posts,
            social : user.social,
        });
    } catch (error) {
        next(error);
    }
}


// change password to user
const changePassword = async (req, res, next) => {
    try {
        // validate the request body
        const { error, value} = await changePasswordValidation.validate(req.body);
        console.log(req.body);

        const user = await getUserById(req.body.userId);
        if (!user) {
            throw next(new createError(404,'User not found!'));
        }
        // check if the old password is correct
        const validPass = await bcrypt.compare(req.body.oldPassword, user.password);
        if (!validPass) {
            throw next(new createError(401, "Wrong Password."));
        };
        // hash the new password
        const hashedPassword = await bcrypt.hash(req.body.newPassword,10);

        // update the password
        user.password = hashedPassword;
        await user.save();

        res.json({
            success: true,
            message: "Password changed successfully",
        });


    } catch (error) {
        next(error);
    };
}
module.exports = {
    register,
    login,
    changePassword,
    getUserInfos
}