'use strict';

const Controller = require('egg').Controller;
const TOKT = 'tokt';

class ExchangeController extends Controller {
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
  async create() {
    const { ctx } = this;
    const { symbol } = ctx.request.body;
    const result = await ctx.service.exchange.createExchange(symbol);
    if (result === -1) {
      ctx.body = ctx.msg.tokenNotExist;
    } else if (result === -2) {
      ctx.body = ctx.msg.exchangeExist;
    } else {
      ctx.body = {
        ...ctx.msg.success,
        data: result,
      };
    }
  }
  async addLiquidty() {
    const { ctx } = this;
    const { symbol, tokt_amount, token_amount } = ctx.request.body;
    const max_tokens = this.getMaxTokens(token_amount);
    const min_liquidity = await this.service.exchange.getYourMintToken(tokt_amount, symbol);
    console.log(max_tokens, min_liquidity);
    const result = await ctx.service.exchange.addLiquidity(TOKT, tokt_amount, symbol, token_amount, min_liquidity, max_tokens);
    ctx.body = {
      ...ctx.msg.success,
      data: result,
    };
  }
  async removeLiquidty() {
    const { ctx } = this;
    const { symbol, amount } = ctx.request.body;
    const { token1_amount, token2_amount } = await ctx.service.exchange.getPoolSize(amount, symbol);
    console.log(token1_amount, token2_amount);
    const min_okt = this.getMinTokens(token1_amount);
    const min_tokens = this.getMinTokens(token2_amount);
    const result = await ctx.service.exchange.removeLiquidity(TOKT, symbol, amount, min_okt, min_tokens);
    ctx.body = {
      ...ctx.msg.success,
      data: result,
    };
  }
  async oktToTokenInput() {
    const { ctx } = this;
    const { symbol, okt_amount } = ctx.request.body;
    const token_amount = await this.service.exchange.getCnyToTokenInputPrice(symbol, okt_amount);
    const min_tokens = this.getMinTokens(token_amount);
    const result = await ctx.service.exchange.cnyToTokenInput(TOKT, symbol, okt_amount, min_tokens);
    ctx.body = {
      ...ctx.msg.success,
      data: result,
    };
  }
  async tokenToOktInput() {
    const { ctx } = this;
    const { symbol, token_amount } = ctx.request.body;
    const okt_amount = await this.service.exchange.getTokenToCnyInputPrice(symbol, token_amount);
    const min_okt = this.getMinTokens(okt_amount);
    console.log('min_okt: ', min_okt);
    const result = await ctx.service.exchange.tokenToCnyInput(TOKT, symbol, token_amount, min_okt);
    ctx.body = {
      ...ctx.msg.success,
      data: result,
    };
  }
  getMaxTokens(v) {
    return parseFloat((parseFloat(v) / (1 - 0.02)).toFixed(8));
  }
  getMinTokens(v) {
    return parseFloat((parseFloat(v) * (1 - 0.02)).toFixed(8));
  }
}

module.exports = ExchangeController;
