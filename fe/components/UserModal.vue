<template>
  <el-dialog
    :visible.sync="showModal"
    :modal="true"
    custom-class="black-theme-dialog user-modal"
    title="Overview"
  >
    <div class="account-out">
      <div class="info-box">
        <div class="address">{{ address }}</div>
        <div>
          <el-button type="text" icon="el-icon-copy-document" @click="copy">Copy Address</el-button>
          <a :href="okchainUrl" target="_blank">
            <i class="el-icon-link" />View on OkChain
          </a>
        </div>
      </div>
      <el-table
        :data="coins"
        style="width: 100%"
        cell-class-name="cell-class"
        header-cell-class-name="header-cell-class"
      >
        <el-table-column
          prop="symbol"
          label="Token"
        />
        <el-table-column
          prop="available"
          label="Available"
        />
        <el-table-column
          prop="locked"
          label="Locked"
        />
      </el-table>
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
      coins: [],
      address: ''
    }
  },
  computed: {
    okchainUrl() {
      return 'https://www.oklink.com/okchain-test/address/' + this.address
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
    this.account()
    this.exchange()
    // this.balance()
  },
  methods: {
    copy() {
      this.$copyText(this.address).then((e) => {
        this.$message.info('copied~')
      })
    },
    async account() {
      const res = await this.$request.get('/api/user/account')
      console.log('account: ', res)
      if (res.code === 0) {
        this.coins = res.data.currencies
        this.address = res.data.address
      }
    },
    async exchange() {
      const res = await this.$request.get('/api/user/exchange', { params: { symbol: 'tokb' } })
      console.log('exchange: ', res)
    }
  }
}
</script>
<style scoped lang="scss">
.account-out {
  padding: 0 20px;
  .user-modal {
    width: 80%;
  }
  .info-box {
    position: relative;
    display: grid;
    margin-bottom: 20px;
    padding: 1rem;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(64, 68, 79);
    border-image: initial;
    border-radius: 20px;
    grid-row-gap: 12px;
    .address {
      font-weight: 500;
      font-size: 1.25rem;
      min-width: 0px;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 0px;
      overflow: hidden;
    }
  }
}
</style>
