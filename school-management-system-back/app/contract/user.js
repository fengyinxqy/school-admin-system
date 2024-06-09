module.exports = {
  registerRequest: {
    username: { type: 'string', required: true, allowEmpty: false, example: 'exampleUser' },
    password: { type: 'string', required: true, allowEmpty: false, example: 'examplePassword' },
    confirmPassword: { type: 'string', required: true, allowEmpty: false, example: 'examplePassword' },
    role: { type: 'string', required: true, allowEmpty: false, enum: [ 'admin', 'teacher', 'student', 'parent' ], example: 'admin' },
  },
  loginRequest: {
    username: { type: 'string', required: true, allowEmpty: false, example: 'exampleUser' },
    password: { type: 'string', required: true, allowEmpty: false, example: 'examplePassword' },
  },
  baseResponse: {
    code: { type: 'integer', required: true, example: 200 },
    message: { type: 'string', required: true, example: 'success' },
    data: { type: 'object', required: false },
  },
};
