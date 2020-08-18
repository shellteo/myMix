<template>
  <el-dialog
    :visible.sync="showModal"
    :modal="true"
    custom-class="black-theme-dialog create-ex-modal"
    title="Create Exchange"
  >
    <div class="ce-container">
      <div class="csvLqB">
        <div class="search-box">
          <i class="el-icon-search" />
        </div>
        <input
          v-model="search"
          type="text"
          placeholder="search token by symbol"
          class="dHtVAe"
          @keyup.enter="searchToken"
        >
      </div>
      <div
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
      >
        <div v-if="resultType === 1" class="tip1">
          👆🏻 Serach a token to create trade pair. 👆🏻
        </div>
        <div v-else-if="resultType === 2" class="tip1">
          😢 No matching results. Please edit and try again.
        </div>
        <div v-else class="chain-info-lt">
          <div class="lt-row-name">
            <span class="name font-bold">{{ token.whole_name }}</span>
            <span class="unit font-bold">({{ token.symbol }})</span>
          </div>
          <a :href="okchainUrl" target="_blank">
            <i class="el-icon-link" />View on OkChain
          </a>
          <div class="ranking-box">
            <div class="ranking">{{ token.description }}</div>
          </div>
          <ul class="lt-row-info">
            <li>
              <div class="text-info-box-h font-14">
                <span class="label color-7B8293">Total Supply</span>
                <span class="value">{{ token.total_supply }}</span>
              </div>
            </li>
            <li>
              <div class="text-info-box-h font-14">
                <span class="label color-7B8293">Owner</span>
                <span class="value address">
                  <a :href="ownerUrl" target="_blank">{{ token.owner }}
                  </a>
                </span>
              </div>
            </li>
            <li>
              <div class="text-info-box-h font-14">
                <span class="label color-7B8293">Mintable</span>
                <span class="value">{{ token.mintable }}</span>
              </div>
            </li>
          </ul>
          <div class="ce-btn">
            <el-button plain @click="createExchange">Create Exchange</el-button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'UserModal',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showModal: false,
      search: '',
      token: {
        description: '',
        symbol: '',
        original_symbol: '',
        whole_name: '',
        original_total_supply: '',
        total_supply: '',
        owner: '',
        mintable: true
      },
      resultType: 1,
      loading: false
    }
  },
  computed: {
    okchainUrl() {
      return 'https://www.oklink.com/okchain-test/token/' + this.token.symbol
    },
    ownerUrl() {
      return 'https://www.oklink.com/okchain-test/address/' + this.token.owner
    }
  },
  watch: {
    showModal(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.showModal = val
    }
  },
  mounted() {
    this.token = {
      description: 'Global utility token in testnet',
      symbol: 'tokb',
      original_symbol: 'tokb',
      whole_name: 'Testnet OKB',
      original_total_supply: '1000000000.00000000',
      total_supply: '1000000000.00000000',
      owner: 'okchain12mek8h0mjs9m4hrh5q4zyhx04pqltyrnfc3kre',
      mintable: true
    }
  },
  methods: {
    async searchToken() {
      const symbol = this.search
      this.loading = true
      const res = await this.$request.get('/api/token/info', {
        params: {
          symbol
        }
      })
      this.loading = false
      if (res.code === 0) {
        this.resultType = 3
        this.token = res.data
      } else {
        this.resultType = 2
      }
    },
    async createExchange() {
      this.loading = true
      const res = await this.$request.post('/api/exchange', {
        symbol: this.token.symbol
      })
      this.loading = false
      let msg = ''
      if (res.code === 0) {
        msg = '🚀 Create Exchange successful~'
      } else {
        msg = '❌ Create Exchange failed!'
      }
      this.$alert(msg, 'Tips', {
        showClose: false,
        callback: (action) => {
          console.log(action)
          window.location.reload()
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
$bg: rgb(44, 47, 54);
::placeholder {
  color: #b2b2b2;
}
.ce-container {
  .tip1 {
    margin-top: 30%;
    color: #b2b2b2;
    font-size: 16px;
    text-align: center;
  }
  .favMUS {
    width: 2rem;
    height: 2rem;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .hDyKIS:hover {
    background-color: red;
  }
  .search-box {
    font-size: 1.5rem;
    color: #b2b2b2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cotdDw {
    flex-grow: 1;
    overflow-y: auto;
  }
  .hDyKIS {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
    flex-flow: row nowrap;
    padding: 1rem;
    color: #b2b2b2;
  }

  .cjqFX {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
  }

  .egNEUM {
    display: flex;
    margin-left: 1rem;
    flex-flow: column nowrap;
  }

  .iHXZgD {
    color: #b2b2b2;
  }

  .bELmls {
    display: flex;
    align-items: flex-end;
    flex-flow: column nowrap;
  }

  .etGoql {
    font-size: 1rem;
    line-height: 20px;
  }

  .eAstpp {
    font-size: 1rem;
    line-height: 1.5rem;
    color: rgb(123, 123, 123);
  }
  .csvLqB {
    display: flex;
    justify-content: flex-start;
    background-color: $bg;
    flex-flow: row nowrap;
    padding: 0.5rem 1.5rem;
  }

  .dHtVAe {
    color: #b2b2b2;
    font-size: 1rem;
    width: 0px;
    min-height: 2.5rem;
    text-align: left;
    padding-left: 1.6rem;
    background-color: $bg;
    outline: none;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    flex: 1 0 auto;
  }
  input {
    text-rendering: auto;
    color: #b2b2b2;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    background-color: $bg;
    cursor: text;
    margin: 0em;
    font: 400 13.3333px Arial;
    padding: 1px 0px;
    border-width: 2px;
    border-style: inset;
    border-color: initial;
    border-image: initial;
  }
}

.chain-info-lt {
  padding: 20px;
  margin-top: 40px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .lt-row-name {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    .name {
      font-size: 24px;
    }
    .unit {
      font-size: 16px;
      margin-left: 10px;
      margin-right: 20px;
      color: #7b8293;
    }
  }
  .ranking-box {
    margin-bottom: 24px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .ranking {
    padding: 6px 9px;
    height: 20px;
    background: rgba(10, 10, 10, 0.15);
    border-radius: 2px;
    font-size: 12px;
    font-weight: 500;
    color: #b2b2b2;
    line-height: 20px;
    align-self: flex-start;
  }
  .lt-row-info {
    padding-left: 0;
    margin-bottom: 0;
    li {
      display: flex;
      margin-bottom: 4px;
    }
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
.text-info-box-h {
  display: flex;
  align-items: center;
  .label {
    font-weight: 400;
    min-width: 84px;
  }
  .value {
    min-width: 120px;
    line-height: 20px;
  }
  .address {
    width: 100px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
.color-7B8293 {
  color: #7b8293;
}
.font-bold {
  font-weight: 500;
}
.font-14 {
  font-size: 14px;
}
.ce-btn {
  margin-top: 20px;
}
</style>
