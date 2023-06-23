const express = require('express');

//controlador de autenticacion
const authController = require('../controllers/auth.controllers');

//middlewares para la ruta auth
const validationMiddleware = require('../middlewares/validation.middlewares');

const router = express.Router();

//Crearemos las rutas para crear y a su ves logear a un usuario, validando a los mismos.
router.post(
  '/signup',
  validationMiddleware.createUserValidation,
  authController.signup
);

router.post(
  '/login',
  validationMiddleware.loginUserValidation,
  authController.login
);

module.exports = router;
