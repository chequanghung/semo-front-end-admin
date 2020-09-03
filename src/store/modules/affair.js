import moment from 'moment'
import axios from 'axios'

export default {
    namespaced: true,


    state: {
        // dashboard
        affairs: [],
        // affair view
        // product
        affair: {},
        // chat
        chats: [],
        // contract
        contract: {},
        // updates
        updates: []
    },


    getters: {
        affairs: state => state.affairs,
        affair: state => state.affair,
        deposits: state => state.deposits,
        chats: state => state.chats,
        contract: state => state.contract,
        updates: state => state.updates,
    },


    mutations: {
        // get affairs
        getas: (state, affairs) => {
            state.affairs = affairs.map(item => { return { ...item, date_updated: moment(item.date_updated).format('hh:mm DD/MM/YYYY') } })
                .map(item => {
                    switch (item.affair_status) {
                        case 0:
                            return { ...item, affair_status: '🛑 ĐANG TẠM DỪNG' }

                        case 1:
                            return { ...item, affair_status: '🤝 ĐANG DIỄN RA' }

                        case 2:
                            return { ...item, affair_status: '💰 ĐÃ BÁN' }

                        case 9:
                            return { ...item, affair_status: '🗑️ ĐÃ XÓA' }
                    }
                })
        },
        // populate
        geta: (state, affair) => {
            state.affair = affair
        },
        getp: (state, product) => {
            state.product = product
        },
        getc: (state, contract) => {
            state.contract = contract
        },
        // get contract update
        getu: (state, update) => {
            state.update = update
        },
        // edit contract
        editc: (state, contract) => {
            state.contract = contract
        },
        // clear update
        clearu: (state) => {
            state.update = {}
        },
    },


    actions: {
        // get affairs
        populate: async ({ commit }) => {
            return axios.get('/admin/affair')
                .then(({ data }) => {
                    commit('getas', data)
                })
        },
        // delete affairs
        // into affair
        populatea: async ({ commit }, id) => {
            return axios.get(`/affair/id/${id}`)
            .then(({ data }) => {
                commit('geta', data)
            })
        },
        // get chats
        getcs: async ({ state, commit }) => {
            return axios.get(`/affair/chat/${state.affair.id}`)
                .then(({ data }) => {
                    commit('addcs', data)
                })
        },
        // delete affair
        deletea: async ({ dispatch }, contract) => {
            return axios.put(`/affair/cancel`, {
                id: contract.affair_id,
                affair_status: 9
            })
            .then(() => {
                dispatch('clear')
                dispatch('close')
            })
        },
    }
}