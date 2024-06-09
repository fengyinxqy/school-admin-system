// app/router/index.js

module.exports = app => {
  const { router, controller } = app;

  router.post('/api/v1/register', controller.user.register);
  router.post('/api/v1/login', controller.user.login);
};
