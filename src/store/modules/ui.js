export default {
    namespaced: true,

    state: {
        menu: false,
    },

    getter: {
        menu: state => state.menu
    },

    mutations: {
        open_menu: (state) => {
            state.menu = true
        },
        close_menu: (state) => {
            state.menu = false
        }
    },

    actions: {
        open_menu: ({ commit }) => {
            commit('open_menu')
        },
        close_menu: ({ commit }) => {
            commit('close_menu')
        }
    }
}