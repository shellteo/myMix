<template>
  <div class="IE-flex-fix">
    <!-- <g-header /> -->
    <div class="sign">
      <div class="logo">
        <img src="https://mixswap.oss-cn-hangzhou.aliyuncs.com/mixswap_logo_white.png" alt="logo">
      </div>
      <div class="auth-card">
        <h4 class="title">
          <div class="normal-title">
            <a :class="type === 'sign_up' ? 'active': ''" @click="tabClick('#sign_up')">Sign Up</a>
            <b> / </b>
            <a :class="type === 'sign_in' ? 'active': ''" @click="tabClick('#sign_in')">Sign In</a>
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
    tabClick(hash) {
      this.$router.replace({ hash })
    }
  }
}
</script>

<style scoped lang="scss" >
.IE-flex-fix {
  background-color: #fff;
}
.sign {
  text-align: center;
  font-size: 14px;
  background-color: rgb(44, 47, 54);
  .logo {
    width: 200px;
    position: absolute;
    top: 56px;
    margin-left: 50px;
    img {
      width: 200px;
    }
  }
  .title {
    margin: 0 auto 20px;
    padding: 10px;
    font-weight: 400;
    color: #969696;
    font-size: 18px;
    a {
      cursor: pointer;
      padding: 10px;
      color: #969696;
      text-decoration: none;
    }
    .active {
      color: #d93025;
      border-bottom: 2px solid #d93025;
    }
    b {
      padding: 10px;
    }
  }
}
.auth-card {
  width: 300px;
  margin: 10vh auto 0;
  padding: 50px 50px 30px;
  background-color: #fff;
  border-radius: 20px;
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
