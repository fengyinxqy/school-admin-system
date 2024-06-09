// app/validator/user.js

module.exports = {
  register: {
    username: { type: 'string', required: true, allowEmpty: false },
    password: { type: 'string', required: true, allowEmpty: false },
    confirmPassword: { type: 'string', required: true, allowEmpty: false },
    role: { type: 'string', required: true, allowEmpty: false, enum: [ 'admin', 'teacher', 'student', 'parent' ] },
  },
  login: {
    username: { type: 'string', required: true, allowEmpty: false },
    password: { type: 'string', required: true, allowEmpty: false },
  },
};
