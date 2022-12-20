const router = require('express').Router();
const bookController = require('../controllers/bookController');


router.get('/getbooks',bookController.getBooks);

module.exports = router;
