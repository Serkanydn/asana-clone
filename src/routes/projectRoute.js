//validations
const schemas = require('../validations/projectValidations');
const express = require('express');
const { projectController } = require('../controllers');
const { authenticateToken,validate,idChecker } = require('../middlewares')
const router = express.Router();

router.route('/')
    .get(authenticateToken, projectController.index);

router.route('/')
    .post(authenticateToken, validate(schemas.createValidation), projectController.create);

router.route('/:id')
    .delete(idChecker(),authenticateToken, projectController.deleteProject)

router.route('/:id')
    .patch(idChecker(),authenticateToken, validate(schemas.updateValidation), projectController.update)

module.exports = router

