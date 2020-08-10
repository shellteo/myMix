'use strict';

const Service = require('egg').Service;
const moment = require('moment');
const TOKT = 'tokt';

class ExchangeService extends Service {
  getHolderUserName(symbol) {
    return `${TOKT}_${symbol}_liquidity_holder`;
  }
  // create exchange
  async createExchange(symbol) {
    const { ctx } = this;
    const token = await this.service.okex.queryTokenInfo(symbol);
    if (!token) {
      this.logger.error('ExchangeService::createExchange token not exist, symbol: %j', symbol);
      return -1;
    }
    const exchange = await this.getExchange(symbol);
    // exchange already exist
    if (exchange) {
      this.logger.error('ExchangeService::createExchange error exchange already exist, symbol: %j', symbol);
      return -2;
    }
    const username = this.getHolderUserName(symbol);
    const userResult = await this.service.user.create({
      username,
      password: 'JJNTtwtKuslU2lRckmB9GkccsAv7X2zddJMoLmF6wgYeVFierG',
    });
    if (userResult.code !== 0) {
      this.logger.error('ExchangeService::createExchange error user create error, symbol: %j', symbol);
      return -3;
    }
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    const result = await ctx.model.Exchange.create({
      token1_symbol: TOKT,
      token2_symbol: symbol,
      create_time: now,
      holder_username: userResult.data.username,
      holder_address: userResult.data.address,
    });
    ctx.logger.info('ExchangeService::createExchange result: %j', result);
    return result.id;
  }
  async getExchange(symbol) {
    return this.ctx.model.Exchange.find({ where: { token2_symbol: symbol } });
  }
  async getMintLiquidity(cny_amount, symbol) {
    cny_amount = parseFloat(cny_amount);
    const exchange = await this.getExchange(symbol);
    if (exchange === null) return -1;
    const total_liquidity = parseFloat(exchange.total_supply);
    // const { address } = await this.service.user.find(exchange.holder_username);
    const address = exchange.holder_address;
    const cny_reserve = await this.service.okex.queryAccountBalance(address, TOKT);
    let mint_token = 0;
    if (total_liquidity <= 0) {
      mint_token = cny_amount;
    } else {
      mint_token = parseFloat(cny_amount * total_liquidity / cny_reserve);
    }
    return mint_token;
  }
  async getPoolSize(amount, symbol) {
    const exchange = await this.getExchange(symbol);
    if (exchange === null) return -1;
    const total_liquidity = parseFloat(exchange.total_supply);
    // const { address } = await this.service.user.find(exchange.username);
    const address = exchange.holder_address;
    const token_reserve = await this.service.okex.queryAccountBalance(address, symbol);
    const cny_reserve = await this.service.okex.queryAccountBalance(address, TOKT);
    console.log('getPoolSize: ', { token_reserve, cny_reserve, total_liquidity });
    const cny_amount = amount * cny_reserve / total_liquidity;
    const token_amount = amount * token_reserve / total_liquidity;
    return {
      token1_amount: cny_amount,
      token2_amount: token_amount,
    };
  }
  async getPoolCnyToTokenPrice(symbol, amount) {
    amount = parseFloat(amount);
    if (amount <= 0) {
      return -1;
    }
    const exchange = await this.getExchange(symbol);
    if (exchange === null) return -1;
    const address = exchange.holder_address;
    const token_reserve = await this.service.okex.queryAccountBalance(address, symbol);
    const cny_reserve = await this.service.okex.queryAccountBalance(address, TOKT);
    if (cny_reserve <= 0) {
      return -1;
    }
    // 非首次add，按照当前的价格计算出token数量
    const token_amount = amount * token_reserve / cny_reserve + 0.00000001;
    return token_amount;
  }
  // 计算使用token兑换cny的数量，以输入的token数量为准
  async getTokenToCnyInputPrice(symbol, tokens_sold) {
    tokens_sold = parseFloat(tokens_sold);
    if (tokens_sold <= 0) {
      return -1;
    }
    const exchange = await this.getExchange(symbol);
    if (exchange === null) return -1;
    const address = exchange.holder_address;
    console.log(address);
    const token_reserve = await this.service.okex.queryAccountBalance(address, symbol);
    const cny_reserve = await this.service.okex.queryAccountBalance(address, TOKT);

    console.log(tokens_sold, token_reserve, cny_reserve);
    return this.getInputPrice(tokens_sold, token_reserve, cny_reserve);
  }
  // 计算使用cny兑换token的数量，以输入的cny数量为准
  async getCnyToTokenInputPrice(symbol, cny_sold) {
    cny_sold = parseFloat(cny_sold);
    if (cny_sold <= 0) {
      return -1;
    }
    const exchange = await this.getExchange(symbol);
    if (exchange === null) return -1;
    const address = exchange.holder_address;
    const token_reserve = await this.service.okex.queryAccountBalance(address, symbol);
    const cny_reserve = await this.service.okex.queryAccountBalance(address, TOKT);
    return this.getInputPrice(cny_sold, cny_reserve, token_reserve);
  }
  async addLiquidity(token1_symbol, token1_amount, token2_symbol, token2_amount, min_liquidity, max_tokens) {
    const { ctx } = this;
    // from user
    const from_address = ctx.user.address;
    const from_username = ctx.user.username;
    const token1_balance = await ctx.service.okex.queryAccountBalance(from_address, token1_symbol);
    // token1 balance not enough
    if (parseFloat(token1_amount) > parseFloat(token1_balance)) {
      return -2;
    }
    const token2_balance = await ctx.service.okex.queryAccountBalance(from_address, token2_symbol);
    // token2 balance not enough
    if (parseFloat(token2_amount) > parseFloat(token2_balance)) {
      return -2;
    }
    // UPDATE lock
    const exchange = await ctx.model.Exchange.findOne({
      where: { token1_symbol, token2_symbol },
      lock: this.app.Sequelize.Transaction.LOCK.UPDATE,
    });
    if (!exchange) {
      this.logger.error('ExchangeService::addLiquidity error exchange does not exist, symbol: %j', token2_symbol);
      return -1;
    }
    const to_address = exchange.holder_address;
    const transaction = await ctx.model.transaction({
      isolationLevel: this.app.Sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
    });
    try {
      // 非首次添加流动性
      if (parseFloat(exchange.total_supply) > 0) {
        const total_liquidity = parseFloat(exchange.total_supply);
        const token1_reserve = await ctx.service.okex.queryAccountBalance(to_address, token1_symbol);
        const token2_reserve = await ctx.service.okex.queryAccountBalance(to_address, token2_symbol);
        // 非首次add，按照当前的价格计算出token数量
        token2_amount = parseFloat((token1_amount * token2_reserve / token1_reserve + 0.00000001).toFixed(8));
        // 你打入的钱按照池子里现有的cny_reserve来计算你的份额
        const liquidity_minted = parseFloat((token1_amount * total_liquidity / token1_reserve).toFixed(8));
        // 不满足token最大值和份额最小值条件，则流动性添加失败
        if (max_tokens < token1_amount || liquidity_minted < min_liquidity) {
          transaction.rollback();
          return -1;
        }
        // 转移资产
        const assets = [{
          symbol: token1_symbol,
          amount: token1_amount,
        }, {
          symbol: token2_symbol,
          amount: token2_amount,
        }];
        console.log('assets: ', assets);
        const transferResult = await this.service.okex.multiTransfer(from_address, to_address, assets);
        // 转移资产失败
        if (!transferResult) {
          transaction.rollback();
          return -1;
        }
        // 扩大交易池
        await exchange.update({
          total_supply: total_liquidity + liquidity_minted,
        }, {
          transaction,
        });
        // 增加份额
        await ctx.model.query(`
          INSERT INTO exchange_balance(username, symbol, liquidity_balance) VALUES (?, ?, ?) 
          ON DUPLICATE KEY UPDATE liquidity_balance = liquidity_balance + ?;
        `, {
          raw: true,
          replacements: [
            from_username, token2_symbol, liquidity_minted, liquidity_minted,
          ],
          transaction,
        });
        // 添加日志
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        await ctx.model.ExchangeLiquidityLog.create({
          username: from_username,
          token1_symbol,
          token2_symbol,
          token1_amount,
          token2_amount,
          liquidity: liquidity_minted,
          create_time: now,
          txhash: transferResult.txhash,
        }, {
          transaction,
        });
        await transaction.commit();
      } else {
        // 首次add
        const initial_liquidity = token1_amount;
        // 转移资产
        const assets = [{
          symbol: token1_symbol,
          amount: token1_amount,
        }, {
          symbol: token2_symbol,
          amount: token2_amount,
        }];
        const transferResult = await this.service.okex.multiTransfer(from_address, to_address, assets);
        // 转移资产失败
        if (!transferResult) {
          transaction.rollback();
          return -1;
        }
        // 扩大交易池
        await exchange.update({
          total_supply: initial_liquidity,
        }, {
          transaction,
        });
        // 增加份额
        await ctx.model.query(`
          INSERT INTO exchange_balance(username, symbol, liquidity_balance) VALUES (?, ?, ?) 
          ON DUPLICATE KEY UPDATE liquidity_balance = liquidity_balance + ?;
        `, {
          raw: true,
          replacements: [
            from_username, token2_symbol, initial_liquidity, initial_liquidity,
          ],
          transaction,
        });
        // 添加日志
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        await ctx.model.ExchangeLiquidityLog.create({
          username: from_username,
          token1_symbol,
          token2_symbol,
          token1_amount,
          token2_amount,
          liquidity: initial_liquidity,
          create_time: now,
          txhash: transferResult.txhash,
        }, {
          transaction,
        });
        await transaction.commit();
      }
    } catch (error) {
      console.log(error);
      transaction.rollback();
      return -1;
    }
    return 0;
  }

