# MixSwap

## Introduction
MixSwap is an on-chain system of smart contracts on the okchain blockchain, implementing an automated liquidity protocol based on a “constant product formula”. 
Traders pay a 30-basis-point fee on trades, which goes to liquidity providers. Supporting only pairs between Token on okchain and OKT.


## Swap And Add Liquidity
A small liquidity provider fee (0.30%) is taken out of each trade and added to the reserves. While the OKT-Token reserve ratio is constantly shifting, fees makes sure that the total combined reserve size increases with every trade. This functions as a payout to liquidity providers that is collected when they burn their pool tokens to withdraw their portion of total reserves. Guaranteed arbitrage opportunities from price fluctuations should push a steady flow of transactions through the system and increase the amount of fee revenue generated.


![swap](https://mixswap.oss-cn-hangzhou.aliyuncs.com/swap.jpg)
![addLiquidity](https://mixswap.oss-cn-hangzhou.aliyuncs.com/addLiquidity.jpg)

## Sign up And Sign In
You can create a account using this system and sign in!

![sign up](https://mixswap.oss-cn-hangzhou.aliyuncs.com/signup.jpg)
![mnemonic](https://mixswap.oss-cn-hangzhou.aliyuncs.com/mnemonic.jpg)
![sign in](https://mixswap.oss-cn-hangzhou.aliyuncs.com/signin.jpg)

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


