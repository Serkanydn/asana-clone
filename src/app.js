const express = require('express');
const helmet = require('helmet');
const config = require('./config');
const loaders = require('./loaders');
const events = require('./scripts/events')
const { projectRoutes, userRoutes } = require('./routes')

config();
loaders();
events();

const app = express();
app.use(express.json());
app.use(helmet());


app.listen(process.env.APP_PORT, () => {
    console.log(`Listening port ${process.env.APP_PORT}`);

    app.use('/projects', projectRoutes)
    app.use('/users', userRoutes)
})