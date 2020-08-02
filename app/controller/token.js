'use strict';

const Controller = require('egg').Controller;

class TokenController extends Controller {
  async show() {
    const { ctx } = this;
    const symbol = ctx.params.symbol;
    const data = await ctx.service.token.find(symbol);
    ctx.body = {
      ...ctx.msg.success,
      data,
    };
  }
  async index() {
    const { ctx } = this;
    const pageSize = parseInt(ctx.query.pageSize || 10);
    const pageIndex = parseInt(ctx.query.pageIndex || 1);
    const offset = (pageIndex - 1) * pageSize;
    const list = await ctx.service.token.list(offset, pageSize);
    ctx.body = {
      ...ctx.msg.success,
      data: list,
    };
  }
  async create() {
    await this.ctx.service.token.create({
      owner: '0x9F4a04eF5dBEEDC84CC89E826C5B0A36EB3E7195',
      token_id: '3',
      token_address: '0x032ad77d2E2cC1e0728477f3B805D9897b854cFA',
    });
  }
  async getExchangeList() {
    const { ctx } = this;
    const pageSize = parseInt(ctx.query.pageSize || 1000);
    const pageIndex = parseInt(ctx.query.pageIndex || 1);
    const offset = (pageIndex - 1) * pageSize;
    const list = await ctx.service.token.getExchangeList(offset, pageSize);
    ctx.body = {
      ...ctx.msg.success,
      data: list,
    };
  }
  async get() {
    const { ctx } = this;
    const data = await ctx.service.okex.queryTokenInfo();
    ctx.body = {
      ...ctx.msg.success,
      data,
    };
  }
}

module.exports = TokenController;
