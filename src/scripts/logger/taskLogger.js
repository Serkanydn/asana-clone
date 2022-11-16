const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'taskService ' },
    transports: [



        new winston.transports.File({ filename: 'src/logs/task/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'src/logs/task/info.log', level: 'info' }),
        new winston.transports.File({ filename: 'src/logs/task/combined.log' }),
        // new winston.transports.Console(),
    ]
})

module.exports = logger;