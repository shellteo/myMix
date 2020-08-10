<template>
  <div>
    <slot name="help" />
    <div class="kvFQhz">
      <div class="iNUelT">
        <div class="OpDFW">
          <div class="jUAxZT">
            <span>From</span>
          </div>
          <div v-if="form.inputToken.symbol && form.inputToken.id !== 0">
            Balance: {{ balance.input }}
          </div>
        </div>
        <div class="jbRmQG">
          <input
            :value="form.input"
            class="gcotIA"
            type="number"
            min="0"
            step="0.000000000000000001"
            placeholder="0.0"
            @input="inputChange"
            @keypress="isNumber"
          >
          <button
            class="iAoRgd"
            @click="tlShow = true;field = 'inputToken'"
          >
            <span class="rTZzf">
              {{ form.inputToken.symbol || 'Select a token' }}
              <i class="el-icon-arrow-down" />
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="hYLPFg">
      <div class="exKIZr" />
      <div class="haryqg">
        <i
          class="el-icon-bottom gHgbDu"
          @click="swap"
        />
      </div>
      <div class="jJSpkX" />
    </div>
    <div class="kvFQhz">
      <div class="iNUelT">
        <div class="OpDFW">
          <div class="jUAxZT">
            <span>To</span>
          </div>
          <div v-if="form.outputToken.symbol && form.outputToken.id !== 0">
            Balance: {{ balance.output }}
          </div>
        </div>
        <div class="jbRmQG">
          <input
            :value="form.output"
            class="gcotIA"
            type="number"
            min="0"
            step="0.0001"
            placeholder="0.0"
            @input="outputChange"
            @keypress="isNumber"
          >
          <button
            class="iAoRgd"
            @click="tlShow = true;field = 'outputToken'"
          >
            <span class="rTZzf">
              {{ form.outputToken.symbol || 'Select a token' }}
              <i class="el-icon-arrow-down" />
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="hYLPFg">
      <div class="exKIZr" />
      <div class="lfiYXW">
        <span class="sc-hORach icyNSS">Price</span>
        <span v-if="exchangeRate">1 {{ form.inputToken.symbol }} = {{ exchangeRate }} {{ form.outputToken.symbol }}</span>
        <span v-else> - </span>
      </div>
    </div>
    <div
      class="mHVYT"
      @click="detailShow = !detailShow"
    >
      <span class="fZbbbs">{{ detailShow ? 'Hide Detail' : 'Show Detail' }}</span>
      <i :class="detailShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
    </div>
    <div
      v-show="detailShow"
      class="iUPTxf"
    >
      <div class="hRyusy">
        <div v-if="base === 'input'">
          你正在出售
          <span class="iDChvK">
            <span class="jbXIaP">{{ form.input }} {{ form.inputToken.symbol }}</span>
          </span> 最少获得
          <span class="iDChvK">
            <span class="jbXIaP">{{ limitValue }} {{ form.outputToken.symbol }}</span>
          </span>
        </div>
        <div v-else>
          你正在购买
          <span class="iDChvK">
            <span class="jbXIaP">{{ form.output }} {{ form.outputToken.symbol }}</span>
          </span> 最多需要
          <span class="iDChvK">
            <span class="jbXIaP">{{ limitValue }} {{ form.inputToken.symbol }}</span>
          </span>
        </div>
        <div class="sc-bsbRJL kxtVAF">
          预期价格滑落
          <span class="iDChvK">
            <span class="jbXIaP">{{ priceSlippage * 100 }}%</span>
          </span>
          <el-tooltip
            placement="bottom"
            effect="light"
          >
            <div slot="content">
              您的交易可能由于正常的价格波动而失败，<br>价格滑落区间将有助于您的交易成功
            </div>
            <i class="el-icon-question" />
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="hGStes">
      <button
        :disabled="btnDisabled"
        class="jBltiI"
        @click="onSubmit"
      >
        Trade
      </button>
    </div>
    <TokenListModal
      v-model="tlShow"
      @selectToken="selectToken"
    />
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import TokenListModal from './TokenList'
import { CNY, INPUT } from './consts.js'

// import utils from '@/utils/index'

export default {
  components: {
    TokenListModal
  },
  data() {
    return {
      detailShow: false,
      tlShow: false,
      field: '', // INPUT OUTPUT
      form: {
        input: '',
        inputToken: CNY,
        output: '',
        outputToken: {}
      },
      order: {},
      priceSlippage: 0.01,
      base: 'input', // input / output
      balance: {
        input: 0,
        output: 0
      }
    }
  },
  computed: {
    tokensId() {
      return 0
    },
    type() {
      return this.base === 'input' ? 'buy_token_input' : 'buy_token_output'
    },
    btnDisabled() {
      return false
    },
    limitValue() {
      return '-'
    },
    exchangeRate() {
      return ''
    }
  },
  async asyncData() {},
  mounted() {
    this.getTokenBySymbol()
  },
  methods: {
    async getTokenBySymbol() {
    },
    addRouterQuery(symbol) {
      this.$router.replace({
        hash: this.$route.hash,
        query: {
          ...this.$route.query,
          [this.field === INPUT ? 'input' : 'output']: symbol
        }
      })
    },
    isNumber(event) {
      if (!/\d/.test(event.key) && event.key !== '.') {
        return event.preventDefault()
      }
    },
    inputChange: debounce(function (e) {
    }, 500),
    outputChange: debounce(function (e) {
    }, 500),
    selectToken(token) {
    },
    onSubmit() {
    },
    getOutputAmount(inputTokenId, outputTokenId, inputAmount) {
    },
    getInputAmount(inputTokenId, outputTokenId, outputAmount) {
    },
    successNotice(text) {
      this.$message.success({
        message: text,
        duration: 4000,
        showClose: true
      })
    },
    errorNotice(text) {
      this.$message.error({
        message: text,
        duration: 4000,
        showClose: true
      })
    },
    // 获取用户余额
    getUserBalance(tokenId, type) {
    },
    // 检测余额
    checkBalance(showError = true) {
    },
    swap() {
    }
  }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>
