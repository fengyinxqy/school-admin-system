/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 数据库ORM插件
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  // 跨域插件
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // 参数校验插件
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  // 接口文档
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc',
  },
};
