import Vue from 'vue'
import Loading from "./Loading.vue";

const LoagingConstructor = Vue.extend(Loading);


function showLoading(boo = true) {

    const loadingDOM = new LoagingConstructor({
        el: document.createElement('div'),
        data() {
            return {
                show: boo
            }
        }
    })
    document.body.appendChild(loadingDOM.$el);
    loadingDOM.show = false
}


function closeLoading() {
    loadingDOM.show = false
}



function loadingRegister() {
    Vue.prototype.$loading = showLoading

}

export default loadingRegister;