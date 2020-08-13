'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // jwt passport
  const passport = app.middleware.passport({ management: false });
  // geetest
  const gtVerify = app.middleware.geetest();
  // load app
  require('./validate')(app);

  const { router, controller } = app;
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/info', passport, controller.user.userInfo);
  router.put('/api/user/info', passport, controller.user.update);
  router.post('/api/upload', passport, controller.user.upload);
  // mail geetest verify
  router.post('/api/mail', gtVerify, controller.mail.send);

  /* -----------------geetest------------------ */
  router.get('/gt/register-slide', controller.geetest.register);
  router.post('/gt/validate-slide', controller.geetest.validate);

  /* -----------------exchanges------------------ */
  router.post('/api/exchange', passport, controller.exchange.create);
  router.post('/api/exchange/addLiquidity', passport, controller.exchange.addLiquidty);
  router.post('/api/exchange/removeLiquidty', passport, controller.exchange.removeLiquidty);
  router.post('/api/exchange/oktToTokenInput', passport, controller.exchange.oktToTokenInput);
  router.post('/api/exchange/tokenToOktInput', passport, controller.exchange.tokenToOktInput);
  router.get('/api/exchange/getOktToTokenInputPrice', controller.exchange.getOktToTokenInputPrice);
  router.get('/api/exchange/getTokenToOktInputPrice', controller.exchange.getTokenToOktInputPrice);
  router.get('/api/exchange/getPoolCnyToTokenPrice', controller.exchange.getPoolCnyToTokenPrice);
  router.get('/api/exchange/getMintLiquidity', controller.exchange.getMintLiquidity);
  router.get('/api/exchange/getPoolSize', controller.exchange.getPoolSize);
  router.get('/api/exchange/:symbol', controller.exchange.show);
  router.get('/api/exchange', controller.exchange.index);

  // user balance
  router.get('/api/user/balance', passport, controller.user.balance);
  // user exchange balance
  router.get('/api/user/exchange', passport, controller.user.exchange);
  router.get('/api/user/account', passport, controller.user.account);

  router.get('/test', controller.test.list);
  router.resources('/token', controller.token);
  router.get('/exchange/list', controller.token.getExchangeList);
  router.get('/api/token/info', controller.okex.queryTokenInfo);
  router.get('/api/key/list', controller.okex.keyList);
  router.post('/api/recover', controller.okex.recover);
  router.get('/api/account', controller.okex.queryAccount);
  router.post('/api/multi', controller.okex.multiTransfer);
  router.get('/api/queryAccountBalance', controller.okex.queryAccountBalance);
  router.get('/test1', controller.okex.test1);
  router.get('/test2', controller.okex.test2);
  router.get('/test3', controller.okex.test3);
  router.get('/test4', controller.okex.test4);
};
