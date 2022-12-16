const router = require('express').Router();
const postController = require('../controllers/postController');
const middleWares = require('../middlewares');


router.post('/create-post',middleWares.auth,postController.createPost);

// router.route('/create-post').post(middleWares.auth,postController.createPost);

module.exports = router;
