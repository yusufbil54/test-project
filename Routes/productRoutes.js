const router = require('express').Router();
const productController = require('../Controllers/productControllers.js');

router.route('/').post(productController.createProduct);
router.route('/').get(productController.getAllProducts);
router.route('/:id').put(productController.updateProduct);
router.route('/:id').delete(productController.deleteProduct);

module.exports = router;
