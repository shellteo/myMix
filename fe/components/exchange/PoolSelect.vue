<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="showModal"
    :lock-scroll="false"
    width="450px"
    custom-class="br10 black-theme-dialog pool-select"
  >
    <div class="container br10">
      <button
        v-for="(item, i) in poolOptions"
        :key="item.id"
        :class="[ 'cwefbr', i === currentPool ? 'MODE' : '']"
        @click="selectPool(i)"
      >
        {{ item.text }}
      </button>
    </div>
  </el-dialog>
</template>

<script>
/* eslint-disable */
export default {
  name: 'PoolSelectModal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Number,
      default: 0
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
      currentPool: 0,
      poolOptions: [
        {
          id: 0,
          text: 'Add Liquidity'
        },{
          id: 1,
          text: 'Delete Liquidity'
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
    selectPool(i) {
      this.showModal = false
      if (this.currentPool !== i) {
        this.currentPool = i
        this.$emit('selectPool', this.poolOptions[i])
      }
    }
  }
}
</script>

<style scoped lang="scss">
$purpleDark: #ccc;
.container {
  background-color: rgb(33, 36, 41);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 2rem 2rem;
  .cwefbr.MODE {
    background-color: rgb(44, 47, 54);
    font-weight: 500;
    color: $purpleDark;
    border-radius: 3rem;
    border-width: 1px;
    border-style: solid;
    border-color: $purpleDark;
    border-image: initial;
  }
  .cwefbr {
    display: flex;
    cursor: pointer;
    color: $purpleDark;
    font-size: 1rem;
    flex-flow: row nowrap;
    padding: 1rem;
    text-decoration: none;
    font-weight: 500;
    color: $purpleDark;
    border-radius: 3rem;
    border-width: 1px;
    border-style: solid;
    border-color: $purpleDark;
    border-image: initial;
  }
  button {
    cursor: pointer;
    user-select: none;
    font-size: 1rem;
    color: #ccc;
    background-color: rgb(33, 36, 41);
    box-sizing: border-box;
    width: 100%;
    padding: 1rem 2rem;
    border-radius: 3rem;
    border-color: rgb(44, 47, 54)!important;
    border-width: initial;
    border-style: none;
    border-image: initial;
    outline: none;
    margin-bottom: 20px;
  }
}

</style>
