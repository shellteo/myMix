'use strict';

const Service = require('egg').Service;
const { SocialMoneyABI } = require('../contract');
const exec = require('child_process').exec;

class TokenService extends Service {
  async create({ owner, token_id, token_address, total_supply, name, symbol, decimals }) {
    const { ctx } = this;
    // const { totalSupply, name, symbol, decimals } = await this.getTokenInfo(token_address);
    const result = await ctx.model.Token.create({
      symbol,
      name,
      total_supply,
      decimals,
      owner,
      token_id,
      token_address,
      exchange_address: '',
      logo: null,
    });
    ctx.logger.info('TokenService create: %j', result);
  }
  async updateExchange(token_address, exchange_address) {
    const { ctx } = this;
    const result = await ctx.model.Token.update({
      exchange_address,
    }, {
      where: {
        token_address,
      },
    });
    ctx.logger.info('TokenService updateExchange: %j', result);
  }
  async find(symbol) {
    const { ctx } = this;
    return ctx.model.Token.find({
      where: {
        word_jianti: symbol,
      },
    });
  }
  async getExchangeList(offset, limit) {
    const { ctx } = this;
    const result = {};
    result.count = await ctx.model.Token.count({
      where: {
        exchange_address: {
          $ne: '',
        },
      },
    });
    result.rows = await ctx.model.Token.findAll({
      offset, limit,
      where: {
        exchange_address: {
          $ne: '',
        },
      },
    });
    return result;
  }
  async list(offset, limit) {
    const { ctx } = this;
    const result = {};
    result.count = await ctx.model.Token.count();
    result.rows = await ctx.model.Token.findAll({
      offset, limit,
    });
    return result;
  }
  /* erc20Instance(_address) {
    const web3 = this.app.web3;
    const instance = new web3.eth.Contract(SocialMoneyABI, _address);
    return instance;
  }
  async getTokenInfo(tokenAddress) {
    console.log('test');
    const tokenInstance = this.erc20Instance(tokenAddress);
    const totalSupply = await tokenInstance.methods.totalSupply().call();
    const name = await tokenInstance.methods.name().call();
    const symbol = await tokenInstance.methods.symbol().call();
    const decimals = await tokenInstance.methods.decimals().call();
    console.log('test');
    return {
      totalSupply, name, symbol, decimals,
    };
  } */
}

module.exports = TokenService;
