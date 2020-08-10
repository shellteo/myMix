import request from '@/utils/request'

export default ({ app }, inject) => {
  inject('request', request)
}
