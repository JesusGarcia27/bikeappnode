const express = require('express');

const userController = require('./../controllers/user.controllers');

const router = express.Router();

router
  .route('/')
  .get(userController.findAllUsers)
  .post(userController.findClient);

router
  .route('/:id')
  .get(userController.findUser)
  .patch(userController.update)
  .delete(userController.delete);

module.exports = router;
