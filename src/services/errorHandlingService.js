import { logger } from './loggerService';

export const errorHandlingService = (error, req, res) => {
  const { message = 'Oops! Something went wrong', isBoom, output } = error;
  logger.warn(`${error.name}: ${error.message}`);
  logger.log('trace', error.stack);
  if (isBoom) {
    return res.status(output.statusCode).json({ message, success: false });
  }

  return res.status(500).json({ success: false, message });
};
