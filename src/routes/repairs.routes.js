const express = require('express');

const repairController = require('./../controllers/repair.controllers');

const router = express.Router();

router
  .route('/')
  .get(repairController.pendingBikes)
  .post(repairController.diary);

router
  .route('/:id')
  .get(repairController.getPendingBikeById)
  .patch(repairController.completed)
  .delete(repairController.cancelled);

module.exports = router;
