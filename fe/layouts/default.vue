<template>
  <div class="container">
    <nuxt />
    <AuthModal v-model="loginModalShow" :type="loginModalType" :title="loginModalTitle" />
    <UserModal v-model="userModalShow" />
    <transition name="el-fade-in-linear">
      <MixLoading v-show="pageLoading" />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import AuthModal from '@/components/Auth/index.vue'
import UserModal from '@/components/UserModal.vue'
import MixLoading from '@/components/Loading'

export default {
  name: 'Default',
  components: {
    AuthModal,
    UserModal,
    MixLoading
  },
  computed: {
    ...mapState(['loginModalType', 'loginModalTitle', 'pageLoading']),
    loginModalShow: {
      get() {
        return this.$store.state.loginModalShow
      },
      set(v) {
        this.$store.commit('SET_LOGIN_MODAL_SHOW', v)
      }
    },
    userModalShow: {
      get() {
        return this.$store.state.userModalShow
      },
      set(v) {
        this.$store.commit('SET_USER_MODAL_SHOW', v)
      }
    }
  }
}
</script>
<style lang="scss">
.container {
    background-color: rgb(44, 47, 54);
}
</style>
