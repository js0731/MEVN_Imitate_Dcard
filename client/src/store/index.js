import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)

const state = {
  isAuthenticated: false,  // 是否授權
  isProcessApi: true,
  userData: {},  // 用戶資訊
  collectArticle: [],
  loveArticle: [],
  loveMessage: [],
  trackingBoard: []
}

//假設期望得到的數據,是基於this.$store.state.name 上""經過複雜計算""得來的,而這個getName要在好多個地方使用,那麼我們就得複制好幾份.
//為了避免以上問題，vuex給我們提供了gette，
//getter 不止單單起到封裝的作用,它還跟vue的computed屬性一樣,會緩存結果數據, 只有當依賴改變的時候,才要重新計算.
const getters = {
  isAuthenticated: state => state.isAuthenticated,
  userData: state => state.userData,
  collectArticle: state => state.collectArticle,
  loveArticle: state => state.loveArticle,
  loveMessage: state => state.loveloveMessage,
  trackingBoard: state => state.trackingBoard
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
  SET_COLLECT_DATA(state, dynamicData) {
    state.collectArticle = dynamicData
  },
  PUSH_COLLECT_DATA(state, collectData) {
    state.collectArticle.push(collectData)
  },
  SET_LOVE_DATA(state, loveArticle) {
    state.loveArticle = loveArticle
  },
  PUSH_LOVE_DATA(state, loveArticle) {
    state.loveArticle.push(loveArticle)
  },
  DELETE_LOVE_DATA(state, loveArticle) {
    state.loveArticle.splice(state.loveArticle.findIndex(x => x.loveArticleId === loveArticle.loveArticleId), 1)
  },
  SET_LOVE_MESSAGE_DATA(state, loveMessage) {
    state.loveMessage = loveMessage

  },
  SET_TRACKINGBOARD_DATA(state, trackingBoard) {
    state.trackingBoard = trackingBoard;
  },

}

const actions = {
  setAuthenticated: ({ commit }, isAuthenticated) => {
    commit('SET_AUTHENTICATED', isAuthenticated)
  },
  storeUserData: ({ commit }, userData) => {
    commit('STORE_USER_DATA', userData)

  },
  storeUserDynamicData: ({ commit }, userId) => {
    axios.post(
      // 'https://protected-garden-60426.herokuapp.com/user/dynamicData'
      '/api/user/dynamicData'
      , userId)
      .then(res => {
        commit('SET_COLLECT_DATA', res.data.collectArticle);
        commit('SET_LOVE_DATA', res.data.loveArticle);
        commit('SET_LOVE_MESSAGE_DATA', res.data.loveMessage)
        commit('SET_TRACKINGBOARD_DATA', res.data.trackingBoard)
      })
      .catch(err => console.log(err))
  },
  collectArticle: ({ commit }, articleId) => {
    let data = {
      articleId: articleId,
      userId: state.userData.id
    }
    axios.post(
      // 'https://protected-garden-60426.herokuapp.com/user/collectarticle',
      '/api/user/collectarticle',
      data)
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
    axios.post(
      // 'https://protected-garden-60426.herokuapp.com/user/cancelCollect',
      '/api/user/cancelCollect',
      data)

      .then(res => {
        console.log(res.data);
        commit('SET_COLLECT_DATA', res.data)
      })
      .catch(err => {
        console.log(err);
      })
  },
  loveArticle: async ({ commit }, articleId) => {
    let data = {
      articleId: articleId,
      userId: state.userData.id
    }
    await axios.post(
      // "https://protected-garden-60426.herokuapp.com/user/love/article"
      "/api/user/love/article",
      data)
      .then((res) => {
        commit('PUSH_LOVE_DATA', res.data)

      })
      .catch((err) => console.log(err));
  },
  cancelLove: async ({ commit }, articleId) => {
    let data = {
      articleId: articleId,
      userId: state.userData.id
    }

    await axios.post(
      // "https://protected-garden-60426.herokuapp.com/user/cancel/love/article",
      "/api/user/cancel/love/article", data)
      .then((res) => {
        commit('DELETE_LOVE_DATA', res.data);

      })
      .catch((err) => console.log(err));
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})