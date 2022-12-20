const router = require('express').Router();
const commentController = require('../controllers/commentController');
const middleWares = require('../middlewares');


router.post('/create-comment',middleWares.auth,commentController.createComment);
router.put('/edit-comment',middleWares.auth,commentController.editComment);
module.exports = router;
