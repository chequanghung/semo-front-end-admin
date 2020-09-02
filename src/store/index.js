import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
    home: {},
    admin: {},
  },


  getters: {
    home: state => state.home,
  },


  mutations: {
    geth: (state, home) => {
      state.home = home
    },
    geta: (state, admin) => {
      state.admin = admin
    }
  },


  actions: {
    geth: async ({ commit }) => {
      return axios.get(`/admin/home`)
      .then(({ data }) => {
        commit('geth', data)
      })
    },
    geta: async ({ commit }) => {
      return axios.get(`/admin/admin`, { headers: { token: localStorage.getItem('admin_token') } })
      .then(({ data }) => {
        commit('geta', data.admin)
      })
    },
    login: async ({ commit }, user) => {
      return axios.post(`/admin/login`, {
        username: user.username,
        password: user.password
      })
      .then(({ data }) => {
        // save token
        localStorage.setItem('admin_token', data.token)
        // user
        commit('geta', data.admin)
      })
    },
  },
})
