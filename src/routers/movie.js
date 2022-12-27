const router = require('express').Router();
const movieController = require('../controllers/movieController');


router.get('/getmovies',movieController.getMovies);

module.exports = router;
