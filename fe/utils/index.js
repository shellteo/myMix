import { ethers } from 'ethers'

export function shortenAddress(address, digits = 4) {
  if (!isAddress(address)) {
    throw new Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${address.substring(0, digits + 2)}...${address.substring(42 - digits)}`
}
export function isAddress(value) {
  try {
    return ethers.utils.getAddress(value.toLowerCase())
  } catch {
    return false
  }
}
export function isEmptyAddress(address) {
  return address === '0x0000000000000000000000000000000000000000'
}
