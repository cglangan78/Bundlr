var
  usersController = require('../controllers/users_controller.js'),
  express = require('express'),
  userRoutes = express.Router();

userRoutes.route('/')
  .get(usersController.showUser)
  .post(usersController.createUser)

userRoutes.route('/:_id')
  .delete(usersController.destroyUser)
  .put(usersController.updateUser)

module.exports = userRoutes
