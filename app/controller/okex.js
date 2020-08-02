'use strict';

const Controller = require('egg').Controller;

class OkexController extends Controller {
  async queryTokenInfo() {
    const { ctx } = this;
    const data = await ctx.service.okex.queryTokenInfo();
    ctx.body = {
      ...ctx.msg.success,
      data,
    };
  }
  async keyList() {
    const { ctx } = this;
    const data = await ctx.service.okex.keyList();
    ctx.body = {
      ...ctx.msg.success,
      data,
    };
  }
  async recover() {
    const { ctx } = this;
    const { mnemonic } = ctx.request.body;
    const data = await ctx.service.okex.recoverAccountByMnemonic(mnemonic);
    ctx.body = {
      ...ctx.msg.success,
      data,
    };
  }
  async queryAccount() {
    const { ctx } = this;
    const { address } = ctx.request.query;
    const data = await ctx.service.okex.queryAccount(address);
    ctx.body = {
      ...ctx.msg.success,
      data,
    };
  }
}

module.exports = OkexController;
