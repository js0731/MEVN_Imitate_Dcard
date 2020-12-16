import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)

const state = {
  isAuthenticated: false,  // 是否授權
  userData: {},  // 用戶資訊
  collectArticle: []
}

//假設期望得到的數據,是基於this.$store.state.name 上""經過複雜計算""得來的,而這個getName要在好多個地方使用,那麼我們就得複制好幾份.
//為了避免以上問題，vuex給我們提供了gette，
//getter 不止單單起到封裝的作用,它還跟vue的computed屬性一樣,會緩存結果數據, 只有當依賴改變的時候,才要重新計算.
const getters = {
  isAuthenticated: state => state.isAuthenticated,
  userData: state => state.userData,
  collectArticle: state => state.collectArticle
}

const mutations = {
  SET_AUTHENTICATED(state, isAuthenticated) {
    if (isAuthenticated) state.isAuthenticated = isAuthenticated
    else state.isAuthenticated = false
  },
  STORE_USER_DATA(state, userData) {
    if (userData) state.userData = userData
    else state.userData = {}
  },
  // PROCESS_COLLECT_ARTICLE(state, newCollectArticle) {
  //   console.log(newCollectArticle);
  //   state.collectArticle = newCollectArticle
  //   // console.log(state.collectArticle);
  // },
  SET_DYNAMIC_DATA(state, dynamicData) {
    state.collectArticle = dynamicData
  },
  PUSH_COLLECT_DATA(state, collectData) {
    console.log(collectData);
    state.collectArticle.push(collectData)
    console.log(state.collectArticle);
    // state.collectArticle = collectData
  }

}

const actions = {
  setAuthenticated: ({ commit }, isAuthenticated) => {
    commit('SET_AUTHENTICATED', isAuthenticated)
  },
  storeUserData: ({ commit }, userData) => {
    commit('STORE_USER_DATA', userData)

  },
  storeUserDynamicData: ({ commit }, userId) => {
    axios.post('/api/user/dynamicData', userId)
      .then(res => {
        // console.log(res);
        commit('SET_DYNAMIC_DATA', res.data)
      })
      .catch(err => console.log(err))
  },
  collectArticle: ({ commit }, articleId) => {
    let data = {
      articleId: articleId,
      userId: state.userData.id
    }
    axios.post('/api/user/collectarticle', data)
      .then(res => {
        console.log(res, res.data);
        commit('PUSH_COLLECT_DATA', res.data)
      })
      .catch(err => console.log(err))
  },
  cancelCollect: ({ commit }, articleId) => {
    let data = {
      articleId: articleId,
      userId: state.userData.id
    }
    axios.post('/api/user/cancelCollect', data)
      .then(res => {
        console.log(res.data);
        commit('SET_DYNAMIC_DATA', res.data)
      })
      .catch(err => {
        console.log(err);
      })
  },
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})