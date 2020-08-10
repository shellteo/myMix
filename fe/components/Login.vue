<template>
  <div class="login-card">
    <el-form
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
      <el-form-item class="ss-btn">
        <el-button type="primary" native-type="submit" @click="submitLoginForm">
          Login
        </el-button>
      </el-form-item>
    </el-form>
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
      }
    }
  },
  computed: {},
  methods: {
    submitLoginForm() {}
  }
}
</script>

<style scoped lang="scss">
.login-card {
  max-width: 400px;
  margin: 0 auto;
}
</style>
