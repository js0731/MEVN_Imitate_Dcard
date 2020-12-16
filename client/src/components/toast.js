import Vue from 'vue'
import Toast from "./Toast.vue";

const ToastConstructor = Vue.extend(Toast);



function showToast(text, duration = 2000) {
    const toastDom = new ToastConstructor({
        el: document.createElement('div'),
        data() {
            return {
                text: text,
                show: true
            }
        }
    })
    //toastDom指向元件的實體
    document.body.appendChild(toastDom.$el)
    setTimeout(() => {
        toastDom.show = false
    }, duration)
}

function toastRegister() {
    Vue.prototype.$toast = showToast
}

export default toastRegister;