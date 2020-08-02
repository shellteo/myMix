'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async list() {
    const ctx = this.ctx;
    // ctx.body = await ctx.renderString('{{ name }}', { name: 'local' });
    // not need to assign `ctx.render` to `ctx.body`
    await ctx.render('test.nj', { name: 'view test' });
  }
}

module.exports = TestController;
