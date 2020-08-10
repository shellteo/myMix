<template>
  <div class="IE-flex-fix">
    <div id="site-wrapper" style="opacity: 1; transform: translate(0px, 0px);">
      <!-- <g-header /> -->
      <div id="site-inner" data-page-container="true">
        <Reg />
        <Login />
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
    }
  },
  computed: {
  },
  methods: {
    submitLoginForm() {}
  }
}
</script>

<style scoped lang="scss" >
.login-card {
  max-width: 400px;
  margin: 0 auto;
}
</style>
