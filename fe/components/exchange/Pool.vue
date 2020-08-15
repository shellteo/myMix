<template>
  <div>
    <slot name="help" />
    <div class="hYLPFg">
      <div
        class="caRvnP"
        @click="psShow = true"
      >
        <span class="gclSjj">{{ poolSelected.text }}</span>
        <i class="el-icon-arrow-down" />
      </div>
      <div class="jJSpkX" />
    </div>
    <!-- 存入 -->
    <div class="kvFQhz">
      <div class="iNUelT">
        <div class="OpDFW">
          <div class="jUAxZT">
            <span>{{ isDelete ? 'Delete' : 'Input' }}</span>
          </div>
          <div v-if="isDelete && form.outputToken.token2_symbol">
            Liquidity: {{ yourPoolSize.user_liquidity }}
          </div>
          <!-- <div else>
            Balance: {{ balance.add }}
          </div> -->
        </div>
        <!--------------------- 删除流动金代码开始 ---------------------->
        <div
          v-if="isDelete"
          class="jbRmQG"
        >
          <div />
          <input
            :value="form.output"
            class="gcotIA"
            type="number"
            min="0"
            step="0.00000001"
            placeholder="0.0"
            @input="outputChange"
            @keypress="isNumber"
          >
          <button
            class="iAoRgd"
            @click="tlShow = true;field = 'outputToken'"
          >
            <span class="rTZzf">
              {{ form.outputToken.token2_symbol || 'Select a token' }}
              <i class="el-icon-arrow-down" />
            </span>
          </button>
        </div>
        <!--------------------- 删除流动金代码结束 ---------------------->
        <div
          v-else
          class="jbRmQG"
        >
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
          <button class="iAoRgd">
            <span class="rTZzf">
              {{ form.inputToken.token2_symbol || 'Select a token' }}
              <!-- <i class="el-icon-arrow-down"></i> -->
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="hYLPFg hidden-border">
      <div class="exKIZr" />
      <div class="haryqg">
        <i
          v-if="isDelete"
          class="el-icon-bottom gHgbDu"
        />
        <i
          v-else
          class="el-icon-plus gHgbDu"
        />
      </div>
      <div class="jJSpkX" />
    </div>
    <!-- 存入 -->
    <div class="kvFQhz">
      <div class="iNUelT">
        <div class="OpDFW">
          <div class="jUAxZT">
            <span>{{ isDelete ? 'Output (estimated)' : 'Input' }}</span>
          </div>
          <div v-if="form.outputToken.token2_symbol && !isDelete">
            Balance: {{ balance.add }}
          </div>
        </div>
        <!--------------------- 删除流动金代码开始 ---------------------->
        <div
          v-if="isDelete"
          class="cHbrWc"
        >
          <template v-if="outputPoolSize.okt_amount !== 0">
            <div class="kroqsf">
              {{ outputPoolSize.okt_amount }} OKT
            </div>
            <div class="jlBXmz">
              +
            </div>
            <div class="kroqsf">
              {{ outputPoolSize.token_amount }} {{ form.outputToken.token2_symbol }}
            </div>
          </template>
        </div>
        <!--------------------- 删除流动金代码结束 ---------------------->
        <div
          v-else
          class="jbRmQG"
        >
          <div />
          <input
            :readonly="outputReadOnly"
            :value="form.output"
            class="gcotIA"
            type="number"
            min="0"
            step="0.00000001"
            placeholder="0.0"
            @input="outputChange"
            @keypress="isNumber"
          >
          <button
            class="iAoRgd"
            @click="tlShow = true;field = 'outputToken'"
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
        <span v-if="price">1 {{ form.outputToken.token2_symbol }} = {{ price }} okt</span>
        <span v-else> - </span>
      </div>
      <div class="lfiYXW">
        <span class="sc-hORach icyNSS">Current Pool Size</span>
        <span v-if="form.outputToken.token2_symbol">{{ currentPoolSize.okt_reserve }} OKT + {{ currentPoolSize.token_reserve }} {{ form.outputToken.token2_symbol }}</span>
        <span v-else> - </span>
      </div>
      <div class="lfiYXW">
        <span class="sc-hORach icyNSS">Your Pool Share ({{ yourPercent }})</span>
        <span v-if="form.outputToken.token2_symbol">{{ yourPoolSize.okt_amount }} OKT + {{ yourPoolSize.token_amount }} {{ form.outputToken.token2_symbol }}</span>
        <span v-else> - </span>
      </div>
    </div>
    <div>
      <div class="css-1d6204x">
        Don't see a pool you joined?
        <a id="import-pool-link" class="sc-cSHVUG AuDSD" href="javascript:void(0)" @click="ceShow=true">Import it.</a>
      </div>
    </div>
    <div
      v-if="!isDelete"
      class="mHVYT"
      @click="detailShow = !detailShow"
    >
      <span class="fZbbbs">{{ detailShow ? 'Hide Detail' : 'Show Detail' }}</span>
      <i :class="detailShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
    </div>
    <div
      v-show="detailShow"
      v-if="!isDelete"
      class="iUPTxf"
    >
      <div class="hRyusy">
        <div>
          You are adding
          <span class="iDChvK">
            <span class="jbXIaP">{{ form.input }} OKT</span>
          </span> and
          <span class="iDChvK">
            <span class="jbXIaP">{{ getMaxTokens }} {{ form.outputToken.token2_symbol }}</span>
          </span>into the liquidity pool.
        </div>
        <div class="sc-bsbRJL kxtVAF">
          You will mint
          <span class="iDChvK">
            <span class="jbXIaP"> {{ youMintTokenAmount }} </span>
          </span>
          liquidity tokens.
        </div>
        <div class="sc-bsbRJL kxtVAF">
          Current total supply of liquidity tokens is
          <span class="iDChvK">
            <span class="jbXIaP"> {{ currentPoolSize.total_supply || 0 }} </span>
          </span>
        </div>
      </div>
    </div>
    <!-- 提交 -->
    <div class="hGStes">
      <button
        :disabled="btnDisabled"
        class="jBltiI"
        @click="onSubmit"
      >
        {{ poolSelected.text }}
      </button>
    </div>
    <TokenListModal
      v-model="tlShow"
      :addon="false"
      @selectToken="selectToken"
    />
    <PoolSelectModal
      v-model="psShow"
      @selectPool="selectPool"
    />
    <CreateExModal
      v-model="ceShow"
    />
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import TokenListModal from './TokenList'
import PoolSelectModal from './PoolSelect'
import CreateExModal from './CreateExModal'
import { OKT, OUTPUT } from './consts.js'

