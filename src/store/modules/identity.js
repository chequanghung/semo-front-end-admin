import axios from 'axios'

export default {
    namespaced: true,


    state: {
        identities: [],
        identity: {},
    },


    getters: {
        identities: state => state.identities,
        identity: state => state.identity
    },


    mutations: {
        gets: (state, identities) => {
            state.identities = identities
        },
        get: (state, identity) => {
            state.identity = identity
        },
        edit: (state, identity) => {
            state.identities = state.identities.map(item => item.id === identity.id ? {...item, identity_status: identity.identity_status} : item)
        },
    },


    actions: {
        populate: async ({ commit }) => {
            return axios.get(`/admin/identity`)
            .then(({ data }) => {
                commit('gets', data)
            })
        },
        edit: async ({ commit }, identity) => {
            return axios.put(`/admin/identity`, {
                id: identity.id,
                identity_status: identity.identity_status
            }).then(() => {
                commit('edit', identity)
            })
        }
    }
}