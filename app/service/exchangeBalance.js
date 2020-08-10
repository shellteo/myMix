'use strict';

const Service = require('egg').Service;

class BalanceService extends Service {
  async find(username, symbol) {
    return this.ctx.model.ExchangeBalance.find({ where: { username, symbol } });
  }
}

module.exports = BalanceService;