// import utils from '@/utils/index'

export default {
  components: {
    TokenListModal,
    PoolSelectModal,
    CreateExModal
  },
  data() {
    return {
      psShow: false,
      ceShow: false,
      detailShow: false,
      tlShow: false,
      field: '', // INPUT OUTPUT
      orderShow: false,
      form: {
        input: '',
        inputToken: OKT,
        output: '',
        outputToken: {}
      },
      order: {},
      priceSlippage: 0.02,
      outputReadOnly: true,
      // display 计算data
      currentPoolSize: {
        total_supply: 0,
        token_reserve: 0,
        okt_reserve: 0
      },
      yourPoolSize: {
        okt_amount: 0,
        token_amount: 0,
        user_liquidity: 0
      },
      youMintTokenAmount: 0,
      poolSelected: {
        id: 0,
        text: 'Add Liquidity'
      },
      outputPoolSize: {
        okt_amount: 0,
        token_amount: 0
      },
      balance: {
        add: 0, // 添加流动性余额
        delete: 0 // 删除流动性余额
      },
      price: ''
    }
  },
  computed: {
    yourPercent() {
      const yourSupply = parseFloat(this.yourPoolSize.user_liquidity)
      const totalSupply = parseFloat(this.currentPoolSize.total_supply)
      if (yourSupply === 0 || totalSupply === 0) {
        return '0%'
      } else {
        return `${(yourSupply / totalSupply * 100).toFixed(2)}%`
      }
    },
    // 是否是删除流动金
    isDelete() {
      // 添加流动金
      if (this.poolSelected.id === 0) {
        return false
      } else {
      // 删除流动金
        return true
      }
    },
    btnDisabled() {
      return false
    },
    getMaxTokens(v) {
      const { output } = this.form
      if (output) {
        return parseFloat((parseFloat(output) / (1 - this.priceSlippage)).toFixed(8))
      }
      return '-'
    },
    exchangeRate() {
      return ''
    }
  },
  async mounted() {
  },
  methods: {
    isNumber(event) {
      if (!/\d/.test(event.key) && event.key !== '.') {
        return event.preventDefault()
      }
    },
    selectPool(val) {
      // 修改form，重置
      this.form = {
        input: '',
        inputToken: OKT,
        output: '',
        outputToken: {}
      }
      this.outputPoolSize = {
        okt_amount: 0,
        token_amount: 0
      }
      this.price = ''
      this.poolSelected = val
    },
    inputChange: debounce(function (e) {
      const value = e.target.value
      this.form.input = value
      const { input, outputToken } = this.form
      if (input && outputToken.token2_symbol) {
        // 获取输出token的数量
        this.getTokenAmountByOkt(outputToken.token2_symbol, input)
        // 获取你能挖到的数量
        this.getMintLiquidityByOkt(outputToken.token2_symbol, input)
      }
    }, 500),
    outputChange(e) {
      const value = e.target.value
      this.form.output = value
      /* ---------------------- 删除流动金逻辑开始 --------------------- */
      if (this.isDelete) {
        const { output, outputToken } = this.form
        if (output && outputToken.token2_symbol) {
          this.getPoolSizeByLiquidity(outputToken.token2_symbol, output)
        }
      }
      /* ---------------------- 删除流动金逻辑结束 --------------------- */
    },
    selectToken(token) {
      this.form[this.field] = token
      const symbol = token.token2_symbol
      // 获取个人占比
      this.getYourPoolSize(symbol)
      // 获取总池子大小
      this.getCurrentPoolSize(symbol)
      this.getPrice(symbol)
      if (this.field === OUTPUT) {
        this.getBalance(symbol, this.isDelete ? 'delete' : 'add')
        if (this.isDelete) {
          /* ---------------------- 删除流动金逻辑开始 --------------------- */
          const { output } = this.form
          if (output) {
            this.getPoolSizeByLiquidity(symbol, output)
            // this.getInputAmount(inputToken.id, token.id, output)
          }
          /* ---------------------- 删除流动金逻辑结束 --------------------- */
        } else {
          const { input } = this.form
          if (input) {
            // 获取输出token的数量
            this.getTokenAmountByOkt(symbol, input)
            // 获取你能挖到的数量
            this.getMintLiquidityByOkt(symbol, input)
          }
        }
      }
    },
    getInputAmount(inputTokenId, outputTokenId, outputAmount) {
    },
    getOutputAmount(inputTokenId, outputTokenId, inputAmount) {
    },
    onSubmit() {
      if (this.isDelete) {
        this.removeLiquidity()
      } else {
        this.addLiquidity()
      }
    },
    async addLiquidity() {
      const { input, output, outputToken } = this.form
      if (!input) {
        this.$message.error('Not a valid input value')
        return
      }
      if (!output) {
        this.$message.error('Not a valid output value')
        return
      }
      if (!outputToken.token2_symbol) {
        this.$message.error('Please select a token to continue.')
        return
      }
      this.$store.commit('SET_PAGE_LOADING', true)
      const res = await this.$request.post('/api/exchange/addLiquidity', {
        symbol: outputToken.token2_symbol,
        tokt_amount: input,
        token_amount: output
      })
      this.$store.commit('SET_PAGE_LOADING', false)
      let msg = ''
      if (res.code === 0) {
        msg = '🚀 ➕ add liquidity successful~'
      } else {
        msg = '❌ add liquidity failed!'
      }
      this.$alert(msg, 'Tips', {
        showClose: false,
        callback: (action) => {
          console.log(action)
          window.location.reload()
        }
      })
    },
    async removeLiquidity() {
      const { output, outputToken } = this.form
      if (!output) {
        this.$message.error('Not a valid input value')
        return
      }
      if (!outputToken.token2_symbol) {
        this.$message.error('Please select a token to continue.')
        return
      }
      this.$store.commit('SET_PAGE_LOADING', true)
      const res = await this.$request.post('/api/exchange/removeLiquidty', {
        symbol: outputToken.token2_symbol,
        amount: output
      })
      this.$store.commit('SET_PAGE_LOADING', false)
      let msg = ''
      if (res.code === 0) {
        msg = '🚀 ➖ Remove Liquidity successful~'
      } else {
        msg = '❌ Remove Liquidity failed!'
      }
      this.$alert(msg, 'Tips', {
        showClose: false,
        callback: (action) => {
          console.log(action)
          window.location.reload()
        }
      })
    },
    // 根据okt获取token数量
    async getTokenAmountByOkt(symbol, oktAmount) {
      const res = await this.$request.get('/api/exchange/getPoolCnyToTokenPrice', {
        params: {
          symbol,
          okt_amount: oktAmount
        }
      })
      if (res.code === 0) {
        this.outputReadOnly = true
        this.form.output = res.data
      } else {
        this.form.output = ''
        this.outputReadOnly = false
      }
    },
    // 根据流动金数量获取 okt + token amount
    async getPoolSizeByLiquidity(symbol, liquidity) {
      const res = await this.$request.get('/api/exchange/getPoolSize', { params: { symbol, liquidity } })
      if (res.code === 0) {
        this.outputPoolSize = {
          okt_amount: res.data.token1_amount,
          token_amount: res.data.token2_amount
        }
      } else {
        this.outputPoolSize = {
          okt_amount: 0,
          token_amount: 0
        }
      }
    },
    // 获取token价格
    async getPrice(symbol, token_amount = 1) {
      const res = await this.$request.get('/api/exchange/getTokenToOktInputPrice', {
        params: {
          symbol,
          token_amount
        }
      })
      if (res.code === 0) {
        this.price = parseFloat(res.data)
      } else {
        this.price = ''
      }
    },
    async getCurrentPoolSize(symbol) {
      const res = await this.$request.get(`/api/exchange/info/${symbol}`)
      if (res.code === 0) {
        this.currentPoolSize = res.data
      }
    },
    // 根据输入的okt数量计算获取的流动金
    async getMintLiquidityByOkt(symbol, oktAmount) {
      const res = await this.$request.get('/api/exchange/getMintLiquidity', {
        params: {
          symbol,
          okt_amount: oktAmount
        }
      })
      if (res.code === 0) {
        this.youMintTokenAmount = res.data
      }
    },
    async getBalance(symbol, type) {
      const res = await this.$request.get('/api/user/balance', { params: { symbol } })
      if (res.code === 0) {
        this.balance[type] = parseFloat(res.data)
      }
    },
    // 获取用户pool里的信息
    async getYourPoolSize(symbol) {
      const res = await this.$request.get('/api/user/exchange', { params: { symbol } })
      if (res.code === 0) {
        this.yourPoolSize = res.data
      }
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
    }
  }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>
