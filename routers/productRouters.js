const {Router} = require('express');
const { addproduct, updateProduct, deleteProduct } = require('../controllers/productControllers');

const router = Router();

router.post('/addproduct', addproduct)
router.patch('/updateproduct/:id', updateProduct)
router.delete('/deleteproduct/:id', deleteProduct)

module.exports = router;