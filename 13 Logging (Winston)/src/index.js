const winston = require('winston');
require('dotenv').config({path: './src/config/env/.env'});

// simple logger
const logger = winston.createLogger({
    level: process.env.WINSTON_LOG_LEVEL || 'info',
    // format: winston.format.json(),
    format: winston.format.cli(),
    transports: [new winston.transports.Console()],
})

// we can also define options like this
logger.exitOnError = false;

logger.info('Node.js app started');
logger.warn('Warning');
logger.error('Error')

// we can also do
logger.log('info', 'Another log');

// custom levels
const myCustomLevels = {
  levels: {
    foo: 0,
    bar: 1,
    baz: 2,
    foobar: 3
  },
  colors: {
    foo: 'blue',
    bar: 'green',
    baz: 'yellow',
    foobar: 'red'
  }
};
winston.addColors(myCustomLevels.colors);
const customLevelLogger = winston.createLogger({
    level: 'foobar',
    levels: myCustomLevels.levels,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
    transports: [new winston.transports.Console()],
});

customLevelLogger.foobar('some foobar level-ed message');
customLevelLogger.foo('Foo log');

// to file
const fileLogger = winston.createLogger({
    level: process.env.WINSTON_LOG_LEVEL || 'info',
    transports: [
        new winston.transports.File({
            filename: 'combined.log',
            level: 'info'
        }),
        new winston.transports.File({
            filename: 'errors.log',
            level: 'error'
        })
    ]
});
fileLogger.error('Error');