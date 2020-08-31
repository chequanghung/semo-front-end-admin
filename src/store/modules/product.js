/* eslint-disable */

import axios from 'axios'
import moment from 'moment'

// buefy
import { NotificationProgrammatic as Notification } from 'buefy'

export default {
    namespaced: true,

    state: {
        products: [],
        product: {},
        review: {}
    },

    getters: {
        products: state => state.products,
        product: state => state.product,
        review: state => state.review
    },

    mutations: {
        // populate products
        gets(state, products) {
            state.products = products
                .map(item => item.id > 0 ? { ...item, date_created: moment(item.date_created).format('hh:mm DD/MM/YYYY') } : item)
                .map(item => {
                    switch (item.product_status) {
                        case 0:
                            return { ...item, product_status: "⚠️ CẦN CHỈNH SỬA" }

                        case 1:
                            return { ...item, product_status: "⏲️ CHỜ KIỂM DUYỆT" }

                        case 2:
                            return { ...item, product_status: "✅ ĐÃ KIỂM DUYỆT" }

                        case 3:
                            return { ...item, product_status: "💸 ĐANG ĐẤU GIÁ" }

                        case 4:
                            return { ...item, product_status: "🤝 ĐANG GIAO KÈO" }

                        case 5:
                            return { ...item, product_status: "💰 ĐÃ BÁN" }

                        case 9:
                            return { ...item, product_status: "🗑️ ĐÃ XÓA" }
                    }
                })
        },
        // edit product from products
        edit(state, id) {
            state.products = state.products.map(item => item.id === product.id ? { ...product, product_status: 2 } : item)
        },
        // delete product from products
        deletes(state, products) {
            state.products = state.products.map(item => products.indexOf(item) >= 0 ? { ...item, product_status: "🗑️ ĐÃ XÓA" } : item)
        },
        // get product
        get(state, product) {
            state.product = product
        },
        // close product page
        close(state) {
            state.product = {}
            state.review = {}
        },
        // review
        review(state, review) {
            state.review = review
        }
    },

    actions: {
        // get all products
        populates({ commit }) {
            // get all products
            axios.get('/admin/product').then(response => {
                commit('gets', response.data)
            })
        },
        // get product to review
        get({ commit }, id) {
            axios.get(`/admin/review/${id}`).then(response => {
                commit('get', response.data)
            })
        },
        // review product
        review: async ({ commit, dispatch }, { review, media }) => {
            // if media review is completed
            await dispatch('reviewMedia', media).then(() => {
                axios.post('/admin/reviewProduct', review)
                    .then(response => {
                        // successful
                        Notification.open({
                            message: `${response.data.message}`,
                            type: 'is-success'
                        })
                        commit('edit', review.id)
                        commit('close')
                    })
                    .catch(error => {
                        // error box
                        Notification.open({
                            message: `Không thể phê duyệt sản phẩm vì ${error.data.message}.`,
                            type: 'is-danger'
                        })
                    })
            })
            // await Promise.all(reviewMedia)
            //     .then(() => {
            //     })
        },
        // review media
        reviewMedia: async ({ commit }, media) => {
            let reviewMedia = []

            await Promise.all(media.map(item => {
                axios.post('/admin/reviewMedia', item)
                    .then(() => {
                        reviewMedia.push(item)
                    })
                    .catch(error => {
                        Notification.open({
                            message: `Không phê duyệt được ảnh vì ${error.response.data.message}`,
                            type: 'is-danger'
                        })
                    })
            }))

            return reviewMedia
        },
        delete: async ({ commit, dispatch }, products) => {
            // seperate products by status
            // products cant be deleted
            let invalid = []
            // products can be deleted
            let valid = []

            // seperate
            products.forEach(product => {
                if (product.product_status.indexOf('CẦN CHỈNH SỬA') >= 0
                    || product.product_status.indexOf('CHỜ KIỂM DUYỆT') >= 0
                    || product.product_status.indexOf('ĐÃ KIỂM DUYỆT') >= 0) {
                    valid = [...valid, product]
                    // axios.delete(`/product/${product.id}`)
                    //     .then(() => {
                    //         commit('deletes', product)
                    //     })
                    //     .catch(error => {

                    //     })
                } else {
                    invalid = [...invalid, product.title]
                }
            })

            // display error message for invalid fruits
            if (invalid.length > 0) {
                Notification.open({
                    message: `Không thể xóa các sản phẩm đã lên sàn`,
                    type: 'is-danger'
                })
            }

            await dispatch('deleteProducts', valid)
                .then(() => {
                    commit('deletes', valid)
                    // succeed
                    if (valid.length > 0) {
                        Notification.open({
                            type: 'is-success',
                            message: `Đã xóa thành công ${valid.length} sản phẩm.`
                        })
                    }
                })
        },
        deleteProducts: async ({ commit }, products) => {
            let deletedProducts = []

            await Promise.all(products.map(product => {
                axios.put(`/product/changeStatus/`, {
                    id: product.id,
                    product_status: 9
                })
                    .then(() => {
                        deletedProducts.push(product)
                    })
                    .catch(error => {
                        Notification.open({
                            type: 'is-danger',
                            message: `Lỗi kết nối. Hãy kiểm tra đường truyền mạng nhé.`
                        })
                    })
            }))

            return deletedProducts
        },
        // close page
        close({ commit }) {
            commit('close')
        }
        // delete({ commit }, product) {
        //     axios.put('/')
        // }
    }

}