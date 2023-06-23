const express = require('express');

//controladores
const repairController = require('./../controllers/repair.controllers');

//middlewares
const validationMiddleware = require('../middlewares/validation.middlewares');
const authMiddleware = require('../middlewares/auth.middlewares');
const repairsMiddleware = require('../middlewares/repairs.middlewares');

const router = express.Router();

/* router.use(authMiddleware.protect);*/
router.use(repairsMiddleware.validRepair);

router
  .route('/')
  .get(
    authMiddleware.protect,
    authMiddleware.restricTo('employee'),
    repairController.pendingBikes
  )
  .post(
    validationMiddleware.createRepairValidation,
    authMiddleware.protect,
    repairController.newRepair
  );

router
  .use(authMiddleware.protect)
  .use(authMiddleware.restricTo('employee'))
  .use('/:id', repairsMiddleware.validRepair)
  .route('/:id')
  .get(repairController.getPendingBikeById)
  .patch(repairController.completed)
  .delete(repairController.cancelled);

module.exports = router;
