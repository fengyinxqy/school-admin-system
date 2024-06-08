/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);


  app.beforeStart(async () => {
    // 在开发环境中使用 { alter: true } 以便自动更新表结构，生产环境建议使用 { force: false }
    await app.model.sync({ force: false, alter: true });
  });
};
