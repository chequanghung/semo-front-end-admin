// core vue.js modules
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// ui modules
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy)


// services modules
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = "http://localhost:3003/"
Vue.use(VueAxios, axios)

// firebase
import { fb, storage } from './firebase'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  fb,
  storage,
  render: h => h(App)
}).$mount('#app')
