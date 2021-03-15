import 'core-js/stable';
import 'regenerator-runtime/runtime';
import startServer from './app';
import { logger } from './services/loggerService';

const { SLEEP_TIME = 30000 } = process.env;

logger.info(`Sleeping for ${SLEEP_TIME}ms before connecting to RabbitMQ`);
setTimeout(() => {
  startServer();
  logger.info(`Server started`);
}, SLEEP_TIME);
