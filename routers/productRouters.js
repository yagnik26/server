const {Router} = require('express');
const { addproduct, updateProduct, deleteProduct, allProduct, userProduct } = require('../controllers/productControllers');

const router = Router();

router.post('/addproduct', addproduct)
router.patch('/updateproduct/:id', updateProduct)
router.delete('/deleteproduct/:id', deleteProduct)
router.get('/allproduct', allProduct)
router.post('/userProduct',userProduct)

module.exports = router;