import amqp from 'amqplib';
import { logger } from './loggerService';

const { MQ_HOST = 'localhost' } = process.env;
const { CLOUDAMQP_URL = `amqp://${MQ_HOST}:5672` } = process.env;
const EXCHANGE = 'emergency_electric';
let eeChannel = null;

export const amqpConnect = async () => {
  try {
    const mqConnection = await amqp.connect(CLOUDAMQP_URL);
    eeChannel = await mqConnection.createChannel();

    await eeChannel.assertExchange(EXCHANGE, 'fanout', {
      durable: false,
    });
    logger.info(`AMQP - connection established at ${CLOUDAMQP_URL}`);
  } catch (ex) {
    logger.log('fatal', `AMQP - ${ex}`);
    process.exit();
  }
};

const publishMessageToExchange = (message) => {
  eeChannel.publish(EXCHANGE, '', Buffer.from(JSON.stringify(message)));
  logger.info(`AMQP - message sent`);
};

export const injectExchangeService = (req, res, next) => {
  req.exchangeServices = {
    publishMessageToExchange,
  };
  next();
};
