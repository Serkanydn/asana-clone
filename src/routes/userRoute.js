//middlesware
const validate = require('../middlewares/validateMiddleware');
const { authenticateToken } = require('../middlewares/authenticateMiddleware')

//validations
const schemas = require('../validations/userValidations');
const express = require('express');
const { create, index, login, projectList, resetPassword, update } = require('../controllers/userController');
const router = express.Router();

router.get('/', index);

router.route('/')
    .post(validate(schemas.createValidation), create);

router.route('/')
    .patch(authenticateToken, validate(schemas.updateValidation), update);

router.route('/login')
    .post(validate(schemas.loginValidation), login);

router.route('/projects')
    .get(authenticateToken, projectList);

router.route('/reset-password')
    .post(validate(schemas.resetPasswordValidation), resetPassword);



module.exports = router

