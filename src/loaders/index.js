const connectDb = require('./db-connection.loader');



module.exports = () => {
    connectDb();
};