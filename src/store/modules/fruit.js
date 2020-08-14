import axios from 'axios'
import moment from 'moment'

export default {
    namespaced: true,

    state: {
        fruits: []
    },

    getters: {
        fruits: state => state.fruits
    },

    mutations: {
        // populate data
        get(state, fruits) {
            state.fruits = fruits.map(item => item.id > 0 ? { ...item, date_created: moment(item.date_created).format("HH:MM DD/MM/YYYY"), product_count: item.product_count + ' SẢN PHẨM' } : item)
        },
        // add data
        add(state, fruits) {
            state.fruits = [fruits, ...state.fruits]
        },
        // edit data
        edit(state, fruit) {
            state.fruits = state.fruits.map(item => item.id === fruit.id ? fruit : item)
        },
        // delete data
        delete(state, fruit) {
            state.fruits = state.fruits.filter(item => item.id !== fruit.id)
        }
    },

    actions: {
        // get full data of fruit from the database
        populate({ commit }) {
            // get all fruits
            axios.get(`/fruit/`).then(response => {
                commit('get', response.data)
            })
        },
        // add data
        add({ commit }, fruit) {
            axios.post(`/fruit/`, fruit).then(response => {
                commit('add', response.data)
            })
        },
        // edit data
        edit({ commit }, fruit) {
            axios.put(`/fruit/`, fruit).then(response => {
                commit('edit', response.data)
            })
        },
        // delete data
        delete({ commit }, fruits) {
            fruits.forEach(fruit => {
                axios.delete(`/fruit/${fruit.id}`).then(() => {
                    commit('delete', fruit)
                })
            });
        }
    }
}