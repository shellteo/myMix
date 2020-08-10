<template>
  <div class="IE-flex-fix">
    <div id="site-wrapper" style="opacity: 1; transform: translate(0px, 0px);">
      <g-header />
      <div id="site-inner" class="card" data-page-container="true">
        <!-- <div class="page-heading section">
          <h2 class="title">social money列表</h2>
          <p class="title-description">创造属于你自己的social money</p>
        </div> -->
        <h2>social money列表</h2>
        <div class="page-body">
          <el-table
            v-loading="loading"
            element-loading-background="rgba(0, 0, 0, 0.4)"
            :data="list"
            header-cell-class-name="header-cell-class"
            cell-class-name="body-cell-class"
            style="width: 100%"
          >
            <el-table-column
              prop="symbol"
              label="symbol"
              width="100"
            />
            <el-table-column
              prop="name"
              label="name"
              width="180"
            />
            <el-table-column
              prop="owner"
              label="owner"
            >
              <template slot-scope="scope">
                <a :href="etherscanURL + scope.row.owner" target="_blank" rel="noopener noreferrer" class="cRtgxP">
                  {{ scope.row.owner }}
                </a>
              </template>
            </el-table-column>
            <el-table-column
              prop="token_address"
              label="token address"
            >
              <template slot-scope="scope">
                <a :href="etherscanURL + scope.row.token_address" target="_blank" rel="noopener noreferrer" class="cRtgxP">
                  {{ scope.row.token_address }}
                </a>
              </template>
            </el-table-column>
            <el-table-column
              prop="exchange_address"
              label="exchange address"
            >
              <template slot-scope="scope">
                <a v-if="scope.row.exchange_address" :href="etherscanURL + scope.row.exchange_address" target="_blank" rel="noopener noreferrer" class="cRtgxP">
                  {{ scope.row.exchange_address }}
                </a>
                <p v-else>
                  未上uniswap交易所，
                  <a :href="uniswapURL + 'create-exchange'" target="_blank" rel="noopener noreferrer" class="cRtgxP">
                    去添加
                  </a>
                </p>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <div>
              <button class="left" :disabled="pageIndex === 1" @click="prev">←</button>
            </div>
            Page {{ pageIndex }} of {{ pageCount }}
            <div>
              <button class="right" :disabled="pageIndex === pageCount" @click="next">→</button>
            </div>
          </div>
        </div>
      </div>
      <g-footer />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import consts from '@/utils/consts'
export default {
  data() {
    return {
      list: [],
      pageIndex: 1,
      pageSize: 10,
      count: 1,
      loading: true,
      etherscanURL: consts.etherscanURL,
      uniswapURL: consts.uniswapURL
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.count / this.pageSize)
    }
  },
  mounted() {
    this.getTokenList()
  },
  methods: {
    prev() {
      this.pageIndex -= 1
      this.getTokenList()
    },
    next() {
      this.pageIndex += 1
      this.getTokenList()
    },
    async getTokenList() {
      this.loading = true
      const { pageSize, pageIndex } = this
      const url = `${process.env.API_BASE_URL}/token`
      const res = await axios(url, {
        params: {
          pageSize,
          pageIndex
        }
      })
      this.loading = false
      const count = res.data.data.count
      const list = res.data.data.rows
      this.list = list
      this.count = count
    }
  }
}
</script>

<style scoped lang="scss" >
.pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 2em;
    margin-bottom: 2em;
}
.left, .right {
    color: rgb(47, 128, 237);
    padding: 0px 20px;
    border: none;
    cursor: pointer;
    background: #fffcf9;
    font-size: 1.5rem;
    user-select: none;
    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
}
</style>
<style lang="scss">
.header-cell-class {
  background-color: #fffcf9!important;
  color: #231f20;
  font-size: 1.2rem;
}
.body-cell-class {
  background-color: #fffcf9!important;
  color: #231f20;
  font-size: 1.2rem;
}
.el-table__empty-block {
  background-color: #fffcf9!important;
}
</style>
