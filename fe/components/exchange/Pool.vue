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
          <div v-if="isDelete && form.outputToken.symbol && form.outputToken.id !== 0">
            Liquidity: {{ yourPoolSize.your_supply }}
          </div>
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
            step="0.000000000000000001"
            placeholder="0.0"
            @input="outputChange"
            @keypress="isNumber"
          >
          <button
            class="iAoRgd"
            @click="tlShow = true;field = 'outputToken'"
          >
            <span class="rTZzf">
              {{ form.outputToken.symbol || 'Se' }}
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
            step="0.000000000000000001"
            placeholder="0.0"
            @input="inputChange"
            @keypress="isNumber"
          >
          <button class="iAoRgd">
            <span class="rTZzf">
              {{ form.inputToken.symbol || 'Select a token' }}
              <!-- <i class="el-icon-arrow-down"></i> -->
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="hYLPFg">
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
            <span>{{ isDelete ? '输出（预估）' : 'Input' }}</span>
          </div>
          <div v-if="form.outputToken.symbol && form.outputToken.id !== 0 && !isDelete">
            Balance: {{ balance.add }}
          </div>
        </div>
        <!--------------------- 删除流动金代码开始 ---------------------->
        <div
          v-if="isDelete"
          class="cHbrWc"
        >
          <template v-if="outputPoolSize.cny_amount !== 0">
            <div class="kroqsf">
              {{ outputPoolSize.cny_amount.toFixed(4) }} OKT
            </div>
            <div class="jlBXmz">
              +
            </div>
            <div class="kroqsf">
              {{ outputPoolSize.token_amount.toFixed(4) }} {{ form.outputToken.symbol }}
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
            step="0.000000000000000001"
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
        <span v-if="exchangeRate">1 OKT = {{ exchangeRate }} {{ form.outputToken.symbol }}</span>
        <span v-else> - </span>
      </div>
      <div class="lfiYXW">
        <span class="sc-hORach icyNSS">当前流动金池总量</span>
        <span v-if="form.outputToken.symbol">{{ currentPoolSize.cny_amount }} OKT + {{ currentPoolSize.token_amount }} {{ form.outputToken.symbol }}</span>
        <span v-else> - </span>
      </div>
      <div class="lfiYXW">
        <span class="sc-hORach icyNSS">你占流动金池份额 （{{ yourPercent }}）</span>
        <span v-if="form.outputToken.symbol">{{ yourPoolSize.cny_amount }} OKT + {{ yourPoolSize.token_amount }} {{ form.outputToken.symbol }}</span>
        <span v-else> - </span>
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
          你正在添加
          <span class="iDChvK">
            <span class="jbXIaP">{{ form.input }} OKT</span>
          </span> 和最多
          <span class="iDChvK">
            <span class="jbXIaP">{{ limitValue }} {{ form.outputToken.symbol }}</span>
          </span>到流动金池中。
        </div>
        <div class="sc-bsbRJL kxtVAF">
          你将会挖到
          <span class="iDChvK">
            <span class="jbXIaP"> {{ youMintTokenAmount }} </span>
          </span>
          流动金Token 作为凭证
        </div>
        <div class="sc-bsbRJL kxtVAF">
          当前 流动金Token 的总量是
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
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import TokenListModal from './TokenList'
import PoolSelectModal from './PoolSelect'
import { OKT, INPUT } from './consts.js'

// import utils from '@/utils/index'

export default {
  components: {
    TokenListModal,
    PoolSelectModal
  },
  data() {
    return {
      psShow: false,
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
        cny_amount: 0,
        token_amount: 0,
        total_supply: 0
      },
      yourPoolSize: {
        cny_amount: 0,
        token_amount: 0,
        your_supply: 0
      },
      youMintTokenAmount: 0,
      poolSelected: {
        id: 0,
        text: 'Add Liquidity'
      },
      outputPoolSize: {
        cny_amount: 0,
        token_amount: 0
      },
      balance: {
        add: 0, // 添加流动性余额
        delete: 0 // 删除流动性余额
      }
    }
  },
  computed: {
    tokensId() {
      return 0
    },
    yourPercent() {
      return '0%'
    },
    // 是否是删除流动金
    isDelete() {
      return false
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
  async mounted() {
    await this.getTokenBySymbol()
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
    calLimitValue(v) {
      return parseFloat(v) * (1 - this.priceSlippage)
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
        cny_amount: 0,
        token_amount: 0
      }
      this.poolSelected = val
    },
    inputChange: debounce(function (e) {
    }, 500),
    outputChange(e) {
    },
    selectToken(token) {
    },
    getInputAmount(inputTokenId, outputTokenId, outputAmount) {
    },
    getOutputAmount(inputTokenId, outputTokenId, inputAmount) {
    },
    onSubmit() {
    },
    addLiquidity() {
    },
    getCurrentPoolSize(tokenId) {
    },
    getYourPoolSize(tokenId) {
    },
    getYourMintToken(tokenId, amountBefore) {
    },
    getOutputPoolSize(amountBefore, tokenId) {
    },
    removeLiquidity() {
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
    }
  }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>
