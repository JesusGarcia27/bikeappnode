const express = require('express');

//controladores
const userController = require('./../controllers/user.controllers');

//middlewares
const authMiddleware = require('../middlewares/auth.middlewares');
const userMiddleware = require('../middlewares/user.middlewares');

const router = express.Router();

router.route('/').get(authMiddleware.protect, userController.findAllUsers);
/* .post(userController.createUser); */

router.use(authMiddleware.protect);

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
