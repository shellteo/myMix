// import { getCookie } from '@/utils/index'

export const state = () => {
  return {
    locales: ['zh', 'en'],
    locale: 'zh',
    loginModalShow: false,
    loginModalType: 1,
    loginModalTitle: 'false',
    userModalShow: false,
    pageLoading: true
  }
}

export const getters = {
  isLogined: () => {
    /* if (getCookie('ACCESS_TOKEN')) {
      return true
    } else {
      return false
    } */
  }
}

export const mutations = {
  SET_LOGIN_MODAL_SHOW(state, show) {
    state.loginModalShow = show
  },
  SET_LOGIN_MODAL_TYPE(state, type) {
    state.loginModalType = type
  },
  SET_LOGIN_MODAL_TITLE(state, title) {
    state.loginModalTitle = title
  },
  SET_USER_MODAL_SHOW(state, show) {
    state.userModalShow = show
  },
  SET_PAGE_LOADING(state, loading) {
    state.pageLoading = loading
  }
}

export const actions = {}
