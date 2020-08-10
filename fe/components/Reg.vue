<template>
  <div class="login-card">
    <el-form
      v-if="step === 1"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="ss-form"
      @submit.native.prevent
    >
      <el-form-item prop="username" label="User Name">
        <el-input
          v-model="loginForm.username"
          placeholder="please input user name"
        />
      </el-form-item>
      <el-form-item prop="password" label="User Password">
        <el-input
          v-model="loginForm.password"
          placeholder="please input your password"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item prop="password" label="Repeat User Password">
        <el-input
          v-model="loginForm.rePassword"
          placeholder="please repeat your password"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item class="ss-btn">
        <el-button type="primary" native-type="submit" @click="submitLoginForm">
          Create a OKChain Account
        </el-button>
      </el-form-item>
    </el-form>
    <div v-if="step === 2">
      <p>please remember your mnemonic</p>
      <div class="mnemonic">
        <span v-for="(item, key) of mnemonicArr" :key="key" class="mnemonic-item">
          {{ item }}
        </span>
      </div>
      <br>
      <el-button type="primary" native-type="submit" @click="submitLoginForm">
        Mnemonic Already Written Down
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        rePassword: ''
      },
      loginRules: {
        username: [
          {
            required: true,
            message: '1',
            trigger: ''
          }
        ],
        password: [
          {
            required: true,
            message: '1',
            trigger: ''
          },
          {
            min: 8,
            max: 16,
            message: '1',
            trigger: ''
          }
        ]
      },
      mnemonic: 'aaa bbb ccc ddd eee gggg dsd sdsds sddsds zcxxc cxzc xczzx',
      step: 1
    }
  },
  computed: {
    mnemonicArr() {
      return this.mnemonic.split(' ')
    }
  },
  methods: {
    submitLoginForm() {
      this.step = 2
    }
  }
}
</script>

<style scoped lang="scss">
.login-card {
  max-width: 400px;
  margin: 0 auto;
}
.mnemonic {
  background: #cccccc;
  padding: 10px;
  span.mnemonic-item {
    background: #fff;
    display: inline-block;
    color: #505050;
    padding: 4px 10px;
    margin-right: 8px;
    margin-bottom: 8px;
    font-size: 14px;
  }
}
</style>
