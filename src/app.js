const express = require('express');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const config = require('./config');
const loaders = require('./loaders');
const events = require('./scripts/events')
const { projectRoutes, userRoutes } = require('./routes')
const path=require('path');

config();
loaders();
events();

const app = express();
app.use('/uploads',express.static(path.join(__dirname,'./','uploads')));
app.use(express.json());
app.use(helmet()); 
app.use(fileUpload());


app.listen(process.env.APP_PORT, () => {
    console.log(`Listening port ${process.env.APP_PORT}`);

    app.use('/projects', projectRoutes)
    app.use('/users', userRoutes)
})