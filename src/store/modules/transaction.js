import axios from 'axios'

export default {
    namespaced: true,


    state: {
        requests: []
    },


    getters: {
        requests: state => state.requests,
    },


    mutations: {
        getrs: (state, requests) => {
            state.requests = requests
        },
        editr: (state, request) => {
            state.requests = state.requests.map(item => item.id === request.id ? {...item, accepted: request.accepted} : item)
        }
    },


    actions: {
        populaters: async ({ commit }) => {
            return axios.get(`/admin/transaction/requests`)
            .then(({ data }) => {
                commit('getrs', data)
            })
        },
        changer: async ({ commit }, request) => {
            return axios.put(`admin/transaction/request`, {
                id: request.id,
                accepted: request.accepted
            })
            .then(() => {
                commit('editr', request)
            })
        }
    }
}