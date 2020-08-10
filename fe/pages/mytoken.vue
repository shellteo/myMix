<template>
  <div class="IE-flex-fix">
    <div id="site-wrapper" style="opacity: 1; transform: translate(0px, 0px);">
      <g-header />
      <div id="site-inner" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.4)" class="card" data-page-container="true">
        <div class="page-heading section">
          <h2 class="title">My Token</h2>
          <p class="title-description">属于你自己的social money</p>
        </div>
        <div v-if="noToken">
          <p class="title title--ad text-center">您尚未发行token</p>
          <p />
        </div>
        <div v-else class="dashed-border">
          <div class="col-12 card row-label">
            <h5 class="section-heading">
              token address: {{ token.tokenAddress }}
            </h5>
          </div>
          <div class="col-12 card row-label">
            <h5 class="section-heading">
              Symbol: {{ token.symbol }}
            </h5>
          </div>
          <div class="col-12 card row-label">
            <h5 class="section-heading">
              name: {{ token.name }}
            </h5>
          </div>
          <div class="col-12 card row-label">
            <h5 class="section-heading">
              total supply: {{ token.totalSupply }}
            </h5>
          </div>
          <div class="col-12 card row-label">
            <h5 class="section-heading">
              exchange address:
              <template v-if="noExchange"> 未上uniswap交易所 </template>
              <template v-else>{{ token.exchangeAddress }}</template>
            </h5>
          </div>
        </div>
        <div class="product-select">
          <div class="product-select-message text-right"><p /></div>
          <!--  -->
          <a v-if="noToken" class="button visible-inline-block-sm" href="/issue/">去发行</a>
          <a v-else-if="noExchange" class="button visible-inline-block-sm" target="_blank" rel="noopener noreferrer" :href="uniswapURL + 'create-exchange'">去创建交易对</a>
          <a v-else class="button visible-inline-block-sm" target="_blank" rel="noopener noreferrer" :href="uniswapURL + 'add-liquidity'">去添加流动性</a>
        </div>
      </div>
      <g-footer />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isEmptyAddress } from '@/utils/index'
import consts from '@/utils/consts'
export default {
  data() {
    return {
      loading: false,
      uniswapURL: consts.uniswapURL
    }
  },
  computed: {
    ...mapState(['token']),
    noToken() {
      return isEmptyAddress(this.token.tokenAddress)
    },
    noExchange() {
      return isEmptyAddress(this.token.exchangeAddress)
    }
  }
  /* watch: {
    'token.tokenAddress': {
      handler(address) {
        if (isEmptyAddress(address)) this.loading = false
      },
      immediate: true,
      deep: true
    }
  } */
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
.text-center {
  text-align: center;
  color: #cccccc;
  margin-top: 15%;
}
</style>
