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
    component: () => import('../views/dashboard/FruitDashboard')
  },
  {
    path: '/product',
    component: () => import('../views/dashboard/ProductDashboard')
  },
  {
    path: '/product/:id',
    name: 'ProductReview',
    props: true,
    component: () => import('../views/ProductReview')
  },
  {
    path: '/auction',
    component: () => import('../views/dashboard/AuctionDashboard')
  }
]

const router = new VueRouter({
  routes,
})

export default router
