'use strict';

/* const Web3 = require('web3');
const { SocialMoneyFactoryABI, UniswapFactoryABI, SocialMoneyFactoryAddress, UniswapFactoryAddress, infuraKey } = require('./app/contract'); */

class Bootstrapper {

  constructor(app) {
    this.app = app;
  }

  async didReady() {
    console.log('didReady....');
    /* const ctx = await this.app.createAnonymousContext();
    await this.loadWeb3(ctx); */
  }
  /* async loadWeb3(ctx) {
    const ApiEndpoint = `https://rinkeby.infura.io/v3/${infuraKey}`;
    const WssEndpoint = `wss://rinkeby.infura.io/ws/v3/${infuraKey}`;
    const HttpProvider = new Web3.providers.HttpProvider(ApiEndpoint);
    const WebsocketProvider = new Web3.providers.WebsocketProvider(WssEndpoint);
    const web3 = new Web3(HttpProvider);
    web3.setProvider(WebsocketProvider);
    this.app.web3 = web3;
    const factoryContractInstance = new web3.eth.Contract(SocialMoneyFactoryABI, SocialMoneyFactoryAddress);
    const uniswapFactoryInstance = new web3.eth.Contract(UniswapFactoryABI, UniswapFactoryAddress);
    factoryContractInstance.events.NewToken({})
      .on('data', async event => {
        ctx.logger.info('app loadWeb3 event NewToken: %j', event);
        const { token_id, owner, token, total_supply, name, symbol, decimals } = event.returnValues;
        await ctx.service.token.create({
          owner,
          token_id,
          token_address: token,
          total_supply, name, symbol, decimals,
        });
        // const blockNumber = event.blockNumber;
        // const trx = event.transactionHash;
      })
      .on('error', error => {
        ctx.logger.error('app loadWeb3 event ProposalCreated: %j', error);
      });
    uniswapFactoryInstance.events.NewExchange({})
      .on('data', async event => {
        ctx.logger.info('app loadWeb3 event NewToken: %j', event);
        const { token, exchange } = event.returnValues;
        await ctx.service.token.updateExchange(token, exchange);
      })
      .on('error', error => {
        ctx.logger.error('app loadWeb3 event ProposalCreated: %j', error);
      });
  } */

}

module.exports = Bootstrapper;
