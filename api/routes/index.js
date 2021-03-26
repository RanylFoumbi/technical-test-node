const express = require('express');

const router = express.Router();

const userRoutes = require('../modules/user/user.routes');
/***
 * This file is the global file route of the API
 * we map all our individual routes(user,auth,....) here
 */
const appRoutes = () => {
    const app = router;
  
    userRoutes(app);
    return app;
  };
  
  module.exports = appRoutes;
  