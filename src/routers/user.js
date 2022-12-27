const router = require('express').Router();
const userController = require("../controllers/userController");
const middlewares = require("../middlewares");

router.post('/login',userController.login);
router.post('/register',userController.register);
router.post('/change-password',middlewares.auth,userController.changePassword);
router.get('/get-user-infos',userController.getUserInfos);

module.exports = router;

