const Show = require('../models/show');
const createError = require('http-errors');



// filter by request query optional parameters to books collection in MongoDB database and return the result
const getShows = async (req, res, next) => {
    try {
        // trim request query parameters

        const { title, page, limit } = req.query;
        const options = {
            limit: limit,
            skip: ((parseInt(page, 10) || 1)-1) * 10,
            sort: { title: 1 }
        }

        if (!title) {
            res.status(404).json({ message: 'Please provide a name'});
        }

        // get shows from database
        const shows = await Show.find({ $and: [{ title: { $regex: title, $options: 'i' } }]}, null, options);
        if (!shows) {
            throw new createError.NotFound('Show not found');
        }

        res.status(200).json(shows);
    } catch (error) {
        new createError.InternalServerError(error);
    }
}


module.exports = {
    getShows
};
