// app/router/index.js

module.exports = app => {
  const { router, controller } = app;

  router.get('/api/v1/teachers', controller.teacher.getAllTeacher);
  router.post('/api/v1/teachers', controller.teacher.createTeacher);
  router.put('/api/v1/teachers', controller.teacher.updateTeacher);
  router.delete('/api/v1/teachers/:id', controller.teacher.deleteTeacher);
};
