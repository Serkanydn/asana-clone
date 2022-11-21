//validate middlesware
const validate = require('../middlewares/validateMiddleware');
//validations
const schemas = require('../validations/projectValidations');
const express = require('express');
const { projectController } = require('../controllers');
const { authenticateToken } = require('../middlewares/authenticateMiddleware')
const router = express.Router();

router.route('/')
    .get(authenticateToken, projectController.index);

router.route('/')
    .post(authenticateToken, validate(schemas.createValidation), projectController.create);

router.route('/:id')
    .delete(authenticateToken, projectController.deleteProject)

router.route('/:id')
    .patch(authenticateToken, validate(schemas.updateValidation), projectController.update)

module.exports = router

