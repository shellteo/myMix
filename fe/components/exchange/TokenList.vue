<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="showModal"
    :lock-scroll="false"
    title="Select a token"
    custom-class="black-theme-dialog token-list"
  >
    <div class="container">
      <div
        v-loading="loading"
        class="cotdDw br10"
        element-loading-background="rgba(0, 0, 0, 0.3)"
      >
        <el-table
          :data="tokenList"
          height="50vh"
          style="width: 100%"
          cell-class-name="cell-class"
          header-cell-class-name="header-cell-class"
          @row-click="selectToken"
        >
          <el-table-column
            label="Symbol"
          >
            <template slot-scope="scope">
              <span>
                🤑  {{ scope.row.token2_symbol }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="Liquidity"
            prop="total_supply"
          />
          <el-table-column
            label="View Detail"
          >
            <template slot-scope="scope">
              <a :href="'https://www.okex.com/okchain/v1/token/' + scope.row.token2_symbol" target="_blank">
                {{ scope.row.token2_symbol }}
              </a>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>

<script>
/* eslint-disable */
import { OKT } from './consts.js'

import utils from '@/utils/index'
import throttle from 'lodash/throttle'

export default {
  name: 'TokenListModal',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
  },
  watch: {
    showModal(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.showModal = val
    }
  },
  data() {
    return {
      showModal: false,
      tokenList: [],
      loading: false,
    }
  },
  mounted() {
    this.getAllToken()
  },
  methods: {
    selectToken(token) {
      console.log(token)
      this.showModal = false
      this.$emit('selectToken', token)
    },
    async getAllToken() {
      const { page, pagesize, search } = this
      this.loading = true
      const res = await this.$request.get('/api/exchange')
      if (res.code === 0) {
        this.tokenList = [
          OKT,
          ...res.data.rows
        ]
      }
      this.loading = false
    }
  }
}
</script>
<style lang="scss">
.cotdDw {
  .el-table .cell {
    padding-left: 20px;
  }
}
.gray-btn {
  .el-button {
    background-color: #f1f1f1;
    border-color: #f1f1f1;
  }
}
.black-theme-dialog {
  max-width: 420px;
  max-height: 70vh;
  min-height: 70vh;
  border-radius: 20px;
  background-color: rgb(33, 36, 41);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 4px 8px 0px;
  .el-dialog__body {
    padding: 10px 0 0 0;
    color: #ffffff;
    font-size: 14px;
    word-break: break-all;
    background-color: rgb(33, 36, 41);
  }
  .el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    color: #ffffff;
  }
  .el-table {
    background-color: rgb(33, 36, 41);
    &::before {
      background-color: rgb(44, 47, 54);
    }
    .el-table__row:hover {
      background-color: rgb(44, 47, 54);
      cursor: pointer;
      .cell-class {
        background-color: rgb(44, 47, 54);
        border-bottom: 1px solid rgb(44, 47, 54)!important;
        color: #ccc;
      }
    }
  }
}
.header-cell-class {
  background-color: rgb(33, 36, 41)!important;
  border-bottom: 1px solid rgb(44, 47, 54)!important;
  color: #ffffff;
  font-size: 16px;
}
.cell-class {
  background-color: rgb(33, 36, 41);
  border-bottom: 1px solid rgb(44, 47, 54)!important;
  color: #ccc;
  font-size: 16px;
}
@media (max-width: 960px) {
  .black-theme-dialog {
    width: 90vw;
  }
}
</style>
<style scoped lang="scss">
::placeholder {
  color: #b2b2b2;
}
a {
  text-decoration: underline;
  color: rgb(27, 149, 224);;
}
.container {
  .favMUS {
    width: 2rem;
    height: 2rem;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .hDyKIS:hover {
    // background-color: @purpleLight;
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
    color: #ffffff;
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
    -webkit-box-pack: start;
    justify-content: flex-start;
    background-color: #f1f1f1;
    flex-flow: row nowrap;
    padding: 0.5rem 1.5rem;
  }

  .dHtVAe {
    color: #ffffff;
    font-size: 1rem;
    width: 0px;
    min-height: 2.5rem;
    text-align: left;
    padding-left: 1.6rem;
    background-color: #f1f1f1;
    outline: none;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    flex: 1 0 auto;
  }

  input {
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    -webkit-appearance: textfield;
    background-color: white;
    -webkit-rtl-ordering: logical;
    cursor: text;
    margin: 0em;
    font: 400 13.3333px Arial;
    padding: 1px 0px;
    border-width: 2px;
    border-style: inset;
    border-color: initial;
    border-image: initial;
  }
  .loadmore {
    text-align: center;
    color: #409eff;
    padding: 1rem;
    span {
      cursor: pointer;
    }
  }
  .noData {
    text-align: center;
    margin-top: 15vh;
    font-size: 1.2rem;
  }
}
</style>