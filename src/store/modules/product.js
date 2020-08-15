/* eslint-disable */

import axios from 'axios'
import moment from 'moment'

import router from '../../router'

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
        edits(state, product) {
            state.products = state.products.map(item => item.id === product.id ? product : item)
            console.log(state.products)
        },
        // delete product from products
        deletes(state, product) {
            state.products = state.products.filter(item => item.id != product.id)
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
        async review({ commit }, { review, media }) {
            // seperate media into an array
            // review media


            // if media review is completed
            await Promise.all(reviewMedia)
                .then(() => {
                    axios.post('/admin/reviewProduct', review)
                        .then(response => {
                            console.log(review)
                            commit('edits', response.data)
                            // successful
                            Notification.open({
                                message: `Phê duyệt thành công.`,
                                type: 'is-success'
                            })
                        })
                        .catch(error => {
                            // error box
                            Notification.open({
                                message: `Không thể phê duyệt sản phẩm vì ${error.response.data.message}.`,
                                type: 'is-danger'
                            })
                        })
                        .then(() => {
                            router.go(-1)
                        })
                })

        },
        // review media
        async reviewMedia({ commit }, media) {
            let reviewMedia = []

            for (const item of media) {
                reviewMedia.push(
                    axios.post('/admin/reviewMedia', item)
                        .then(() => {
                            console.log('succeed')
                        })
                        .catch(error => {
                            console.log('no')
                            Notification.open({
                                message: `Không phê duyệt được ảnh vì ${error.response.data.message}`,
                                type: 'is-danger'
                            })
                        })
                )
            }
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