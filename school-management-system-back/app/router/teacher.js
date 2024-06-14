// app/router/index.js

module.exports = app => {
  const { router, controller } = app;

  router.get('/api/v1/teachers', controller.teacher.getAllTeacher);
  router.post('/api/v1/teachers', controller.teacher.createTeacher);
};
