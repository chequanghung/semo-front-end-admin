import axios from 'axios'

export default {
    namespaced: true,


    state: {
        deposits: [],
        deposit: {}
    },


    getters: {
        deposits: state => state.deposits,
        deposit: state => state.deposit,
    },


    mutations: {
        getds: (state, deposits) => {
            state.deposits = deposits
        },
        getd: (state, deposit) => {
            state.deposit = deposit
        },
        clear: (state) => {
            state.deposit = {}
        }
    },


    actions: {
        populateds: async ({ commit }) => {
            return axios.get(`/admin/deposits`)
            .then(({ data }) => {
                commit('getds', data)
            })
        },
        populated: async ({ commit }, id) => {
            return axios.get(`admin/deposit/id/${id}`)
            .then(({ data }) => {
                commit('getd', data)
            })
        },
        clear: ({ commit }) => {
            commit('clear')
        }
    }
}