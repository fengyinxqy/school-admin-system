/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1717858280040_6228';

  config.jwt = {
    secret: '6x6q6y',
    sign: {
      expiresIn: 8 * (60 * 60),
    },
  };

  config.jwtAuth = {
    ignore: [
      '/',
      '/api/v1/user/login',
      '/api/v1/user/register',
      '/api/v1/user/logout',
    ],
  };

  // add your middleware config here
  config.middleware = [ 'error' ];

  config.error = {
    match: '/api/v1',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 跨域配置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ 'http://127.0.0.1' ],
  };
  config.cors = {
    origin: '*',
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    host: 'localhost',
    port: 3306,
    database: 'school_management',
    username: 'root',
    password: '626488',
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      freezeTableName: true,
      timestamps: true,
    },
  };

  config.swaggerdoc = {
    dirScanner: './app/controller', // 自动扫描的控制器目录
    apiInfo: {
      title: 'School Management API', // 接口文档标题
      description: 'API documentation for the school management system', // 接口文档描述
      version: '1.0.0', // 接口文档版本
    },
    schemes: [ 'http', 'https' ], // 接口访问协议
    consumes: [ 'application/json' ], // 消费的请求格式
    produces: [ 'application/json' ], // 生成的响应格式
    enableSecurity: false, // 是否启用安全认证
    routerMap: true, // 是否自动生成路由
    enable: true, // 是否启用插件
    swaggerOptions: { // 追加swagger-jsdoc的所有配置项，可选
      output: '../app/contract/swagger.json', // swagger 生成文件路径
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
