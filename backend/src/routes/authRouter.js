const { signup, login } = require('../controllers/authController');
const { signupValidation, loginValidation } = require('../middlewares/authValidation');

const router=require('express').Router();



router.post('/signup',signupValidation,signup)
router.post('/login',loginValidation,login)

module.exports=router;