  // amount是什么？是以cny衡量的份额，liquidity token
  async removeLiquidity(token1_symbol, token2_symbol, amount, min_okt, min_tokens) {
    const { ctx } = this;
    amount = parseFloat(amount);
    min_okt = parseFloat(min_okt);
    min_tokens = parseFloat(min_tokens);

    if (min_okt <= 0 || min_tokens <= 0) {
      return -1;
    }
    const from_address = ctx.user.address;
    const from_username = ctx.user.username;

    const trans = await ctx.model.transaction({
      isolationLevel: this.app.Sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
    });
    try {
      const exchange = await ctx.model.Exchange.findOne({
        where: { token1_symbol, token2_symbol },
        lock: this.app.Sequelize.Transaction.LOCK.UPDATE,
      });
      if (!exchange) {
        this.logger.error('ExchangeService.removeLiquidity no exchange');
        await trans.rollback();
        return -1;
      }
      const to_address = exchange.holder_address;
      const total_liquidity = parseFloat(exchange.total_supply);
      const token1_reserve = await ctx.service.okex.queryAccountBalance(to_address, token1_symbol);
      const token2_reserve = await ctx.service.okex.queryAccountBalance(to_address, token2_symbol);
      // 根据用户remove的amount数量计算出cny数量
      const token1_amount = parseFloat(parseFloat(amount * token1_reserve / total_liquidity).toFixed(8));
      // 计算出token数量
      const token2_amount = parseFloat(parseFloat(amount * token2_reserve / total_liquidity).toFixed(8));
      console.log({ token1_amount, min_okt, token2_amount, min_tokens });
      if (token1_amount < min_okt || token2_amount < min_tokens) {
        this.logger.error('ExchangeService.removeLiquidity token1_amount < min_okt || token2_amount < min_tokens. error: %j', { token1_amount, min_okt, token2_amount, min_tokens });
        await trans.rollback();
        return -1;
      }
      // 减少个人份额
      const balanceResult = await ctx.model.query(`
        UPDATE exchange_balance SET liquidity_balance = liquidity_balance - ? 
        WHERE username = ? AND symbol = ? AND liquidity_balance >= ?;`,
      {
        raw: true,
        replacements: [ amount, from_username, token2_symbol, amount ],
        transaction: trans,
      });
      if (balanceResult.affectedRows <= 0) {
        this.logger.error('ExchangeService.removeLiquidity balanceResult. error: %j', balanceResult);
        await trans.rollback();
        return -1;
      }
      // 减少total_supply
      const exchangeResult = await ctx.model.query(`
        UPDATE exchange SET total_supply = total_supply - ? 
        WHERE token2_symbol = ? AND total_supply >= ?;`,
      {
        raw: true,
        replacements: [ amount, token2_symbol, amount ],
        transaction: trans,
      });
      if (exchangeResult.affectedRows <= 0) {
        this.logger.error('ExchangeService.removeLiquidity exchangeResult. error: %j', exchangeResult);
        await trans.rollback();
        return -1;
      }
      // 转移资产
      const assets = [{
        symbol: token1_symbol,
        amount: token1_amount,
      }, {
        symbol: token2_symbol,
        amount: token2_amount,
      }];
      const transferResult = await this.service.okex.multiTransfer(to_address, from_address, assets);
      // 转移资产失败
      if (!transferResult) {
        this.logger.error('ExchangeService.removeLiquidity transferResult. error: %j', transferResult);
        await trans.rollback();
        return -1;
      }
      const now = moment().format('YYYY-MM-DD HH:mm:ss');
      await ctx.model.ExchangeLiquidityLog.create({
        username: from_username,
        token1_symbol,
        token2_symbol,
        token1_amount,
        token2_amount,
        liquidity: -amount,
        create_time: now,
        txhash: transferResult.txhash,
      });
      trans.commit();
      return 0;
    } catch (e) {
      // 有一种可能，两笔订单同时进来，代码同时走到首次add initial_liquidity，一笔订单会失败，这笔订单回退到status=6，成为问题订单，需要再次调用addLiquidity方法触发增加liquidity逻辑
      await trans.rollback();
      this.logger.error('ExchangeService.removeLiquidity exception. %j', e);
      return -1;
    }
  }
  // 通过cny兑换token，以输入的cny数量为准
  // cny_sold：要卖出的cny，定值
  // min_tokens：要买入的token，最小值
  async cnyToTokenInput(token1_symbol, token2_symbol, cny_sold, min_tokens) {
    const { ctx } = this;
    cny_sold = parseFloat(cny_sold);
    min_tokens = parseFloat(min_tokens);
    // 转移token
    const from_username = ctx.user.username;
    const from_address = ctx.user.address;
    // UPDATE lock
    const exchange = await ctx.model.Exchange.findOne({
      where: { token1_symbol, token2_symbol },
      lock: this.app.Sequelize.Transaction.LOCK.UPDATE,
    });
    if (!exchange) {
      this.logger.error('ExchangeService::cnyToTokenInput error exchange does not exist, symbol: %j', token2_symbol);
      return -1;
    }

    const to_address = exchange.holder_address;
    const token1_reserve = await ctx.service.okex.queryAccountBalance(to_address, token1_symbol);
    const token2_reserve = await ctx.service.okex.queryAccountBalance(to_address, token2_symbol);

    const tokens_bought = this.getInputPrice(cny_sold, token1_reserve, token2_reserve);

    // 可兑换的token数量不满足最小值
    if (tokens_bought < min_tokens) {
      return -1;
    }
    // transfer okt
    const oktTransferResult = await ctx.service.okex.transfer(from_address, to_address, cny_sold, token1_symbol);
    if (!oktTransferResult) {
      this.logger.error('service.exchange.cnyToTokenInput cnyTransfer failed Result', oktTransferResult);
      return -1;
    }
    // transfer token
    const tokenTransferResult = await ctx.service.okex.transfer(to_address, from_address, tokens_bought, token2_symbol);
    if (!tokenTransferResult) {
      this.logger.error('service.exchange.cnyToTokenInput transfer failed Result:', tokenTransferResult);
      return -1;
    }

    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    await ctx.model.ExchangePurchaseLog.create({
      username: from_username,
      sold_token_symbol: token1_symbol,
      sold_amount: cny_sold,
      bought_token_symbol: token2_symbol,
      bought_amount: tokens_bought,
      create_time: now,
      txhash1: tokenTransferResult.txhash,
      txhash2: oktTransferResult.txhash,
    });

    return 0;
  }
  // 通过token兑换cny，以输入的token数量为准
  // tokens_sold：要卖出的token数量，定值
  // min_cny：要买入的cny数量，最小值
  async tokenToCnyInput(token1_symbol, token2_symbol, tokens_sold, min_cny) {
    const { ctx } = this;
    const from_username = ctx.user.username;
    const from_address = ctx.user.address;

    tokens_sold = parseFloat(tokens_sold);
    min_cny = parseFloat(min_cny);
    // UPDATE lock
    const exchange = await ctx.model.Exchange.findOne({
      where: { token1_symbol, token2_symbol },
      lock: this.app.Sequelize.Transaction.LOCK.UPDATE,
    });
    if (!exchange) {
      this.logger.error('ExchangeService::tokenToCnyInput error exchange does not exist, symbol: %j', token2_symbol);
      return -1;
    }
    const to_address = exchange.holder_to_address;

    const token1_reserve = await ctx.service.okex.queryAccountBalance(to_address, token1_symbol);
    const token2_reserve = await ctx.service.okex.queryAccountBalance(to_address, token2_symbol);
    const cny_bought = this.getInputPrice(tokens_sold, token2_reserve, token1_reserve);
    if (cny_bought < min_cny) {
      return -1;
    }
    // transfer token
    const tokenTransferResult = await ctx.service.okex.transfer(from_address, to_address, tokens_sold, token2_symbol);
    if (!tokenTransferResult) {
      this.logger.error('service.exchange.tokenToCnyInput transfer failed Result:', tokenTransferResult);
      return -1;
    }
    // transfer okt
    const oktTransferResult = await ctx.service.okex.transfer(to_address, from_address, cny_bought, token1_symbol);
    if (!oktTransferResult) {
      this.logger.error('service.exchange.tokenToCnyInput cnyTransfer failed Result', oktTransferResult);
      return -1;
    }
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    await ctx.model.ExchangePurchaseLog.create({
      username: from_username,
      sold_token_symbol: token2_symbol,
      sold_amount: tokens_sold,
      bought_token_symbol: token1_symbol,
      bought_amount: cny_bought,
      create_time: now,
      txhash1: tokenTransferResult.txhash,
      txhash2: oktTransferResult.txhash,
    });

    return 0;
  }
  // 以输入为准计算输出的数量
  getInputPrice(input_amount, input_reserve, output_reserve) {
    if (input_reserve <= 0 || output_reserve <= 0) {
      return -1;
    }

    // input_amount = parseFloat(input_amount);
    // if (input_amount >= input_reserve) {
    //   return -2;
    // }

    const input_amount_with_fee = input_amount * 997;
    const numerator = input_amount_with_fee * output_reserve;
    const denominator = (input_reserve * 1000) + input_amount_with_fee;
    return parseFloat((numerator / denominator).toFixed(8));
  }

  // 以输出为准计算输入的数量
  getOutputPrice(output_amount, input_reserve, output_reserve) {
    if (input_reserve <= 0 || output_reserve <= 0) {
      return -1;
    }

    output_amount = parseFloat(output_amount);
    if (output_amount >= output_reserve) {
      return -2;
    }

    const numerator = input_reserve * output_amount * 1000;
    const denominator = (output_reserve - output_amount) * 997;
    return parseFloat((numerator / denominator + 0.00000001).toFixed(8));
  }
  async list(offset, limit) {
    const { ctx } = this;
    const result = await ctx.model.Exchange.findAndCountAll({
      attributes: {
        exclude: [ 'id', 'holder_username' ],
      },
      offset, limit,
    });
    return result;
  }
}

module.exports = ExchangeService;
