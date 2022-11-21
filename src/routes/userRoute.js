const { authenticateToken,validate,idChecker } = require('../middlewares')

//validations
const schemas = require('../validations/userValidations');
const express = require('express');
const { userController } = require('../controllers');
const router = express.Router();

router.route('/').get(userController.index);
router.route('/').post(validate(schemas.createValidation), userController.create);
router.route('/').patch(authenticateToken, validate(schemas.updateValidation), userController.update);
router.route('/:id').delete(idChecker(),authenticateToken, userController.deleteUser)
router.route('/login').post(validate(schemas.loginValidation), userController.login);
router.route('/projects').get(authenticateToken, userController.projectList);
router.route('/change-password').post(authenticateToken, validate(schemas.changePasswordValidation), userController.changePassword);
router.route('/reset-password').post(validate(schemas.resetPasswordValidation), userController.resetPassword);
router.route('/update-profile-image').post(authenticateToken, userController.updateProfileImage);



module.exports = router

