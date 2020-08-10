# Backend

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

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



1. exchange servie各个函数传参修改，是否需要username，to_address命名修改
2. exchange数据库表的修改，改成total_supply
3. exchange_liquidity_log数据库表的修改，liquidity允许负数
4. okex service错误处理返回，以至于影响到exchange service的错误处理
5. sequelize的锁和事务的测试，是否可以使用，update返回值的数据是什么，如何判断
