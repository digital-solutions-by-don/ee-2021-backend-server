export const applyMiddleware = (middleware, router) => {
  for (const f of middleware) {
    f(router);
  }
};
