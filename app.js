const cron = require('node-cron');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const httpContext = require('express-http-context');
const marked = require('marked');

const sequelize = require('./db');

const config = require('./config');
const logger = require('./services/logger')(module);

const models = require('./models/models');
const router = require('./routes/index');

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Test task API",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:2114/"
      }
    ]
  },
  apis: ['./routes/*.js']
};
const specs = swaggerJsDoc(options);


const app = express();

// app.use(httpContext.middleware);
// app.use((req, res, next) => {
//   httpContext.ns.bindEmitter(req);
//   httpContext.ns.bindEmitter(res);
//   httpContext.set('method', req?.method);
//   httpContext.set('url', req?.url);
//   next();
// });
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use('/api', router);

// Обработка ошибок, последний Middleware
// app.use(errorHandler);

cron.schedule('0 * * * *', () => {
  fs.rm('./public/images/', { recursive: true, force: true }, (err) => {
    if (err) logger(err);
  });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(config.port, () => {
      logger.info(`App has been started on port ${config.port}...`);
    });
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
}

start();

module.exports = app;
