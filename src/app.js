import { amqpConnect } from './services/mqService';

const startServer = () => {
  amqpConnect();
};

export default startServer;
