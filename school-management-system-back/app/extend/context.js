module.exports = {
  success({ code = 200, message = 'success', data = null }) {
    this.body = { code, message, data };
    this.status = code;
  },
};
