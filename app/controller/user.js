'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
const moment = require('moment');
const md5 = require('crypto-js/md5');

/* const createLoginRule = {
  email: {
    type: 'email',
    required: true,
  },
  password: {
    type: 'string',
    required: true,
    min: 6,
    max: 20,
  },
};
const createRegisterRule = {
  ...createLoginRule,
  code: {
    type: 'string',
    required: true,
    min: 6,
    max: 6,
  },
}; */

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    const ret = await ctx.service.user.create({
      username,
      password,
    });
    if (ret.code === 0) {
      await this.jwtSign(ret.data);
    } else {
      ctx.body = ret;
    }
  }
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;

    const userRow = await ctx.service.user.find(username);
    if (userRow === null) {
      ctx.body = ctx.msg.userNotExist;
    } else if (userRow.password !== ctx.helper.md5(password)) {
      ctx.body = ctx.msg.psdError;
    } else {
      const user = {
        username,
        address: userRow.address,
      };
      await this.jwtSign(user);
    }
  }
  async jwtSign(user) {
    this.logger.info('Controller::user jwt sign %j', user);
    const { ctx, config } = this;
    const token = jwt.sign(user, config.login.secretKey, {
      expiresIn: config.login.expires,
    });
    const ret = ctx.msg.success;
    ret.data = {
      access_token: token,
      expires_in: Math.floor(Date.now() / 1000) + config.login.expires,
      ...user,
    };
    ctx.body = ret;
  }
  async userInfo() {
    const { ctx } = this;
    const username = ctx.user.username;
    const userRow = await ctx.service.user.find(username);
    if (userRow === null) {
      ctx.body = ctx.msg.userNotExist;
    } else {
      const { nickname, avatar, address } = userRow;
      ctx.body = {
        ...ctx.msg.success,
        data: {
          username,
          nickname,
          avatar,
          address,
        },
      };
    }
  }
  async update() {
    const { ctx } = this;
    const username = ctx.user.username;
    const { nickname, avatar } = ctx.request.body;
    const userRow = await ctx.service.user.update({ nickname, avatar }, username);
    ctx.body = {
      ...ctx.msg.success,
      data: userRow,
    };

  }
  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const filetype = file.filename.split('.');

    // file in oss path
    const filename = '/avatar/'
      + moment().format('YYYY/MM/DD/')
      + md5(file.filepath).toString()
      + '.' + filetype[filetype.length - 1];

    // const filelocation = 'uploads/' + path.basename(file.filename);

    // filepath need to change
    const uploadStatus = await this.service.user.uploadImage(filename, file.filepath);

    if (uploadStatus !== 0) {
      ctx.body = ctx.msg.uploadFailure;
      return;
    }

    ctx.body = ctx.msg.success;
    ctx.body.data = { url: filename };
  }
  async balance() {
    const { ctx } = this;
    const { symbol } = ctx.query;
    const address = ctx.user.address;
    const balance = await this.service.okex.queryAccountBalance(address, symbol);

    ctx.body = {
      ...ctx.msg.success,
      data: balance,
    };
  }
  async exchange() {
    const { ctx } = this;
    const { symbol } = ctx.query;

    const exchange = await this.service.exchange.getExchange(symbol);
    if (exchange === null) {
      ctx.body = ctx.msg.exchangeNotExist;
      return;
    }
    const total_liquidity = parseFloat(exchange.total_supply);

    const username = ctx.user.username;
    const balance = await this.service.exchangeBalance.find(username, symbol);
    const user_liquidity = parseFloat(balance.liquidity_balance);
    if (balance === null || user_liquidity <= 0 || total_liquidity <= 0) {
      ctx.body = {
        ...ctx.msg.success,
        data: {
          okt_amount: 0,
          token_amount: 0,
          liquidity: 0,
        },
      };
      return;
    }

    const address = exchange.holder_address;
    const token_reserve = await this.service.okex.queryAccountBalance(address, symbol);
    const okt_reserve = await this.service.okex.queryAccountBalance(address, 'tokt');

    // 根据用户remove的amount数量计算出cny数量
    const okt_amount = parseFloat(okt_reserve * user_liquidity / total_liquidity);
    // 计算出token数量
    const token_amount = parseFloat(token_reserve * user_liquidity / total_liquidity);
    ctx.body = {
      ...ctx.msg.success,
      data: {
        okt_amount,
        token_amount,
        user_liquidity,
      },
    };
  }
}

module.exports = UserController;
