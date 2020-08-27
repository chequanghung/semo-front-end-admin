import axios from 'axios'
import moment from 'moment'

// buefy
import { NotificationProgrammatic as Notification } from 'buefy'

export default {
    namespaced: true,

    state: {
        fruits: [],
        img_dir: 'admin/fruit'
    },

    getters: {
        fruits: state => state.fruits,
        img_dir: state => state.img_dir
    },

    mutations: {
        // populate data
        get(state, fruits) {
            state.fruits = fruits.map(item => item.id > 0 ? { ...item, date_created: moment(item.date_created).format("HH:MM DD/MM/YYYY") } : item)
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
            axios.get(`/fruit/dashboard`).then(response => {
                commit('get', response.data)
            })
        },
        // add data
        add({ commit }, fruit) {
            axios.post(`/fruit/`, fruit).then(response => {
                commit('add', {
                    id: response.data.id,
                    title: response.data.title,
                    icon_url: response.data.icon_url,
                    date_created: moment(response.data.date_created).format('HH:MM DD/MM/YYYY'),
                    product_count: 0
                })
            })
                .then(() => {
                    Notification.open({
                        message: `Tạo thành công.`,
                        type: 'is-success'
                    })
                })
                .catch(error => {
                    Notification.open({
                        message: `${error.response.data.message}`,
                        type: 'is-danger'
                    })
                })
        },
        // edit data
        edit({ commit }, fruit) {
            axios.put(`/fruit/`, fruit).then(response => {
                commit('edit', {
                    id: response.data.id,
                    title: response.data.title,
                    icon_url: response.data.icon_url,
                    date_created: moment(response.data.date_created).format('HH:MM DD/MM/YYYY')
                })
            })
                .then(() => {
                    Notification.open({
                        message: `Sửa thành công.`,
                        type: 'is-success'
                    })
                })
                .catch(error => {
                    Notification.open({
                        message: `${error.response.data.message}.`,
                        type: 'is-danger'
                    })
                })
        },
        // delete data
        delete({ commit }, fruits) {
            // filter empty fruits and linked fruits
            // array for linked ones
            let deletedError = []

            // run through fruits
            fruits.forEach(fruit => {
                if (fruit.product_count === 0) {
                    axios.delete(`/fruit/${fruit.id}`)
                        .then(() => {
                            commit('delete', fruit)

                            Notification.open({
                                message: `Đã xóa ${fruit.title}.`,
                                type: 'is-light'
                            })
                        })
                        .catch((error) => {
                            Notification.open({
                                message: `Không thể xóa ${fruit.title} vì ${error.response.data.message}.`,
                                type: 'is-danger'
                            })
                        })
                } else {
                    deletedError = [...deletedError, fruit.title]
                }
            })

            // check if there are items can't be deleted
            if (deletedError.length > 0) {
                // show undeleted items
                Notification.open({
                    message: `Không thể xóa ${deletedError} vì có sản phẩm.`,
                    type: "is-danger",
                });
            }
        }
    }
}