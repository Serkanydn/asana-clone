const express = require('express');
const helmet = require('helmet');
const config = require('./config');
const loaders = require('./loaders');
const { projectRoutes } = require('./routes')

config();
loaders();


const app = express();
app.use(express.json());
app.use(helmet());


app.listen(process.env.APP_PORT, () => {
    console.log(`Listening port ${process.env.APP_PORT}`);

    app.use('/projects', projectRoutes)
})