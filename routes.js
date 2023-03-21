const express = require('express');
const route = express.Router();

const registerController = require('./controllers/registerController');
const loginController = require('./controllers/loginController');
const especialControllers = require('./controllers/especialControllers');
const userController = require('./controllers/userController');

route.post('/register', registerController.register);

route.post('/login', loginController.login);

route.get('/especial', especialControllers.especial);
route.post('/especial/edit', especialControllers.edit);
route.post('/especial/edit', especialControllers.delete);

route.get('/users/id', userController.localizeUserId);


module.exports = route;