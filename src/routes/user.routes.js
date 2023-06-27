const express = require('express');

//controladores
const userController = require('./../controllers/user.controllers');
const authController = require('../controllers/auth.controllers');

//middlewares
const authMiddleware = require('../middlewares/auth.middlewares');
const userMiddleware = require('../middlewares/user.middlewares');
const validationMiddleware = require('../middlewares/validation.middlewares');

const router = express.Router();

router.route('/').get(authMiddleware.protect, userController.findAllUsers);
/* .post(userController.createUser); */

router.use(authMiddleware.protect);

router.post(
  '/signup',
  validationMiddleware.createUserValidation,
  authController.signup
);

router.post(
  '/login',
  validationMiddleware.loginUserValidation,
  authMiddleware.loginUser,
  authController.login
);

router
  .route('/:id')
  .get(userMiddleware.validUser, userController.findUser)
  .patch(
    userMiddleware.validUser,
    authMiddleware.protectAccountOwner,
    userController.updateUser
  )
  .delete(
    userMiddleware.validUser,
    authMiddleware.protectAccountOwner,
    userController.deleteUser
  );

module.exports = router;
