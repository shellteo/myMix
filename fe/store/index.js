// 初始化
export const state = () => {
  return {
    locales: ['zh', 'en'],
    locale: 'zh',
    loginModalShow: false,
    loginModalType: 1,
    loginModalTitle: 'false'
  }
}

export const getters = {}

export const mutations = {
  SET_LOGIN_MODAL_SHOW(state, show) {
    state.loginModalShow = show
  },
  SET_LOGIN_MODAL_TYPE(state, type) {
    state.loginModalType = type
  },
  SET_LOGIN_MODAL_TITLE(state, title) {
    state.loginModalTitle = title
  }
}

export const actions = {}
