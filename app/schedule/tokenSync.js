'use strict';

const Subscription = require('egg').Subscription;
const events = require('../contract/events');


class TokenSync extends Subscription {

  static get schedule() {
    return {
      interval: '60s',
      type: 'worker',
      immediate: true,
    };
  }

  async subscribe() {
    return;
    // --------------start sync token--------------
    const _tokenFromBlock = await this.ctx.model.query('SELECT MAX(token_block_number) as blockNumber from token;', {
      raw: true,
      model: this.ctx.model.Token,
    });
    const tokenFromBlock = _tokenFromBlock[0].blockNumber || 0;
    this.ctx.logger.info('job:subscribe:tokenFromBlock', tokenFromBlock);
    const result1 = await events.newToken(tokenFromBlock);
    await this.syncToken2DB(result1);
    // --------------end--------------

    // -----------start sync exchange-------------
    const _exchangeFromBlock = await this.ctx.model.query('SELECT MAX(exchange_block_number) as blockNumber from token;', {
      raw: true,
      model: this.ctx.model.Token,
    });
    const exchangeFromBlock = _exchangeFromBlock[0].blockNumber || 0;
    this.ctx.logger.info('job:subscribe:exchangeFromBlock', exchangeFromBlock);
    const result2 = await events.newExchange(exchangeFromBlock);
    await this.syncExchange2DB(result2);
    // -----------end---------------
  }
  async syncToken2DB(events) {
    return;
    for (const event of events) {
      const { token_id, owner, token, total_supply, name, symbol, decimals } = event.returnValues;
      const token_block_number = event.blockNumber;
      const existence = await this.ctx.model.Token.find({ where: { token_id } });
      if (!existence) {
        await this.ctx.model.Token.create({
          symbol,
          name,
          total_supply,
          decimals,
          owner,
          token_id,
          token_address: token,
          exchange_address: '',
          token_block_number,
          exchange_block_number: 0,
          logo: null,
        });
      }
    }
  }
  async syncExchange2DB(events) {
    for (const event of events) {
      const { token: token_address, exchange: exchange_address } = event.returnValues;
      const exchange_block_number = event.blockNumber;
      await this.ctx.model.Token.update({
        exchange_address,
        exchange_block_number,
      }, {
        where: {
          token_address,
        },
      });
    }
  }
}


module.exports = TokenSync;
