const Mongoose = require('mongoose');

// Create a schema for existed the book model
const BookSchema = new Mongoose.Schema(
    {
        title: {
            type: String,
            min: 1,
            max: 250,
        },
        authors: {
            type: String,
            min: 1,
            max: 250,
        },
        average_rating: {
            type: Number,
            min: 0,
            max: 5,
        },
        isbn: {
            type: String,
            min: 10,
            max: 13,
        },
        num_pages: {
            type: Number,
            min: 1,
            max: 10000,
        },
    }
);

// Export the model
module.exports = Mongoose.model('books',BookSchema);