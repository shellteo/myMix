'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // 前端jwt鉴权
  const passport = app.middleware.passport({ management: false });
  // geetest
  const gtVerify = app.middleware.geetest();
  // 加载app
  require('./validate')(app);

  const { router, controller } = app;
  router.post('/api/user/register', gtVerify, controller.user.register);
  router.post('/api/user/login', gtVerify, controller.user.login);
  router.get('/api/user/info', passport, controller.user.userInfo);
  router.put('/api/user/info', passport, controller.user.update);
  router.post('/api/upload', passport, controller.user.upload);
  // comment
  // mail，geetest校验
  router.post('/api/mail', gtVerify, controller.mail.send);

  /* -----------------geetest------------------ */
  router.get('/gt/register-slide', controller.geetest.register);
  router.post('/gt/validate-slide', controller.geetest.validate);

  router.get('/test', controller.test.list);
  router.resources('/token', controller.token);
  // router.post('/test/token/create', controller.token.create);
  router.get('/exchange/list', controller.token.getExchangeList);
  router.get('/api/token/info', controller.okex.queryTokenInfo);
  router.get('/api/key/list', controller.okex.keyList);
  router.post('/api/recover', controller.okex.recover);
  router.get('/api/account', controller.okex.queryAccount);
};
