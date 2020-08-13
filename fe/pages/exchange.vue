<template>
  <div id="site-wrapper" class="main exchange">
    <Header />
    <div class="outer-container">
      <div class="p-w">
        <el-tabs
          v-model="tab"
          type="border-card"
          @tab-click="tabClick"
        >
          <el-tab-pane
            label="Swap"
            name="#swap"
          >
            <Swap />
          </el-tab-pane>
          <el-tab-pane
            label="Pool"
            name="#pool"
          >
            <Pool />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Swap from '@/components/exchange/Swap'
import Pool from '@/components/exchange/Pool'
import Header from '@/components/MixHeader'
export default {
  components: {
    Swap,
    Pool,
    Header
  },
  data() {
    return {
      tab: '#swap'
    }
  },
  computed: {
  },
  created() {},
  mounted() {
    this.handleRoute()
  },
  methods: {
    handleRoute() {
      const hashArr = ['#swap', '#pool']
      const hash = this.$route.hash
      if (hashArr.includes(hash)) this.tab = hash
      else this.tab = '#swap'
    },
    tabClick(e) {
      this.$router.replace({ hash: e.name })
    }
  }
}
</script>
<style lang="scss">
$bg-color: rgb(33, 36, 41);;
$purpleDark: #d93025;
$borderRadius6: 6px;
#site-wrapper {
  width:100%;
  max-width:1750px;
  margin:0 auto;
  position:relative;
  overflow:hidden;
  transform-origin:center bottom;
  background-color: rgb(44, 47, 54);
  background-size:300px 300px;
  background-repeat:repeat
}
.exchange {
  background: rgb(44, 47, 54);
  background-color: rgb(44, 47, 54);
  .el-tabs--border-card {
    border: none;
    box-shadow: none;
    background-color: rgb(44, 47, 54);
  }
  .el-tabs--border-card>.el-tabs__header {
    background-color: $bg-color;
    border-radius: 30px 30px 0 0;
    border-bottom: 0;
  }
  .el-tabs__content {
    background: $bg-color;
    border-radius: 0 0 30px 30px;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    color: white;
    background-color: $purpleDark;
  }
  .el-tabs__nav {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    height: 2.5rem;
    background-color: $bg-color;
    flex-flow: row nowrap;
    border-radius: 3rem;
    width: 400px;
  }
  .el-tabs__nav-scroll {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 10px 10px;
    margin-bottom: 0px;
  }
  .el-tabs__item {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    height: 2.5rem;
    cursor: pointer;
    color: $purpleDark;
    font-size: 1rem;
    box-sizing: border-box;
    flex-flow: row nowrap;
    border-width: 1px;
    border-style: solid;
    border-color: $purpleDark;
    border-image: initial;
    flex: 1 0 auto;
    outline: none;
    text-decoration: none;
    &:first-child {
      border-top-left-radius: $borderRadius6;
      border-bottom-left-radius: $borderRadius6;
    }
    &:last-child {
      border-top-right-radius: $borderRadius6;
      border-bottom-right-radius: $borderRadius6;
    }
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item {
    border-color: $purpleDark;
    color: $purpleDark;
    width: 100px;
  }
}
</style>
<style lang="scss" scoped>
$bg-color: #F7F7F7;
.ma-banner {
  width: 100%;
}
.main {
  background-color: rgb(44, 47, 54);
}
$width: 450px;
.outer-container {
  /* margin: auto;
  position: relative;
  box-sizing: border-box; */
}
.p-w  {
  max-width: $width;
  width: 100%;
  margin: 20px auto 0 auto;
}
.help {
  text-align: right;
  margin-bottom: 10px;
}
.help-link {
  font-size: 14px;
  color: #cccccc;
  text-decoration: underline;
  z-index: 10;
}
</style>
