import Vue from 'vue'
import Vuex from 'vuex'

// modules
import fruit from './modules/fruit'
import product from './modules/product'
import ui from './modules/ui'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    fruit: fruit,
    product: product,
    ui: ui
  },


  state: {
  },


  getters: {
  },


  mutations: {
  },


  actions: {
  },
})
