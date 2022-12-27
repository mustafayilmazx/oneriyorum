const Book = require('../models/book');
const createError = require('http-errors');



// filter by request query optional parameters to books collection in MongoDB database and return the result
const getBooks = async (req, res, next) => {
    try {
        // trim request query parameters

        let { title, author, page, limit } = req.query;
        limit = parseInt(limit, 10) || 10
        const options = {
            limit: limit,
            skip: ((parseInt(page, 10) || 1)-1) * limit,
            sort: { title: 1 }
        }
        console.log(req.query)
        
        const filters = [];

        if (!title && !author) {
            res.status(404).json({ message: 'Please provide a name or author'});
        }

        if (author) {
            filters.push({ authors: { $regex: author, $options: 'i' } });
        }
        if (title) {
            filters.push({ title: { $regex: title, $options: 'i' } });
        }

        // const books = await Book.find(req.query, null, options);
        // get books by name and author
        const books = await Book.find({ $and: filters}, null, options);

        res.json(books);
    } catch (error) {
        new createError.InternalServerError(error);
    }
}


module.exports = {
    getBooks
};
