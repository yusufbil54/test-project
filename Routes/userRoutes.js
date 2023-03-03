const router = require('express').Router();
const userController = require('../Controllers/userControllers.js');


router.route('/').post(userController.createUser);
router.route('/').get(userController.getAllUsers);
router.route('/:id').delete(userController.deleteUser);
router.route('/:id').put(userController.updateUser);


module.exports = router;
