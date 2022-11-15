//validate middlesware
const validate = require('../middlewares/validateMiddleware');
//validations
const schemas = require('../validations/projectValidations');
const express = require('express');
const { index, create, update, deleteProject } = require('../controllers/projectController');
const { authenticateToken } = require('../middlewares/authenticateMiddleware')
const router = express.Router();

router.route('/')
    .get(authenticateToken, index);

router.route('/')
    .post(authenticateToken, validate(schemas.createValidation), create);

router.route('/:id')
    .delete(authenticateToken, deleteProject)

router.route('/:id')
    .patch(authenticateToken, validate(schemas.updateValidation), update)

module.exports = router

