var
  usersController = require('../controllers/users_controller.js'),
  express = require('express'),
  userRoutes = express.Router();

userRoutes.route('/')
  .get(usersController.showUser)
  .post(usersController.createUser)

userRoutes.route('/:_id')
  .delete(itemsController.destroyUser)
  .put(itemsController.updateUser)

module.exports = userRoutes
