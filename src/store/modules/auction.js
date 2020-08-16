import axios from 'axios'
import moment from 'moment'

// buefy
import { NotificationProgrammatic as Notification } from 'buefy'
import router from '../../router'

export default {
    namespaced: true,

    state: {
        // dashboard
        auctions: [],
        // auction view
        auction: {},
        bids: []
    },

    getters: {
        auctions: state => state.auctions,
        auction: state => state.auction,
        bids: state => state.bids
    },

    mutations: {
        // get all auction
        gets(state, auctions) {
            state.auctions = auctions
                .map(auction => auction.id
                    ? { ...auction, date_closure: moment(auction.date_closure).format('hh:mm DD/MM/YYYY') }
                    : auction)
                .map(auction => {
                    switch (auction.auction_status) {
                        case 0:
                            return { ...auction, auction_status: '🔒 ĐÃ ĐÓNG' }

                        case 1:
                            return { ...auction, auction_status: '💸 ĐANG MỞ' }

                        case 9:
                            return { ...auction, auction_status: '🗑️ ĐÃ XÓA' }
                    }
                })
                .map(auction => { return { ...auction, price_cur: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(auction.price_cur) } })
            console.log(state.auctions)
        },
        // get auction
        geta(state, auction) {
            state.auction = auction
        },
        // edit auction status
        edita(state, auction) {
            state.auctions = state.auctions.map(item => {
                if (item.id === auction.id) {
                    switch (auction.auction_status) {
                        case 0:
                            return { ...auction, auction_status: '🔒 ĐÃ ĐÓNG' }

                        case 1:
                            return { ...auction, auction_status: '💸 ĐANG MỞ' }

                        case 9:
                            return { ...auction, auction_status: '🗑️ ĐÃ XÓA' }
                    }
                }
            })
        },
        // get bids by auction
        getb(state, bids) {
            state.bids = bids
        },
        // delete bid(s) from bids
        deleteb(state, bids) {
            state.bids = state.bids.filter(item => item.id !== bids.indexOf(item) < 0)
        },
        // close an auction view
        closea(state) {
            state.auction = {}
            state.bids = []
        }
    },

    actions: {
        // populate data
        populate: ({ commit }) => {
            axios.get('/admin/auction')
                .then(response => {
                    commit('gets', response.data)
                })
                .catch(() => {
                    // open an error notification
                    Notification.open({
                        message: 'Vui lòng kiểm tra lại đường truyền',
                        type: 'is-danger'
                    })
                })
        },
        // delete auction
        deletea: ({ commit }, auction) => {
            axios.put(`/admin/auction/${auction.id}`, {
                auction_status: 9
            })
                .then(response => {
                    // delete auction
                    commit('edita', auction)
                    // open notification
                    Notification.open({
                        message: `${response.data.message}`,
                        type: 'is-success'
                    })
                })
                .catch(error => {
                    // open notification
                    Notification.open({
                        message: `${error.data.message}`,
                        type: 'is-danger'
                    })
                })
        },
        // get auction and bids
        populatea: async ({ commit, dispatch }, auction) => {
            // get auction
            axios.get(`/auction/id/${auction.id}`)
                .then(response => {
                    // get auction info
                    commit('geta', response.data)
                    // get bids
                    dispatch('populateb', auction)
                }).catch(() => {
                    // open an error notification
                    Notification.open({
                        message: 'Vui lòng kiểm tra lại đường truyền',
                        type: 'is-danger'
                    })
                })
        },
        // get auction bids
        populateb: async ({ commit }, auction) => {
            axios.get(`/auction_bid/auction/${auction.id}`)
                .then(response => {
                    commit('getb', response.data)
                    // push user to auction view
                    router.push({ name: 'AuctionView', params: { id: auction.id } })
                })
                .catch(() => {
                    // open an error notification
                    Notification.open({
                        message: 'Vui lòng kiểm tra lại đường truyền',
                        type: 'is-danger'
                    })
                    // clear auction
                    commit('closea')
                })
        },
        // delete bid(s)
        deleteb: async ({ commit, dispatch }, bids) => {
            await dispatch('deletebPromise', bids)
                .then(deleted => {
                    commit('deleteb', deleted)
                    // succeed
                    Notification.open({
                        message: `Đã xóa thành công ${deleted.length} lượt đấu giá.`,
                        type: 'is-success'
                    })
                })
        },
        deletebPromise: async (bids) => {
            let deletedBids = []

            await Promise.all(bids.map(bid => {
                axios.delete(`/auction_bid/delete/${bid.id}`)
                    .then(() => {
                        deletedBids.push(bid)
                    })
                    .catch(error => {
                        // open error notification
                        Notification.open({
                            message: error.response.data.message,
                            type: 'is-danger'
                        })
                    })
            }))

            return deletedBids
        }
    }
}