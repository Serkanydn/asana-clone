//validate middlesware
const validate = require('../middlewares/validateMiddleware');
//validations
const schemas = require('../validations/projectValidations');
const express = require('express');
const { create, index } = require('../controllers/projectController');
const { authenticateToken } = require('../middlewares/authenticateMiddleware')
const router = express.Router();

router.route('/')
    .get(authenticateToken, index);

router.route('/')
    .post(validate(schemas.createValidation), create);

module.exports = router

