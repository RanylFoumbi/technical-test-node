const express = require('express');
/*get userController file */
const userController = require('./user.controller');

const router = express.Router();

/**
 * User Routes Definition
 * here we match the endpoint with its controller method 
 */
const userRoutes = app => {
  // Base
  app.use('/users', router);
    /*add new user */
    router.post('/new', userController.addNewUser);
    /*get all user in the db */
    router.get('/all', userController.getAll);
    /*get one user by id */
    router.get('/:id', userController.getOne);
    /*update user infos */
    router.patch('/update/:id', userController.updateOne);
     /*delete the user with the id from the db */
    router.delete('/delete/:id', userController.deleteOne);
};

// Exports
module.exports = userRoutes;