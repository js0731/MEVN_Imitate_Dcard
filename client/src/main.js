import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import '../src/assets/scss/all.scss'
import toastRegister from './components/module/toast/toast.js'
import loadingRegister from './utils/loading/loading.js'
import infiniteScroll from 'vue-infinite-scroll'


Vue.use(loadingRegister);
Vue.use(toastRegister);
Vue.use(infiniteScroll)

axios.interceptors.request.use(config => {
  if (localStorage.myToken) {
    config.headers.Authorization = localStorage.myToken; // 在http header都加上 token
  }
  return config
}, error => {
  return Promise.reject(error)
})

//請求返回攔截，把資料返回到頁面之前做些什麼...
axios.interceptors.response.use(response => {
  return response
}, err => {
  console.log(err);
  const { status } = err.response;
  if (status === 401) { // 用戶未認證
    console.log('token無效，請重新登錄');
    // window.location.assign("http://localhost:8080/dcard/usedcard")
    router.replace({ path: '/dcard/usedcard', })
    localStorage.removeItem('myToken');  // 清除token    
    return status
  }
  return Promise.reject(err)
})
Vue.config.productionTip = false
Vue.prototype.$axios = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
