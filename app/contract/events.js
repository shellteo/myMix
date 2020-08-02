
'use strict';

const Web3 = require('web3');
const { SocialMoneyFactoryABI, UniswapFactoryABI, SocialMoneyFactoryAddress, UniswapFactoryAddress, infuraKey } = require('./index');


const ApiEndpoint = `https://rinkeby.infura.io/v3/${infuraKey}`;
const WssEndpoint = `wss://rinkeby.infura.io/ws/v3/${infuraKey}`;
const HttpProvider = new Web3.providers.HttpProvider(ApiEndpoint);
const WebsocketProvider = new Web3.providers.WebsocketProvider(WssEndpoint);
const web3 = new Web3(HttpProvider);
web3.setProvider(WebsocketProvider);
const factoryContractInstance = new web3.eth.Contract(SocialMoneyFactoryABI, SocialMoneyFactoryAddress);
const uniswapFactoryInstance = new web3.eth.Contract(UniswapFactoryABI, UniswapFactoryAddress);

module.exports = {
  async newToken(fromBlock) {
    return new Promise((resolve, reject) => {
      factoryContractInstance.getPastEvents('NewToken', {
        fromBlock,
        toBlock: 'latest',
      }, (error, events) => {
        if (error) {
          reject(error);
        } else {
          resolve(events);
        }
      });
    });
  },
  async newExchange(fromBlock) {
    return new Promise((resolve, reject) => {
      uniswapFactoryInstance.getPastEvents('NewExchange', {
        fromBlock,
        toBlock: 'latest',
      }, (error, events) => {
        if (error) {
          reject(error);
        } else {
          resolve(events);
        }
      });
    });
  },
};
