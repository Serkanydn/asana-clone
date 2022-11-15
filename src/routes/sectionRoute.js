//validate middlesware
const validate = require('../middlewares/validateMiddleware');
//validations
const schemas = require('../validations/sectionValidations');
const express = require('express');
const { index, create, update, deleteSection } = require('../controllers/sectionController');
const { authenticateToken } = require('../middlewares/authenticateMiddleware')
const router = express.Router();

router.route('/:projectId').get(authenticateToken, index);
router.route('/').post(authenticateToken, validate(schemas.createValidation), create);
router.route('/:id').patch(authenticateToken, validate(schemas.updateValidation), update)
router.route('/:id').delete(authenticateToken, deleteSection)

module.exports = router

