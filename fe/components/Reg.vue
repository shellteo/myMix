<template>
  <div class="login-card">
    <el-form
      v-if="step === 1"
      ref="form"
      :model="form"
      :rules="rules"
      class="ss-form"
      @submit.native.prevent
    >
      <el-form-item prop="username" label="Username">
        <el-input
          v-model="form.username"
          placeholder="please enter username"
        />
      </el-form-item>
      <el-form-item prop="password" label="Password">
        <el-input
          v-model="form.password"
          placeholder="please enter password"
          type="password"
          show-password
        />
      </el-form-item>
      <ul>
        <li :class="{ is_valid: passwordRule.contains_eight_characters }">8 Characters</li>
        <li :class="{ is_valid: passwordRule.contains_number }">Contains Number</li>
        <li :class="{ is_valid: passwordRule.contains_uppercase }">Contains Uppercase</li>
      </ul>
      <el-form-item prop="rePassword" label="Confirm Password">
        <el-input
          v-model="form.rePassword"
          placeholder="please re-enter password"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item class="ss-btn">
        <el-button class="mix-btn" type="primary" native-type="submit" @click="submit">
          Create OKChain Account
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
      <el-button class="mix-btn" type="primary" native-type="submit" @click="Written">
        Mnemonic Already Written Down
      </el-button>
    </div>
  </div>
</template>

<script>
import { SetToken } from '@/utils'
export default {
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please re-enter your password'))
      } else if (value !== this.form.password) {
        callback(new Error('The passwords you typed do not match'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter password'))
      } else {
        const containsEightCharacters = value.length > 8
        const containsNumber = /\d/.test(value)
        const containsUppercase = /[A-Z]/.test(value)
        if (!containsEightCharacters || !containsNumber || !containsUppercase) {
          callback(new Error('Incorrect password format!'))
        } else {
          if (this.form.rePassword !== '') {
            this.$refs.form.validateField('rePassword')
          }
          callback()
        }
      }
    }
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter username'))
      } else {
        const containsEightCharacters = value.length >= 6
        if (!containsEightCharacters) {
          callback(new Error('Incorrect format:username length need >= 6!'))
        } else {
          callback()
        }
      }
    }
    return {
      passwordRule: {
        contains_eight_characters: false,
        contains_number: false,
        contains_uppercase: false
      },
      form: {
        username: '',
        password: '',
        rePassword: ''
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        rePassword: [
          { validator: validatePass2, trigger: 'blur' }
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
  watch: {
    'form.password'(password) {
      this.checkPassword(password)
    }
  },
  methods: {
    Written() {
      this.$router.push({
        path: '/exchange'
      })
    },
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const { username, password } = this.form
          const res = await this.$request.post('/api/user/register', {
            username,
            password
          })
          if (res.code === 0) {
            this.mnemonic = res.data.mnemonic
            this.step = 2
            SetToken(res.data.access_token)
          } else {
            this.$message.error('something went wrong, please refresh the current page')
          }
        } else {
          return false
        }
      })
    },
    checkPassword(password) {
      this.passwordRule.contains_eight_characters = password.length > 8
      this.passwordRule.contains_number = /\d/.test(password)
      this.passwordRule.contains_uppercase = /[A-Z]/.test(password)
      // const format = /[ !@#$%^&*()_+\-=[]{};':"\\|,.<>\/?]/
      // this.contains_special_character = format.test(this.password)
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

ul {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  li {
    margin-bottom: 8px;
    color: #525f7f;
    position: relative;
    &::before {
      content: "";
      width: 0%; height: 2px;
      background: #409eff;
      position: absolute;
      left: 0; top: 50%;
      display: block;
      transition: all .6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
  }
}

.is_valid { color: rgba(136, 152, 170, 0.8); }
.is_valid:before { width: 100%; }
</style>
