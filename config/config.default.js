/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
    domainWhiteList: [ '*' ],
  };

  config.login = {
    secretKey: 'zxplus', // jwt密钥
    expires: 60 * 60 * 24 * 7, // 超时时间24小时
  };
  config.managementLogin = {
    secretKey: 'zxmanagement', // jwt密钥
    expires: 60 * 60 * 24, // 超时时间24小时
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  };
  /* config.cluster = {
    listen: {
      port: 7009,
      hostname: '0.0.0.0',
    },
  }; */

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1555314751737_8431';

  // add your middleware config here
  config.middleware = [ 'formatMessage' ];
  /* config.view = {
    mapping: {
      '.ejs': 'ejs',
    },
  }; */
  config.view = {
    defaultViewEngine: 'nunjucks',
    root: [
      path.join(appInfo.baseDir, 'app/view'),
    ].join(','),
    mapping: {
      '.nj': 'nunjucks',
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
