//validate middlesware
const validate = require('../middlewares/validateMiddleware');
//validations
const schemas = require('../validations/taskValidations');
const express = require('express');
const { taskController } = require('../controllers');
const { authenticateToken } = require('../middlewares/authenticateMiddleware')
const router = express.Router();

router.route('/').post(authenticateToken, validate(schemas.createValidation), taskController.create);
router.route('/:id').patch(authenticateToken, validate(schemas.updateValidation), taskController.update)
router.route('/:id/make-comment').post(authenticateToken, validate(schemas.commentValidation), taskController.makeComment)
router.route('/:id/add-sub-task').post(authenticateToken, validate(schemas.createValidation), taskController.addSubTask)
router.route('/:id').get(authenticateToken, taskController.fetchTask)
router.route('/:id/:commentId').delete(authenticateToken, taskController.deleteComment)
router.route('/:id').delete(authenticateToken, taskController.deleteTask)

module.exports = router

