const router = require('express').Router();
const postController = require('../controllers/postController');
const middleWares = require('../middlewares');


router.post('/create-post',middleWares.auth,postController.createPost);
router.put('/edit-post',middleWares.auth,postController.editPost);
router.get('/get-posts',postController.getPosts);
router.post('/like-post',middleWares.auth,postController.likePost);
router.post('/unlike-post',middleWares.auth,postController.unlikePost);

module.exports = router;
