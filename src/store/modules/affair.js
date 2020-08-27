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
    },


    getters: {
        affairs: state => state.affairs,
        affair: state => state.affair,
        deposits: state => state.deposits,
        chats: state => state.chats,
        contract: state => state.contract
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
        // get affair
        geta: (state, affair) => {
            state.affair = affair
        },
        // get deposits
        getd: (state, deposits) => {
            state.deposits = deposits
        },
        // get chats
        getch: (state, chats) => {
            state.chats = chats
        },
        // get and edit contract
        getc: (state, contract) => {
            state.contract = contract
        },
        // add chats
        addch: (state, chats) => {
            state.chats = [...state.chats, chats]
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
        }
    }
}