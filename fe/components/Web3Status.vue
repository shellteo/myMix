<template>
  <div class="header-location">
    <!-- <div class="icon">
      <svg-icon
        icon-class="metamaskWalletIcon"
      />
    </div> -->
    <button v-if="!metamask.hasWallet" class="status-button" @click="showdialog(1, 'Connect to a Wallet')">
      <p class="section-heading">Connect Wallet</p>
    </button>
    <button v-else-if="!metamask.isConnected || wrongNetwork" class="status-button" @click="showdialog(3, wrongNetwork ? 'Wrong Network' : 'Error')">
      <p class="section-heading">{{ wrongNetwork ? 'Wrong Network' : 'Error' }}</p>
    </button>
    <button v-else class="account-span status-button" @click="showdialog(2, 'Account')">
      <p class="section-heading">{{ shortAddress }}</p>
    </button>
    <!-- <a v-else href="javascript:void(0)" class="location section-heading" @click="login"> Login With MetaMask </a> -->
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { shortenAddress } from '@/utils'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['metamask']),
    wrongNetwork() {
      return this.metamask.networkId.toString() !== process.env.NETWORK_ID.toString()
    },
    shortAddress() {
      return shortenAddress(this.metamask.account)
    },
    error() {
      const { isConnected, hasWallet } = this.metamask
      if (hasWallet) {
        if (!isConnected || this.wrongNetwork) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },
  methods: {
    showdialog(type, title) {
      this.$store.commit('SET_LOGIN_MODAL_TITLE', title)
      this.$store.commit('SET_LOGIN_MODAL_TYPE', type)
      this.$store.commit('SET_LOGIN_MODAL_SHOW', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.account-span {
  word-break: break-all;
}
.header-location {
  a {
    text-decoration: underline;
  }
}
.icon {
  border-radius: 50px; overflow: hidden; padding: 0px; margin: 0px; width: 16px; height: 16px; display: inline-block;
}
.status-button {
  display: flex;
  width: 100%;
  font-size: 0.9rem;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  background-color: #fffcf9;
  font-weight: 400;
  flex-flow: row nowrap;
  padding: 0.5rem;
  border: 2px solid #231f20;
  &:hover {
    background-color: rgb(242, 242, 242);
  }
  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1.4rem;
    flex: 1 1 auto;
    overflow: hidden;
    margin: 0;
  }
  .section-heading {
    font-size: 1rem;
  }
}
</style>
