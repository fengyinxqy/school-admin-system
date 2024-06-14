// app/router/index.js

module.exports = app => {
  const { router, controller } = app;

  // 根路由
  router.get('/', controller.home.index);

  require('./user')(app);
  require('./teacher')(app);

  // 模块路由
  // require('./module1')(app);
  // require('./module2')(app);

  // 错误处理路由
  // require('./error')(app);
};
