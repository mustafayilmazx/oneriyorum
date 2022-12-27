const Mongoose = require('mongoose');

// Create a schema for existed the movie model
const MovieSchema = new Mongoose.Schema(
    {
        title: {
            type: String,
            min: 1,
            max: 250,
        },
        id: {
            type: Number,
            min: 1,
            max: 1000000,
        },
    }
);

// Export the model
module.exports = Mongoose.model('movies',MovieSchema);