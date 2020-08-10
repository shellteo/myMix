// import web3 from './web3'
import SocialMoneyFactoryJsonData from './SocialMoneyFactory.json'
import SocialMoneyJsonData from './SocialMoney.json'
import UniswapFactoryABI from './uniswap_factory.json'

const factoryAddress = '0x34c2856530Ca9b9D3590c047D45BFc97995d6403' // THE CONTRACT ADDRESS
const uniswapFactoryAddress = '0xc4d477bcf1578ebf4dee2318e19ab7649a83f5bb' // THE CONTRACT ADDRESS

export default {
  factoryContractInstance() {
    const instance = new window.web3.eth.Contract(SocialMoneyFactoryJsonData.abi, factoryAddress)
    return instance
  },
  erc20Instance(_address) {
    const instance = new window.web3.eth.Contract(SocialMoneyJsonData.abi, _address)
    return instance
  },
  uniswapFactoryInstance() {
    const instance = new window.web3.eth.Contract(UniswapFactoryABI, uniswapFactoryAddress)
    return instance
  }

}
