'use strict';
const SocialMoneyFactoryJSON = require('./SocialMoneyFactory.json');
const SocialMoneyJSON = require('./SocialMoney.json');
const UniswapFactoryABI = require('./uniswap_factory.json');

module.exports = {
  SocialMoneyFactoryABI: SocialMoneyFactoryJSON.abi,
  UniswapFactoryABI,
  SocialMoneyABI: SocialMoneyJSON.abi,
  SocialMoneyFactoryAddress: '0x34c2856530Ca9b9D3590c047D45BFc97995d6403',
  UniswapFactoryAddress: '0xc4d477bcf1578ebf4dee2318e19ab7649a83f5bb',
  infuraKey: '2e935bd97a964208a7009f6c47b27757',
};
