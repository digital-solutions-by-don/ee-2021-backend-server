import express from 'express';
import { amqpConnect, injectExchangeService } from './services/mqService';
import { errorHandlingService } from './services/errorHandlingService';
import { logger } from './services/loggerService';
import { applyMiddleware } from './middleware/applyMiddleware';
import middleware from './middleware';
import { addRoutes } from './routes';

const { PORT = 3000 } = process.env;
const startServer = () => {
  amqpConnect();

  const app = express();
  applyMiddleware(middleware, app);
  app.use(injectExchangeService);
  addRoutes(app);
  app.use(errorHandlingService);
  app.listen(PORT, () => logger.info(`server listening on port ${PORT}`));
};

export default startServer;
