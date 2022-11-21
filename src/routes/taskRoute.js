//validations
const schemas = require('../validations/taskValidations');
const express = require('express');
const { taskController } = require('../controllers');
const { authenticateToken,validate,idChecker } = require('../middlewares')
const router = express.Router();

router.route('/').post(authenticateToken, validate(schemas.createValidation), taskController.create);
router.route('/:id').patch(idChecker(),authenticateToken, validate(schemas.updateValidation), taskController.update)
router.route('/:id/make-comment').post(idChecker(),authenticateToken, validate(schemas.commentValidation), taskController.makeComment)
router.route('/:id/add-sub-task').post(idChecker(),authenticateToken, validate(schemas.createValidation), taskController.addSubTask)
router.route('/:id').get(idChecker(),authenticateToken, taskController.fetchTask)
router.route('/:id/:commentId').delete(idChecker(),authenticateToken, taskController.deleteComment)
router.route('/:id').delete(idChecker(),authenticateToken, taskController.deleteTask)

module.exports = router

