'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const moment = require('moment');

class UserService extends Service {
  async create({ username, password }) {
    const { ctx } = this;
    const userRow = await ctx.model.User.find({ where: { username } });
    if (userRow !== null) {
      return ctx.msg.nameHadUsed;
    }
    const { address, pubkey, mnemonic } = await ctx.service.okex.createAccount(username);
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    const createResult = await ctx.model.User.create({
      username,
      password: ctx.helper.md5(password),
      address,
      pubkey,
      mnemonic,
      create_time: now,
      last_login_time: now,
      reg_ip: ctx.ip,
      last_login_ip: ctx.ip,
    });
    ctx.logger.info('user.create success result: ', createResult);
    return {
      ...ctx.msg.success,
      data: {
        username,
        address,
        mnemonic,
      },
    };
  }
  async find(username) {
    const { ctx } = this;
    return ctx.model.User.find({ where: { username } });
  }
  async update({ nickname = null, avatar = null }, username) {
    const { ctx } = this;
    const updates = {};
    if (nickname) updates.nickname = nickname;
    if (avatar) updates.avatar = avatar;
    ctx.model.User.update(updates, {
      where: { username },
    });
  }
  async uploadImage(filename, filelocation) {
    const { ctx } = this;

    let result = null;
    try {
      result = await ctx.oss.put(filename, filelocation);
      await fs.unlinkSync(filelocation);
    } catch (err) {
      this.app.logger.error('PostService:: uploadImage error: %j', err);
      return 2;
    }

    if (!result) {
      return 3;
    }

    this.app.logger.info('PostService:: uploadImage success: ' + filename);
    return 0;
  }
}

module.exports = UserService;
