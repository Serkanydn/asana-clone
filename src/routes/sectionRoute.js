//validations
const schemas = require('../validations/sectionValidations');
const express = require('express');
const { sectionController } = require('../controllers');
const { authenticateToken, validate, idChecker } = require('../middlewares')
const router = express.Router();

router.route('/:projectId').get(idChecker('projectId'),authenticateToken, sectionController.index);
router.route('/').post(authenticateToken, validate(schemas.createValidation), sectionController.create);
router.route('/:id').patch(idChecker(),authenticateToken, validate(schemas.updateValidation), sectionController.update)
router.route('/:id').delete(idChecker(),authenticateToken, sectionController.deleteSection)

module.exports = router

