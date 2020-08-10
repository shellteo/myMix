<template>
  <div class="IE-flex-fix">
    <!-- <g-header /> -->
    <div class="sign">
      <div class="logo">
        <img src="https://mixswap.oss-cn-hangzhou.aliyuncs.com/mixswap_logo.jpg" alt="logo">
      </div>
      <div class="auth-card">
        <h4 class="title">
          <div class="normal-title">
            <a :class="type === 'sign_up' ? 'active': ''" href="#sign_up">Sign Up</a>
            <b> / </b>
            <a :class="type === 'sign_in' ? 'active': ''" href="#sign_in">Login</a>
          </div>
        </h4>
        <Reg v-if="type === 'sign_up'" />
        <Login v-if="type === 'sign_in'" />
      </div>
      <!-- <g-footer /> -->
    </div>
  </div>
</template>

<script>
import Reg from '@/components/Reg'
import Login from '@/components/Login'
export default {
  components: {
    Reg,
    Login
  },
  data() {
    return {
      type: 'sign_up'
    }
  },
  computed: {
  },
  watch: {
    $route: {
      handler(to, from) {
        if (to.hash === '#sign_in') {
          this.type = 'sign_in'
        } else {
          this.type = 'sign_up'
        }
      },
      immediate: true
    }
  },
  methods: {
    submitLoginForm() {}
  }
}
</script>

<style scoped lang="scss" >
.IE-flex-fix {
  background-color: #fff;
}
.sign {
  height: 100%;
  min-height: 750px;
  text-align: center;
  font-size: 14px;
  background-color: #fff;
  .logo {
    width: 200px;
    position: absolute;
    top: 56px;
    margin-left: 50px;
  }
  .title {
    margin: 0 auto 50px;
    padding: 10px;
    font-weight: 400;
    color: #969696;
    font-size: 18px;
    a {
      cursor: pointer;
      padding: 10px;
      color: #969696;
    }
    .active {
      color: red;
      border-bottom: 2px solid red;
    }
    b {
      padding: 10px;
    }
  }
}
.auth-card {
  width: 400px;
  margin: 160px auto 0;
  padding: 50px 50px 30px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0,0,0,.1);
  vertical-align: middle;
  display: inline-block;
}
// <1000px
@media screen and (max-width: 1000px) {
  .sign {
    .logo {
      display: none;
    }
  }
}
</style>
