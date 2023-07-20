const {Router} = require('express');
const { signup, login, updateuser, deleteuser, logout } = require('../controllers/authControllers');

const router = Router();

router.post('/signup', signup)
router.post('/login', login)
router.patch('/updateuser', updateuser)
router.delete('/deleteuser', deleteuser)

module.exports = router;