import Vue from 'vue'
import Vuex from 'vuex'

// modules
import fruit from './modules/fruit'
import product from './modules/product'
import auction from './modules/auction'
import ui from './modules/ui'
import affair from './modules/affair'
import identity from './modules/identity'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    fruit: fruit,
    product: product,
    auction: auction,
    ui: ui,
    affair: affair,
    identity: identity,
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
