<template>
  <el-dialog
    :visible.sync="showModal"
    :modal="true"
    width="650px"
    custom-class="my-dialog"
  >
    <p slot="title" class="dialog-title">{{ title }}</p>
    <Wallet v-if="type===1" />
    <Connected v-if="type===2" />
    <WrongNetwork v-if="type===3" />
  </el-dialog>
</template>

<script>
import WrongNetwork from './WrongNetwork'
import Connected from './Connected'
import Wallet from './Wallet'
export default {
  name: 'AuthModal',
  components: {
    WrongNetwork,
    Connected,
    Wallet
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number,
      default: 1
    },
    title: {
      type: String,
      default: 'Connect to a Wallet'
    }
  },
  data() {
    return {
      showModal: false
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
  methods: {
  }
}
</script>
<style lang="scss">
.my-dialog {
  background-color: #fffcf9!important;
  border-radius: 0;
  color: #231f20;
  .dialog-title {
    font-size: 1.5rem;
    margin: 0;
  }
}
</style>
