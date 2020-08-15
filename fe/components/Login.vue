<template>
  <div class="login-card">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="ss-form"
      @submit.native.prevent
    >
      <el-form-item prop="username" label="Username">
        <el-input
          v-model="loginForm.username"
          placeholder="please enter your username"
        />
      </el-form-item>
      <el-form-item prop="password" label="Password">
        <el-input
          v-model="loginForm.password"
          placeholder="please enter your password"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item class="ss-btn">
        <el-button class="mix-btn" type="primary" native-type="submit" @click="submitLoginForm">
          Sign In
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { SetToken } from '@/utils'
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter password'))
      } else {
        callback()
      }
    }
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter username'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  methods: {
    submitLoginForm() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const { username, password } = this.loginForm
          const res = await this.$request.post('/api/user/login', {
            username,
            password
          })
          if (res.code === 0) {
            const accessToken = res.data.access_token
            SetToken(accessToken)
            this.$router.push({
              path: '/exchange'
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.login-card {
  max-width: 400px;
  margin: 0 auto;
}
</style>
<style lang="scss">
.mix-btn {
  width: 100%;
  border-radius: 50px;
  margin-top: 20px;
}
</style>
