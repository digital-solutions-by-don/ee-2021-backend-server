import messages from './message';

export const addRoutes = (app) => {
  app.use('/api/messages', messages);
};
