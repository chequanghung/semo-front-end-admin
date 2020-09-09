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
        updates: [],
        product: {}
    },


    getters: {
        affairs: state => state.affairs,
        affair: state => state.affair,
        deposits: state => state.deposits,
        chats: state => state.chats,
        contract: state => state.contract,
        updates: state => state.updates,
        product: state => state.product,
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
        getus: (state, updates) => {
            state.updates = updates
        },
        // add chat
        addcs: (state, dialogues) => {
            let ids = state.chats.map(item => item.id)

            dialogues.forEach(item => {
                if(ids.indexOf(item.id) === -1) {
                    state.chats.push(item)
                }
            })

            state.chats.sort(function (a, b) {
                let x = a.date_created
                let y = b.date_created

                return x < y ? -1 : (x === y ? 0 : 1)
            })
        },
        // edit contract
        editc: (state, contract) => {
            state.contract = contract
        },
        // clear update
        clearu: (state) => {
            state.updates = []
        },
        clear: (state) => {
            state.contract = {}
            state.updates = []
        },
        close: (state) => {
            state.affair = {}
            state.product = {}
            state.chats = []
        }
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
                let affair = data

                    commit('geta', affair)
                    commit('getp', affair.Product)
                    commit('getc', affair.AffairContract)
            })
        },
        // get chats
        getcs: async ({ state, commit }) => {
            return axios.get(`/affair/chat/${state.affair.id}`)
                .then(({ data }) => {
                    commit('addcs', data)
                })
        },
        // get contract
        getc: async ({ commit }, id) => {
            return axios.get(`/affair/contract/id/${id}`)
                .then(({ data }) => {
                    commit('getc', data)
                })
        },
        // get updates
        getus: async ({ commit }, id) => {
            return axios.get(`/admin/contract/${id}/updates`)
            .then(({ data }) => {
                commit('getus', data)
            })
        },
        // delete affair
        deleteas: async ({ dispatch }, contracts) => {
            Promise.all(contracts.map(item => {
                return axios.put(`/affair/cancel`, {
                    id: item.id,
                    affair_status: 9
                })
                .then(() => {
                    dispatch('populate')
                })
            }))
        },
        close: async ({ commit }) => {
            commit('close')
        },
        clear: async ({ commit }) => {
            commit('clear')
        }
    }
}