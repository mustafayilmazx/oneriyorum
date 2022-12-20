const router = require('express').Router();
const showController = require('../controllers/showController');


router.get('/getshows',showController.getShows);

module.exports = router;
