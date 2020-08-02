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
  async queryTokenInfo() {
    const symbol = 'zxt-20a';
    const cmd = `okchaincli query token info ${symbol}`;
    return this.genPromise(cmd);
  }
  async issueToken(symbol, totalSupply, wholeName, desc) {
    const cmd = `okchaincli tx token issue --from zxplus --symbol ${symbol} --total-supply ${totalSupply} --whole-name '${wholeName}' --desc '${desc}' -b block --mintable --fees=0.002tokt`;
    return this.genPromise(cmd);
  }
  async transfer(from, to, amount, symbol) {
    const am_sy = '' + amount + symbol;
    const cmd = `okchaincli tx send ${from} ${to} ${am_sy} --fees=0.002tokt`;
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
}

module.exports = OkexService;
