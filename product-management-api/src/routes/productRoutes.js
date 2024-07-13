const express = require('express');
const auth= require('../middleware/auth');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/',auth, productController.createProduct);
router.get('/', auth,productController.getAllProducts);
router.put('/:id',auth, productController.updateProduct);
router.delete('/:id',auth, productController.deleteProduct);

module.exports = router;
