import moment from 'moment'

export default {
    namespaced: true,


    state: {
        // dashboard
        affairs: [],
        // affair view
        // product
        affair: {},
        // chat
        chat: [],
        // contract
        contract: {},
    },


    getters: {
        affairs: state => state.affairs,
        affair: state => state.affair,
        chat: state => state.chat,
        contract: state => state.contract
    },


    mutations: {
        // get affairs
        getas: (state, affairs) => {
            state.affairs = affairs.map(item =>  { return {...item, date_updated:  moment(item.date_updated).format('hh:mm DD/MM/YYYY')} } )
        }
    },


    actions: {
        
    }
}