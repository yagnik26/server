const {Router} = require('express');
const { addproduct, updateProduct, deleteProduct, allProduct } = require('../controllers/productControllers');

const router = Router();

router.post('/addproduct', addproduct)
router.patch('/updateproduct/:id', updateProduct)
router.delete('/deleteproduct/:id', deleteProduct)
router.get('/allproduct', allProduct)

module.exports = router;