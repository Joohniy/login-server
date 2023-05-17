const express = require('express');
const route = express.Router();

const registerController = require('./controllers/registerController');
const loginController = require('./controllers/loginController');
const especialControllers = require('./controllers/especialControllers');
const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');

route.post('/register', registerController.register);
route.post('/login', loginController.login);

route.post('/register-admin', adminController.registerAdminUser);
route.post('/login-admin', adminController.loginAdminUser);

route.get('/especial', especialControllers.especial);
route.post('/especial/edit', especialControllers.edit);
route.post('/especial/delete', especialControllers.delete);

route.get('/users/id', userController.localizeUserId);


module.exports = route;