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
export function setCookie(name, value, days = 1) {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
  document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
}
export function getCookie(name) {
  const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return v ? v[2] : null
}
export function delCookie(name) {
  this.setCookie(name, '', -1)
}
