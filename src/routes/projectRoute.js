//validate middlesware
const validate = require('../middlewares/validate');
//validations
const schemas = require('../validations/projectValidations');
const express = require('express');
const { create, index } = require('../controllers/projectController');
const router = express.Router();

router.get('/', index);

router.route('/')
    .post(validate(schemas.createValidation), create);

module.exports = router

