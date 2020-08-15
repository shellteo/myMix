<template>
  <nav class="header-out">
    <div class="logo">
      <img src="https://mixswap.oss-cn-hangzhou.aliyuncs.com/mixswap_logo_white.png" alt="logo">
    </div>
    <div v-if="isLogined" class="user-out">
      <div class="user-balance">{{ info.balance }} TOKT</div>
      <button class="user-info" @click="show"><p class="address">{{ info.address }}</p>🦁</button>
    </div>
    <div v-else class="user-out2">
      <n-link
        :to="{ path: 'wallet#sign_up' }"
      >
        <button class="sign-out"><p class="sign-in">Sign Up</p></button>
      </n-link>
      <n-link
        :to="{ path: 'wallet#sign_in' }"
      >
        <button class="sign-out"><p class="sign-in">Sign In</p></button>
      </n-link>
    </div>
  </nav>
</template>
<script>
// import { mapGetters } from 'vuex'
import { getToken } from '@/utils/index'
import consts from '@/utils/consts'
export default {
  components: {
    // Web3Status
  },
  data() {
    return {
      page: '',
      uniswapURL: consts.uniswapURL,
      isLogined: false,
      info: {}
    }
  },
  computed: {
  },
  mounted() {
    this.page = this.$route.name
    this.isLogined = !!getToken('ACCESS_TOKEN')
    if (this.isLogined) {
      this.getBalance()
    }
  },
  methods: {
    show() {
      console.log(this.$store.state.userModalShow)
      this.$store.commit('SET_USER_MODAL_SHOW', true)
      console.log(this.$store.state.userModalShow)
    },
    async getBalance() {
      const res = await this.$request.get('/api/user/info')
      if (res.code === 0) {
        this.info = res.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-out {
  box-sizing: border-box;
  min-width: 0px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px;
  padding: 1rem 1rem 0px;
  .logo {
    img {
      width: 130px;
    }
  }
  .user-out {
    a {
      text-decoration: none;
      margin-left: 10px;
    }
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: rgb(64, 68, 79);
    white-space: nowrap;
    border-radius: 12px;
    color: #ffffff;
    .user-balance {
      box-sizing: border-box;
      min-width: 0px;
      padding-left: 0.75rem;
      padding-right: 0.5rem;
      font-weight: 500;
      margin: 0px;
      flex-shrink: 0;
    }
    .user-info {
      text-align: center;
      justify-content: center;
      position: relative;
      z-index: 1;
      font-size: 16px;
      display: flex;
      width: 100%;
      align-items: center;
      cursor: pointer;
      user-select: none;
      background-color: rgb(44, 47, 54);
      color: rgb(255, 255, 255);
      font-weight: 500;
      outline: none;
      text-decoration: none;
      flex-flow: row nowrap;
      padding: 0.3rem;
      border-radius: 12px;
      border-width: 1px;
      border-style: solid;
      border-color: rgb(64, 68, 79);
      border-image: initial;
      box-sizing: border-box;
      min-width: 0px;
      appearance: none;
      &:hover, &:focus {
        background-color: rgb(55, 59, 68);
      }
      .address {
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 1rem;
        width: 100px;
        font-weight: 500;
        flex: 1 1 auto;
        overflow: hidden;
        margin: 0px 0.5rem 0px 0.25rem;
      }
    }
  }
}

.user-out2 {
  a {
    text-decoration: none;
    margin-left: 10px;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  border-radius: 12px;
  color: #ffffff;
}
.sign-out {
  text-align: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  font-size: 16px;
  display: flex;
  width: 100%;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-weight: 500;
  background-color: rgba(21, 61, 111, 0.44);
  color: rgb(109, 168, 255);
  outline: none;
  text-decoration: none;
  flex-flow: row nowrap;
  padding: 0.5rem;
  border-radius: 12px;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(21, 61, 111, 0.44);
  border-image: initial;
  &:hover {
    color: rgb(83, 153, 255);
    border-width: 1px;
    border-style: solid;
    border-color: rgba(49, 95, 154, 0.44);
    border-image: initial;
  }
  .sign-in {
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1rem;
    width: fit-content;
    font-weight: 500;
    flex: 1 1 auto;
    overflow: hidden;
    margin: 0px 0.5rem 0px 0.25rem;
    user-select: none;
  }
}
</style>
