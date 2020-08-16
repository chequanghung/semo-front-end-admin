import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/fruit',
    component: () => import('../views/fruit/FruitDashboard')
  },
  {
    path: '/product',
    component: () => import('../views/product/ProductDashboard')
  },
  {
    path: '/product/:id',
    name: 'ProductReview',
    props: true,
    component: () => import('../views/product/review/ProductReview')
  },
  {
    path: '/auction',
    component: () => import('../views/auction/AuctionDashboard')
  },
  {
    path: '/auction/:id',
    name: 'AuctionView',
    props: true,
    component: () => import('../views/auction/view/AuctionView')
  },
  {
    path: '/affair',
    component: () => import('../views/affair/AffairDashboard')
  },
  {
    path: '/deposit',
    component: () => import('../views/deposit/DepositDashboard')
  },
  {
    path: '/user',
    component: () => import('../views/user/UserDashboard')
  },
  {
    path: '/identity',
    component: () => import('../views/identity/IdentityDashboard')
  },
  {
    path: '/admin',
    component: () => import('../views/admin/AdminDashboard')
  }
]

const router = new VueRouter({
  routes,
})

export default router
