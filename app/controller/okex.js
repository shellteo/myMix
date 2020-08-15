'use strict';

const Controller = require('egg').Controller;

class OkexController extends Controller {
  async queryTokenInfo() {
    const { ctx } = this;
    const { symbol } = ctx.query;
    const data = await ctx.service.okex.queryTokenInfo(symbol);
    if (data === null) {
      ctx.body = ctx.msg.tokenNotExist;
    } else {
      ctx.body = {
        ...ctx.msg.success,
        data,
      };
    }
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
  async queryAccountBalance() {
    const { ctx } = this;
    const address = 'okchain1kpyay37svm6gh5amzxsu59dtc4emwkan02dc3g';
    const symbol = 'tokt';
    const data = await ctx.service.okex.queryAccountBalance(address, symbol);
    ctx.body = {
      ...ctx.msg.success,
      data,
    };
  }
  async multiTransfer() {
    const { ctx } = this;
    const from = 'okchain1kpyay37svm6gh5amzxsu59dtc4emwkan02dc3g';
    const to = 'okchain1e2qlyrvw87sq7567m47qp8fhyqlvkk2cl5mfqk';
    const coins = [{
      amount: 1,
      symbol: 'tokt',
    }, {
      amount: 1,
      symbol: 'tusdk',
    }];
    const data = await ctx.service.okex.multiTransfer(from, to, coins);
    ctx.body = {
      ...ctx.msg.success,
      data,
    };
  }
  async test1() {
    const userExist1 = await this.service.user.find('tokt_zxt-20a_liquidity_holder');
    const userExist2 = await this.service.user.find('1212');
    console.log('userExist1: ', userExist1.address);
    console.log('userExist2: ', userExist2);
  }
  async test2() {
    const { ctx } = this;
    const username = 'zzxx3';
    const token2_symbol = 'zxt-20a';
    const liquidity_minted = 10;
    // 增加份额
    const res = await ctx.model.query(`
      INSERT INTO exchange_balance(username, symbol, liquidity_balance) VALUES (?, ?, ?) 
      ON DUPLICATE KEY UPDATE liquidity_balance = liquidity_balance + ?;
    `, {
      raw: true,
      replacements: [
        username, token2_symbol, liquidity_minted, liquidity_minted,
      ],
    });
    ctx.body = ctx.msg.success;
    console.log('res: ', res);
  }
  async test3() {
    const { ctx } = this;
    const username = 'zzxx3';
    const token2_symbol = 'zxt-20a';
    const amount = 10;
    const trans = await ctx.model.transaction({
      isolationLevel: this.app.Sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
    });
    const balanceResult = await ctx.model.query(`
      UPDATE exchange_balance SET liquidity_balance = liquidity_balance - ? 
      WHERE username = ? AND symbol = ? AND liquidity_balance >= ?;`,
    {
      raw: true,
      replacements: [ amount, username, token2_symbol, amount ],
      transaction: trans,
    });
    console.log('balanceResult: ', balanceResult);
    if (balanceResult.length !== 2 || balanceResult[1].affectedRows <= 0) {
      console.log('没成功');
    } else {
      console.log('成功');
    }
    await trans.commit();
    ctx.body = ctx.msg.success;
  }
  async test4() {
    const { ctx } = this;
    const token1_symbol = 'tokt';
    const token2_symbol = 'tokb';
    const token1_amount = 0.1;
    const to_address = 'okchain1e2v8nch5xs972y7a3h2zc624mw7ed5uekg6dlw';
    const exchange = await ctx.model.Exchange.findOne({
      where: { token1_symbol, token2_symbol },
      lock: this.app.Sequelize.Transaction.LOCK.UPDATE,
    });
    const total_liquidity = parseFloat(exchange.total_supply);
    const token1_reserve = await ctx.service.okex.queryAccountBalance(to_address, token1_symbol);
    const token2_reserve = await ctx.service.okex.queryAccountBalance(to_address, token2_symbol);
    console.log({
      token1_reserve,
      token2_reserve,
    });
    // 非首次add，按照当前的价格计算出token数量
    const token2_amount = parseFloat((token1_amount * token2_reserve / token1_reserve + 0.00000001).toFixed(8));
    // 你打入的钱按照池子里现有的cny_reserve来计算你的份额
    const liquidity_minted = parseFloat((token1_amount * total_liquidity / token1_reserve).toFixed(8));

    ctx.body = {
      ...ctx.msg.success,
      data: {
        token2_amount,
        liquidity_minted,
      },
    };
  }
}

module.exports = OkexController;
