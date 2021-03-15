import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import { logger } from '../services/loggerService';
import { MORGAN_CONFIG } from '../resources/constants';

export const handleHelmet = (router) => router.use(helmet());

export const handleBodyParsing = (router) => {
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());
};

export const handleCors = (router) => router.use(cors());

export const handleMorgan = (router) =>
  router.use(morgan(MORGAN_CONFIG, { stream: logger.stream }));

export const handleCompression = (router) => router.use(compression());
