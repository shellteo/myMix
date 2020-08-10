<template>
  <div>
    <nuxt />
    <AuthModal v-model="loginModalShow" :type="loginModalType" :title="loginModalTitle" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import AuthModal from '@/components/Auth/index.vue'
export default {
  name: 'Default',
  components: {
    AuthModal
  },
  computed: {
    ...mapState(['loginModalType', 'loginModalTitle']),
    loginModalShow: {
      get() {
        return this.$store.state.loginModalShow
      },
      set(v) {
        this.$store.commit('SET_LOGIN_MODAL_SHOW', v)
      }
    }
  }
}
</script>
