'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  // 框架安全机制，测试阶段暂时停用
  security: {
    enable: false,
    xframe: {
      enable: false,
    },
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  oss: {
    enable: true,
    package: 'egg-oss',
  },
  // config/plugin.js
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  view: {
    enable: true,
    package: 'egg-view',
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  /* ejs: {
    enable: true,
    package: 'egg-view-ejs',
  }, */
};
