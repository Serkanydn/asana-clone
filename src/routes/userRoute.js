//validate middlesware
const validate = require('../middlewares/validateMiddleware');
//validations
const schemas = require('../validations/userValidations');
const express = require('express');
const { create, index,login } = require('../controllers/userController');
const router = express.Router();

router.get('/', index);

router.route('/')
    .post(validate(schemas.createValidation), create);

router.route('/login')
    .post(validate(schemas.loginValidation),login);

module.exports = router

