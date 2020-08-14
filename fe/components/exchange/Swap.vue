<template>
  <div>
    <slot name="help" />
    <div class="kvFQhz">
      <div class="iNUelT">
        <div class="OpDFW">
          <div class="jUAxZT">
            <span>From</span>
          </div>
          <div v-if="form.inputToken.token2_symbol">
            Balance: {{ balance.input }}
          </div>
        </div>
        <div class="jbRmQG">
          <input
            :value="form.input"
            class="gcotIA"
            type="number"
            min="0"
            step="0.00000001"
            placeholder="0.0"
            @input="inputChange"
            @keypress="isNumber"
          >
          <button
            class="iAoRgd"
            @click="tlShow = true;field = INPUT"
          >
            <span class="rTZzf">
              {{ form.inputToken.token2_symbol || 'Select a token' }}
              <i class="el-icon-arrow-down" />
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="hYLPFg hidden-border">
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
          <div v-if="form.outputToken.token2_symbol">
            Balance: {{ balance.output }}
          </div>
        </div>
        <div class="jbRmQG">
          <input
            :value="form.output"
            class="gcotIA"
            type="number"
            min="0"
            step="0.00000001"
            placeholder="0.0"
            readonly
            @keypress="isNumber"
          >
          <button
            class="iAoRgd"
            @click="tlShow = true;field = OUTPUT"
          >
            <span class="rTZzf">
              {{ form.outputToken.token2_symbol || 'Select a token' }}
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
        <span v-if="exchangeRate">1 {{ form.inputToken.token2_symbol }} = {{ exchangeRate }} {{ form.outputToken.token2_symbol }}</span>
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
          You are sending
          <span class="iDChvK">
            <span class="jbXIaP">{{ form.input }} {{ form.inputToken.token2_symbol }}</span>
          </span> will receive at least
          <span class="iDChvK">
            <span class="jbXIaP">{{ limitValue }} {{ form.outputToken.token2_symbol }}</span>
          </span>
        </div>
        <div v-else>
          You are buying
          <span class="iDChvK">
            <span class="jbXIaP">{{ form.output }} {{ form.outputToken.token2_symbol }}</span>
          </span> It will cost at most
          <span class="iDChvK">
            <span class="jbXIaP">{{ limitValue }} {{ form.inputToken.token2_symbol }}</span>
          </span>
        </div>
        <div class="sc-bsbRJL kxtVAF">
          Expected price slippage
          <span class="iDChvK">
            <span class="jbXIaP">{{ priceSlippage * 100 }}%</span>
          </span>
          <el-tooltip
            placement="bottom"
            effect="light"
          >
            <div slot="content">
              Lowering this limit decreases your risk of frontrunning.<br>
              However, this makes more likely that your transaction will fail due to normal price movements.
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
import { OKT, INPUT, OUTPUT } from './consts.js'

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
        inputToken: OKT,
        output: '',
        outputToken: {}
      },
      order: {},
      priceSlippage: 0.01,
      base: 'input', // input / output
      balance: {
        input: 0,
        output: 0
      },
      INPUT,
      OUTPUT
    }
  },
  computed: {
    btnDisabled() {
      return true
    },
    limitValue() {
      const { output } = this.form
      const { base } = this
      // 以input为准计算
      if (base === 'input') {
        if (output) {
          return this.getMinTokens(output)
        }
      }
      return '-'
    },
    exchangeRate() {
      const { input, output } = this.form
      if (input && output) {
        return ((1 / input) * output).toFixed(4)
      }
      return ''
    }
  },
  mounted() {
    console.log('mounted')
    this.getBalance(OKT.token2_symbol, 'input')
  },
  methods: {
    getMaxTokens(v) {
      return parseFloat((parseFloat(v) / (1 - this.priceSlippage)).toFixed(8))
    },
    getMinTokens(v) {
      return parseFloat((parseFloat(v) * (1 - this.priceSlippage)).toFixed(8))
    },
    isNumber(event) {
      if (!/\d/.test(event.key) && event.key !== '.') {
        return event.preventDefault()
      }
    },
    inputChange: debounce(function (e) {
      const value = e.target.value
      this.form.input = value
      this.base = 'input'
      this.form.output = ''
      const { input, inputToken, outputToken } = this.form
      if (input && inputToken.token2_symbol && outputToken.token2_symbol) {
        this.getOutputAmount(inputToken.token2_symbol, outputToken.token2_symbol, input)
      }
    }, 500),
    /* outputChange: debounce(function (e) {
      const value = e.target.value
      this.form.output = value
      this.base = 'output'
      this.form.input = ''
      const { inputToken, output, outputToken } = this.form
      if (output && inputToken && outputToken) {
        this.getInputAmount(inputToken.id, outputToken.id, output)
      }
    }, 500), */
    selectToken(token) {
      this.form[this.field] = token
      // 输入输出token不能相同
      if (this.form[INPUT] === this.form[OUTPUT]) {
        this.form[this.field === INPUT ? OUTPUT : INPUT] = ''
        this.form[this.field === INPUT ? 'output' : 'input'] = ''
      }
      this.getBalance(token.token2_symbol, this.field === INPUT ? 'input' : 'output')
      const { input, inputToken, outputToken } = this.form
      if (input && inputToken.token2_symbol && outputToken.token2_symbol) {
        this.getOutputAmount(inputToken.token2_symbol, outputToken.token2_symbol, input)
      }
    },
    onSubmit() {
    },
    getOutputAmount(inputSymbol, outputSymbol, amount) {
      if (inputSymbol === OKT.token2_symbol) {
        this.getTokenPrice(outputSymbol, amount)
      } else {
        this.getOktPrice(inputSymbol, amount)
      }
    },
    async getTokenPrice(outputSymbol, inputAmount) {
      const res = await this.$request.get('/api/exchange/getOktToTokenInputPrice', {
        params: {
          symbol: outputSymbol,
          okt_amount: inputAmount
        }
      })
      if (res.code === 0) {
        this.form.output = parseFloat(res.data)
      } else {
        this.form.output = ''
      }
    },
    async getOktPrice(inputSymbol, inputAmount) {
      const res = await this.$request.get('/api/exchange/getTokenToOktInputPrice', {
        params: {
          symbol: inputSymbol,
          token_amount: inputAmount
        }
      })
      if (res.code === 0) {
        this.form.output = parseFloat(res.data)
      } else {
        this.form.output = ''
      }
    },
    async getInputAmount(inputSymbol, inputAmount) {
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
    swap() {
    },
    async getBalance(symbol, type) {
      console.log('getBalance')
      const res = await this.$request.get('/api/user/balance', { params: { symbol } })
      console.log('getBalance', res)
      if (res.code === 0) {
        this.balance[type] = parseFloat(res.data)
      }
    }
  }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>
