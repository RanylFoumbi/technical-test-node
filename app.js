
const express = require("express");
require("./api/config/database");
const cors = require('cors');
const http = require("http");
const appRoutes = require("./api/routes");
const bodyParser = require('body-parser');
const app = express();
const port = 8000
/*Swagger docs import */
const swaggerUi = require("swagger-ui-express"),
    swaggerDocument = require("./api/swagger/swagger.json");

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Type, Accept, Content-Type, X-Auth-Token')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

//Parse application/json
app.use(bodyParser.json({extended: true}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// App route
app.use("/api", appRoutes());
// Swagger doc route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/*server runtime port */
const server = http.createServer(app);
module.exports = server.listen(port,()=>console.log('This app is running on port '+ port));