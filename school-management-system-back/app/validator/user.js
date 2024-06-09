module.exports = {
  register: {
    username: { type: 'string', required: true, min: 5, max: 20 },
    password: { type: 'string', required: true, min: 6, max: 20 },
    confirmPassword: { type: 'string', required: true, min: 6, max: 20 },
    role: { type: 'enum', values: [ 'admin', 'teacher', 'student', 'parent' ], required: true },
  },
  login: {
    username: { type: 'string', required: true },
    password: { type: 'string', required: true },
  },
};
