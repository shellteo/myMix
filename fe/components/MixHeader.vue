<template>
  <header id="site-header">
    <nav class="main-menu nav-main">
      1
    </nav>
  </header>
</template>
<script>
// import Web3Status from './Web3Status'
import consts from '@/utils/consts'
export default {
  components: {
    // Web3Status
  },
  data() {
    return {
      page: '',
      uniswapURL: consts.uniswapURL
    }
  },
  computed: {
  },
  mounted() {
    this.page = this.$route.name
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.header-logo .logo {
  background-image: url(../assets/logo_icon.png);
  background-size: 50%;
}
a.current-menu-item {
  color: #26498d;
  .hover-indicator {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}
</style>
