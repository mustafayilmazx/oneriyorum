const Mongoose = require('mongoose');

// Create a schema for existed the movie model
const ShowSchema = new Mongoose.Schema(
    {
        title: {
            type: String,
            min: 1,
            max: 250,
        },
        show_id: {
            type: String,
            min: 1,
            max: 250,
        },
    }
);

// Export the model
module.exports = Mongoose.model('tv_shows',ShowSchema);