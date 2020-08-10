<template>
  <div class="IE-flex-fix">
    <div id="site-wrapper" style="opacity: 1; transform: translate(0px, 0px);">
      <g-header />
      <div id="site-inner" class="card" data-page-container="true">
        <div class="page-heading section">
          <h2 class="title">issue token</h2>
          <p class="title-description">创造属于你自己的social money</p>
        </div>
        <div class="dashed-border">
          <div class="col-12 card row-label">
            <h5 class="section-heading">
              Symbol
            </h5>
            <input v-model="symbol" type="text" maxlength="10" placeholder="请输入symbol（length<10）">
          </div>
          <div class="col-12 card row-label">
            <h5 class="section-heading">
              name
            </h5>
            <input v-model="name" type="text" maxlength="50" placeholder="请输入name（length<50）">
          </div>
          <div class="col-12 card row-label">
            <h5 class="section-heading">
              total supply
            </h5>
            <input class="disabled" type="text" disabled placeholder="请输入soical money的total supply" value="21000000">
          </div>
          <div class="col-12 card row-label">
            <h5 class="section-heading">
              decimals
            </h5>
            <input class="disabled" type="text" disabled placeholder="请输入soical money的total supply" value="4">
          </div>
        </div>
        <div class="product-select">
          <div class="product-select-message text-right"><p><small class="">大约需要 0.0095 GAS FEE</small></p></div>
          <a class="button visible-inline-block-sm" :class="{ 'disabled': issueDisabled }" href="javascript:void(0)" @click="issueToken">Issue Token</a>
        </div>
      </div>
      <g-footer />
    </div>
    <transition name="el-fade-in-linear">
      <IssueLoading v-show="show" />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import socialMoney from '@/api/eth/contract.js'
import IssueLoading from '@/components/Loading'
export default {
  components: {
    IssueLoading
  },
  data() {
    return {
      symbol: '',
      name: '',
      show: false
    }
  },
  computed: {
    ...mapState(['metamask']),
    issueDisabled() {
      const symbol = this.symbol.toString()
      const name = this.name.toString()
      if (symbol.length <= 0 || symbol > 10 || name <= 0 || name > 50) {
        return true
      }
      return false
    }
  },
  watch: {
    symbol() {
      // this.symbol = this.symbol.replace(/[^A-Za-z]/ig, '')
      this.symbol = this.symbol.replace(/[\W]/g, '')
    }
  },
  methods: {
    async issueToken() {
      this.show = true
      const web3 = window.web3
      const coinbase = await web3.eth.getCoinbase()
      const instance = socialMoney.factoryContractInstance()
      try {
        await instance.methods.createToken(this.name, this.symbol).send({
          from: coinbase
        })
      } catch (error) {
        console.error(error)
        this.$message.error('发行出错，请稍后重试')
      }
      await this.$store.dispatch('token/getTokenWithAccount', this.metamask.account)
      this.$router.push({
        name: 'mytoken'
      })
    }
  }
}
</script>

<style scoped lang="scss">
input[type=text] {
  appearance: textfield;
  margin: 0;
  display: inline-block;
  width: 100%;
  box-shadow: 0 0 0 1px #231f20, inset 0 0 0 1px #231f20;
  padding: 4px 6px;
  height: 34px;
  margin-right: .5em;
}
.section-heading {
  margin-bottom: 1rem;
}
.dashed-border {
  border: 2px #231f20 dashed;
  .card {
    box-shadow: none;
  }
  .card:not(:last-child) {
    border-bottom: 2px dashed #231f20;
  }
}
.product-select {
  flex-direction: column;
  a.button {
    max-width: 40rem;
    flex: 1;
    width: 100%;
    align-self: center;
  }
}
</style>
