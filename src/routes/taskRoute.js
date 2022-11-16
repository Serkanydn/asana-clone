//validate middlesware
const validate = require('../middlewares/validateMiddleware');
//validations
const schemas = require('../validations/taskValidations');
const express = require('express');
const { index, create, update, deleteTask } = require('../controllers/taskController');
const { authenticateToken } = require('../middlewares/authenticateMiddleware')
const router = express.Router();

router.route('/').post(authenticateToken, validate(schemas.createValidation), create);
router.route('/:id').patch(authenticateToken, validate(schemas.updateValidation), update)
router.route('/:id').delete(authenticateToken, deleteTask)

module.exports = router

