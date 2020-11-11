import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isAuthenticated: false,  // 是否授權
  user: {}  // 用戶資訊
}

//假設期望得到的數據,是基於this.$store.state.name 上""經過複雜計算""得來的,而這個getName要在好多個地方使用,那麼我們就得複制好幾份.
//為了避免以上問題，vuex給我們提供了gette，
//getter 不止單單起到封裝的作用,它還跟vue的computed屬性一樣,會緩存結果數據, 只有當依賴改變的時候,才要重新計算.
const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user
}

const mutations = {
  SET_AUTHENTICATED(state, isAuthenticated) {
    if (isAuthenticated) state.isAuthenticated = isAuthenticated
    else state.isAuthenticated = false
  },
  SET_USER(state, user) {
    if (user) state.user = user
    else state.user = {}
  }
}

const actions = {
  setAuthenticated: ({ commit }, isAuthenticated) => {
    commit('SET_AUTHENTICATED', isAuthenticated)
  },
  setUser: ({ commit }, user) => {
    commit('SET_USER', user)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})