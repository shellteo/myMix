'use strict';

const Service = require('egg').Service;
const exec = require('child_process').exec;

class OkexService extends Service {
  async genPromise(cmd) {
    return new Promise((resolve, reject) => {
      console.log(cmd);
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.log('cmd error', error);
          return reject(error);
        }
        try {
          const res = JSON.parse(stdout || stderr);
          return resolve(res);
        } catch (e) {
          console.log('JSON.parse error', e);
          return reject(e);
        }
      });
    });
  }
  async queryTokenInfo(symbol) {
    const cmd = `okchaincli query token info ${symbol}`;
    let token = null;
    try {
      token = await this.genPromise(cmd);
      return token;
    } catch (error) {
      return null;
    }
    // return this.genPromise(cmd);
  }
  async issueToken(symbol, totalSupply, wholeName, desc) {
    const cmd = `okchaincli tx token issue --from zxplus --symbol ${symbol} --total-supply ${totalSupply} --whole-name '${wholeName}' --desc '${desc}' -b block --mintable --fees=0.002tokt`;
    return this.genPromise(cmd);
  }
  async transfer(from, to, amount, symbol) {
    const am_sy = '' + amount + symbol;
    const cmd = `okchaincli tx send ${from} ${to} ${am_sy} --fees=0.002tokt -y`;
    return this.genPromise(cmd);
  }
  async multiTransfer(from, to, coins = []) {
    const strArr = [];
    for (const item of coins) {
      strArr.push(item.amount + '' + item.symbol);
    }
    const am_sy = strArr.join(',');
    const cmd = `okchaincli tx token multi-send --from ${from} --transfers '[{"to":"${to}","amount":"${am_sy}"}]' --fees=0.002tokt -y`;
    return this.genPromise(cmd);
  }
  async createAccount(name) {
    const cmd = `okchaincli keys add ${name}`;
    return this.genPromise(cmd);
  }
  async keyList() {
    const cmd = 'okchaincli keys list';
    return this.genPromise(cmd);
  }
  async recoverAccountByMnemonic(mnemonicPhrases) {
    const cmd = `okchaincli keys add --recover admin -y -m "${mnemonicPhrases}"`;
    return this.genPromise(cmd);
  }
  async showAccount(name) {
    const cmd = `okchaincli keys show ${name}`;
    return this.genPromise(cmd);
  }
  async queryAccount(address) {
    const cmd = `okchaincli query account ${address}`;
    return this.genPromise(cmd);
  }
  async queryAccountBalance(address, symbol) {
    const url = `https://www.okex.me/okchain/v1/accounts/${address}?symbol=${symbol}`;
    console.log(url);
    const result = await this.app.curl(url, {
      method: 'GET',
      dataType: 'json',
    });
    if (result.status === 200 && result.data.code === 0) {
      const currencies = result.data.data.currencies;
      if (currencies && currencies.length > 0) {
        return parseFloat(currencies[0].available);
      }
    }
    return 0;
  }
  async queryAccountFromAPI(address) {
    const url = `https://www.okex.me/okchain/v1/accounts/${address}`;
    const result = await this.app.curl(url, {
      method: 'GET',
      dataType: 'json',
    });
    if (result.status === 200 && result.data.code === 0) {
      return result.data.data;
    }
    return null;
  }
}

module.exports = OkexService;
