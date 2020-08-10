/**
 * For MetaMask(ETH) Only
 */
import BigNumber from 'bignumber.js'
import { getSignatureForLogin } from '@/api/eth'
export const state = () => {
  return {
    account: null,
    balances: new BigNumber(0),
    isConnected: false,
    hasWallet: false,
    networkId: 0
  }
}

export const mutations = {
  SET_BALANCE(state, data) {
    state.balances = data
  },
  SET_ACCOUNT(state, account) {
    state.account = account
  },
  SET_METAMASK_CONNECTION(state, status) {
    state.isConnected = status
  },
  SET_HAS_WALLET(state, status) {
    state.hasWallet = status
  },
  SET_NETWORKID(state, id) {
    state.networkId = id
  }
}

export const actions = {
  async fetchAccount({ commit, dispatch }) {
    commit('SET_HAS_WALLET', true)
    try {
      await window.ethereum.enable()
      // const [account] = await window.web3.eth.getAccounts()
      const account = await window.web3.eth.getCoinbase()
      const networkId = await window.web3.eth.net.getId()
      commit('SET_ACCOUNT', account)
      commit('SET_NETWORKID', networkId)
      commit('SET_METAMASK_CONNECTION', true)
      dispatch('getBalance')
      dispatch('token/getTokenWithAccount', account, { root: true })
    } catch (error) {
      // 用户拒绝❌的情况
      commit('SET_METAMASK_CONNECTION', false)
      console.log('用户拒绝❌的情况')
    }
  },
  async getBalance({ commit, state }) {
    const result = await window.web3.eth.getBalance(state.account)
    commit('SET_BALANCE', result)
  },
  async login({ state, commit }) {
    try {
      await window.ethereum.enable()
      commit('SET_METAMASK_CONNECTION', true)
    } catch (error) {
      // @todo: handle User denied account access...
      throw new Error('你拒绝了网站对MetaMask插件的访问，无法通过MetaMask登录')
    }
  },
  async getSignature({ dispatch, state }, data = { mode: null, rawSignData: null }) {
    await dispatch('fetchAccount')
    const { account } = state
    switch (data.mode) {
      case 'Login': {
        return {
          publicKey: account,
          signature: getSignatureForLogin(),
          username: account
        }
      }
      default: return null
    }
  }
}
