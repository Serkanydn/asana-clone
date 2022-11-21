//validate middlesware
const validate = require('../middlewares/validateMiddleware');
//validations
const schemas = require('../validations/sectionValidations');
const express = require('express');
const { sectionController } = require('../controllers');
const { authenticateToken } = require('../middlewares/authenticateMiddleware')
const router = express.Router();

router.route('/:projectId').get(authenticateToken, sectionController.index);
router.route('/').post(authenticateToken, validate(schemas.createValidation), sectionController.create);
router.route('/:id').patch(authenticateToken, validate(schemas.updateValidation), sectionController.update)
router.route('/:id').delete(authenticateToken, sectionController.deleteSection)

module.exports = router

