/**
 * For MetaMask(ETH) Only
 */
import socialMoney from '@/api/eth/contract.js'
import { isEmptyAddress } from '@/utils/index'
export const state = () => {
  return {
    symbol: '',
    name: '',
    totalSupply: 0,
    tokenAddress: '0x0000000000000000000000000000000000000000',
    exchangeAddress: '0x0000000000000000000000000000000000000000'
  }
}

export const mutations = {
  SET_SYMBOL(state, symbol) {
    state.symbol = symbol
  },
  SET_NAME(state, name) {
    state.name = name
  },
  SET_TOTAL_SUPPLY(state, totalSupply) {
    state.totalSupply = totalSupply
  },
  SET_TOKEN_ADDRESS(state, tokenAddress) {
    state.tokenAddress = tokenAddress
  },
  SET_EXCHANGE_ADDRESS(state, exchangeAddress) {
    state.exchangeAddress = exchangeAddress
  }
}

export const actions = {
  async getTokenInfo({ commit }, tokenAddress) {
    const tokenInstance = socialMoney.erc20Instance(tokenAddress)
    const totalSupply = await tokenInstance.methods.totalSupply().call()
    // const owner = await tokenInstance.methods.owner().call()
    const name = await tokenInstance.methods.name().call()
    const symbol = await tokenInstance.methods.symbol().call()
    commit('SET_SYMBOL', symbol)
    commit('SET_NAME', name)
    commit('SET_TOTAL_SUPPLY', totalSupply)
  },
  async getExchange({ commit }, tokenAddress) {
    const instance = socialMoney.uniswapFactoryInstance()
    const exchangeAddress = await instance.methods.getExchange(tokenAddress).call()
    commit('SET_EXCHANGE_ADDRESS', exchangeAddress)
  },
  async getTokenWithAccount({ commit, dispatch }, account) {
    const instance = socialMoney.factoryContractInstance()
    const tokenAddress = await instance.methods.getToken(account).call()
    // console.log('tokenAddress: ', tokenAddress)
    commit('SET_TOKEN_ADDRESS', tokenAddress)
    if (!isEmptyAddress(tokenAddress)) {
      dispatch('getTokenInfo', tokenAddress)
      dispatch('getExchange', tokenAddress)
    }
  }
}
