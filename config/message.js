'use strict';

// 错误码统一编码，提示信息多语言
module.exports = {
  returnObj(lang) {

    const en = {
      lang: 'en',
    };

    const zh = {
      lang: 'zh',
      success: { code: 0, message: 'success' },
      nameHadUsed: { code: 2000001, message: '用户名已被使用' },
      psdError: { code: 2000002, message: '密码错误' },
      codeError: { code: 2000002, message: '验证码错误' },
      userExists: { code: 2000002, message: '用户已存在' },
      userNotExist: { code: 2000003, message: '用户不存在' },
      APNotEnough: { code: 2000005, message: '次数已用完' },
      createFailed: { code: 2000006, message: '创建失败' },
      mailSendFailed: { code: 2000007, message: '邮件发送失败' },
      uploadFailure: { code: 2000008, message: '文件上传失败' },
      likedFailure: { code: 2000009, message: '点赞失败' },
      hasLiked: { code: 2000010, message: '已经点过赞' },

      loginFailed: { code: 3000001, message: '登录失败' },
      verifyFailed: { code: 4000001, message: '校验失败' },
      tokenNotExist: { code: 5000001, messaeg: 'token does not exist' },
      exchangeExist: { code: 5000002, messaeg: 'exchange already exist' },
      exchangeNotExist: { code: 5000003, messaeg: 'exchange does not exist' },
      failed: { code: 6000001, messaeg: 'failed' },
    };
    let message;

    switch (lang) {
      case 'en':
        message = en;
        break;
      case 'zh':
        message = zh;
        break;
      default:
        message = zh;
        break;
    }

    return message;
  },

};
